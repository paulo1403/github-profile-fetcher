import { Elysia } from "elysia";
import logger from "../utils/logger";

export const loggerPlugin = new Elysia().onAfterHandle(({ request, set }) => {
	logger.info("Handled request", {
		method: request.method,
		url: request.url,
		status: set.status,
	});
});

export default loggerPlugin;
