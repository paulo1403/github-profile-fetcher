import { Elysia } from "elysia";
import logger from "../utils/logger";

export const errorPlugin = new Elysia().onError(({ error, request }) => {
    const message = (error as { message?: string })?.message ?? String(error);
    logger.error("Unhandled error", { error: message, path: request?.url });

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "content-type": "application/json" },
    });
});

export default errorPlugin;
