import { apiSlice } from "./apiSlice";

const USER_URL = "/api/users";

interface LoginData {
	email: string;
	password: string;
}

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation({
			query: (data: LoginData) => ({
				url: `${USER_URL}/auth`,
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useLoginMutation } = usersApiSlice;
