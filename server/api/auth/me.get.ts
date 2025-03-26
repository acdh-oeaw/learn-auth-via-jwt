import { requireAuth } from "~/server/utils/auth";

export default defineEventHandler(async (event) => {
	const payload = await requireAuth(event);

	if (payload.username === "demo") {
		return payload;
	} else {
		setResponseStatus(event, 404, "not found");
		return;
	}
});
