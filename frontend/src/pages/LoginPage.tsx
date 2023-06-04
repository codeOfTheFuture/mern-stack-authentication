import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		console.log("submit");
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
