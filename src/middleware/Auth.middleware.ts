// src/middleware/Auth.middleware.ts

/**
 * @file Middleware for authenticating user.
 * @module Middleware/Auth
 * @description
 * Provides middleware for authenticating.
 */

// ! lib
// koa
import { Context, Next } from 'koa';

// ! own
// interfaces
import { EOrigin, UnauthorizedError } from '@errors';
// interfaces
import { IHashedBaseUser } from '@interfaces';
// utils
import { CryptoUtils } from '@utils';

export async function AuthMiddleware(ctx: Context, next: Next): Promise<void> {
	const token = ctx.cookies.get('jwt');

	if (!token) {
		throw new UnauthorizedError({
			origin: EOrigin.Middleware,
			message: 'No token provided',
			// subError?: string,
			// originalError: error as Error
			details: {
				reason: 'No token provided'
			}
		});
	}

	const user: IHashedBaseUser | null = CryptoUtils.validateJwtToken(token);

	if (!user) {
		throw new UnauthorizedError({
			origin: EOrigin.Middleware,
			message: 'Invalid token provided',
			// subError?: string,
			// originalError: error as Error
			details: {
				reason: 'Invalid token provided'
			}
		});
	}

	ctx.state.user = user;

	await next();
}
