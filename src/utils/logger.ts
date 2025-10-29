import type { LogLevel } from "../types/logger";

function formatMessage(level: LogLevel, msg: string, meta?: Record<string, unknown>) {
	const base = { level, time: new Date().toISOString(), msg };
	return JSON.stringify(meta ? { ...base, meta } : base);
}

export const logger = {
	info: (msg: string, meta?: Record<string, unknown>) =>
		console.log(formatMessage("info", msg, meta)),
	warn: (msg: string, meta?: Record<string, unknown>) =>
		console.warn(formatMessage("warn", msg, meta)),
	error: (msg: string, meta?: Record<string, unknown>) =>
		console.error(formatMessage("error", msg, meta)),
	debug: (msg: string, meta?: Record<string, unknown>) => {
		if (process.env.DEBUG) console.debug(formatMessage("debug", msg, meta));
	},
};

export default logger;
