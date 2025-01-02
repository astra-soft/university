// src/framework/BaseController.ts

/**
 * BaseController
 * @module Framework/BaseController
 */

// ! lib
// koa
import { Context } from 'koa';

// ! own
// config
import { config } from '@config';
// framework
import { BaseModule } from '@framework';
// interfaces
import { EHttpSuccessStatus, ETypeBlock, TBlockValue } from '@interfaces';
// utils
import { EnvironmentUtils } from '@utils';

/**
 * Base class for all controllers.
 * Provides common functionality like logging, error handling, and response formatting.
 * @abstract
 * @extends BaseModule
 */
export abstract class BaseController extends BaseModule {
	/**
	 * Sets the authorization cookie with the provided token.
	 *
	 * @param ctx - The Koa context object.
	 * @param token - The token to set in the cookie.
	 */
	protected setAuthorizationCookie(ctx: Context, token: string): void {
		ctx.cookies.set('jwt', token, {
			httpOnly: true,
			secure: EnvironmentUtils.isProduction(), // Только HTTPS в продакшене
			sameSite: 'none', // 'strict', 'lax', 'none'
			maxAge: config.auth.expiresIn
		});
	}

	constructor(moduleName: TBlockValue<ETypeBlock.Controller>) {
		super(ETypeBlock.Controller, moduleName);
	}

	/**
	 * Sends a standardized JSON response.
	 *
	 * @param ctx - The Koa context object.
	 * @param data - The data to send in the response.
	 * @param message - A descriptive message about the response.
	 * @param status - The HTTP status code (default: 200).
	 */
	protected sendResponse({
		ctx,
		data,
		dataToSend,
		message,
		status = EHttpSuccessStatus.OK,
		meta
	}: {
		ctx: Context;
		data: any;
		dataToSend: any;
		message?: string;
		status?: EHttpSuccessStatus;
		meta?: Record<string, any>;
	}): void {
		this.info({
			message: 'Sending response.',
			requestId: ctx.state.requestId,
			details: { status, data, message, meta }
		});

		ctx.status = status;
		ctx.body = {
			requestId: ctx.state.requestId,
			message,
			data: dataToSend,
			meta
		};
	}
}
