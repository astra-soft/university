// src/middleware/RequestId.middleware.ts

/**
 * @file Middleware for generating a unique requestId for each HTTP request.
 * @module Middleware/RequestId
 * @description
 * Provides middleware for generating a unique requestId for each HTTP request.
 */

// ! lib
// koa
import { Context, Next } from 'koa';

// ! own
// utils
import { EnvironmentUtils } from '@utils';

/**
 * Middleware for generating a unique requestId for each HTTP request.
 *
 * The `requestId` is stored in `ctx.state.requestId` and used throughout the application
 * for grouping logs related to a specific request. It can also be returned in the
 * response headers (`X-Request-ID`) for debugging purposes.
 *
 * @example
 * // Accessing requestId in a controller:
 * const requestId = ctx.state.requestId;
 * this.info({
 *   message: 'Processing user request',
 *   requestId,
 *   details: { userId: 17 },
 * });
 */
export async function RequestIdMiddleware(
	ctx: Context,
	next: Next
): Promise<void> {
	const timestamp = Date.now().toString(36); // Текущая временная метка
	const random = Math.random().toString(36).substring(2, 6); // Случайная часть

	// Generate a unique requestId
	const requestId = `${timestamp}${random}`;

	// Attach requestId to the context state
	ctx.state.requestId = requestId;

	if (EnvironmentUtils.isDebug()) {
		// Include requestId in the response headers
		ctx.set('X-Request-ID', requestId);
	}

	await next();
}
