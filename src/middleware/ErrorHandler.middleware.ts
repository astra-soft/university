// src/middleware/ErrorHandler.middleware.ts

/**
 * @file Middleware for handling errors.
 * @module Middleware/ErrorHandler
 * @description
 * Provides middleware for handling errors.
 */

// ! lib
// koa
import { Context, Next } from 'koa';

// ! own
// framework
import { ErrorHandler, Logger } from '@framework';
// interfaces
import { EErrorHandlerNameModule, ETypeBlock } from '@interfaces';

/**
 * Middleware for handling errors.
 * @param {Context} ctx - The context object.
 * @param {Next} next - The next middleware function.
 * @returns {Promise<void>} A promise that resolves when the middleware is complete.
 */
export async function ErrorHandlerMiddleware(
	ctx: Context,
	next: Next
): Promise<void> {
	try {
		await next();
	} catch (error: unknown) {
		const response = ErrorHandler.handle(error, ctx.state.requestId);

		Logger.warn({
			moduleName: EErrorHandlerNameModule.MainErrorHandler,
			moduleType: ETypeBlock.ErrorHandler,
			message: response.body.message,
			requestId: response.body.requestId,
			details: {
				errorName: response.body.error,
				subError: response.body.subError,
				details: response.body.details
			}
		});

		ctx.status = response.status;
		ctx.body = response.body;
	}
}
