import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../redux/slices/usersApiSlice";
import { UserInfo, setCredentials } from "../redux/slices/authSlice";
import { RootState } from "../redux/store";
import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";

const LoginPage = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const navigate: NavigateFunction = useNavigate();
	const dispatch: ThunkDispatch<RootState, null, AnyAction> & Dispatch<AnyAction> =
		useAppDispatch();

	const [login] = useLoginMutation();

	const { userInfo } = useAppSelector((state: RootState) => state.auth);

	useEffect(() => {
		if (userInfo) {
			navigate("/");
		}
	}, [userInfo, navigate]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const res: UserInfo = await login({ email, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			navigate("/");
		} catch (error) {
			console.error(error.data.message || error);
		}
	};

	return (
		<FormContainer>
			<h1>Sign In</h1>

			<Form onSubmit={handleSubmit}>
				<Form.Group className="my-2" controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter Email"
						value={email}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group className="my-2" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter Password"
						value={password}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type="submit" variant="primary" className="mt-3">
					Sign In
				</Button>

				<Row className="py-3">
					<Col>
						New Customer? <Link to="/register">Register</Link>
					</Col>
				</Row>
			</Form>
		</FormContainer>
	);
};
export default LoginPage;
