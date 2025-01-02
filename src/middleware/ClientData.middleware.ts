// src/middleware/ClientData.middleware.ts

/**
 * @file Middleware for getting client data.
 * @module Middleware/ClientData
 * @description
 * Provides middleware for getting client data.
 */

// ! lib
// koa
import { Context, Next } from 'koa';

export async function ClientDataMiddleware(
	ctx: Context,
	next: Next
): Promise<void> {
	// Данные клиента и запроса
	const clientIp = ctx.ip || ctx.socket.remoteAddress || 'unknown';

	// Добавляем данные в контекст
	ctx.state.clientData = {
		clientIp,
		method: ctx.method,
		url: ctx.url,
		headers: ctx.headers
	};

	await next();
}
