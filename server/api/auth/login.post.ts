import { setAuth } from "~/server/utils/auth";

const { jwtExpiration } = useRuntimeConfig();

const errorMessage = "username or password is wrong! please try again";

interface UserDocument {
	username: string;
	password: string;
}

export default defineEventHandler(async (event) => {
	const { username, password }: UserDocument = await readBody(event);

	if (!username || !password) {
		setResponseStatus(event, 400, "required field missing");
		return;
	}

	if (username !== "demo" && password !== "password") {
		throw createError({
			statusMessage: errorMessage,
		});
	}

	await setAuth(event, username);

	return {
		loggedIn: true,
		user: username,
		expires: Date.now() + parseInt(jwtExpiration),
	};
});
