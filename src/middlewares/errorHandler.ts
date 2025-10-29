import type { Elysia, InlineHandler } from "elysia";
import logger from "../utils/logger";

export default function errorHandler(app: Elysia) {
	app.on("error", (err: unknown) => {
		const message = (err as { message?: string })?.message ?? String(err);
		logger.error("Unhandled error", { error: message });
	});
}

export function withErrorHandling(handler: InlineHandler): InlineHandler {
	const wrapped = async (ctx: unknown) => {
		try {
			if (typeof handler === "function") {
				const result = await (handler as (...args: unknown[]) => unknown)(ctx);
				return result as unknown;
			}

			return handler as unknown;
		} catch (err: unknown) {
			const message = (err as { message?: string })?.message ?? String(err);
			const path = (ctx as { path?: string })?.path;
			logger.error("Request handler threw", { err: message, path });

			return new Response(JSON.stringify({ error: message }), {
				status: 500,
				headers: { "content-type": "application/json" },
			});
		}
	};

	return wrapped as unknown as InlineHandler;
}
