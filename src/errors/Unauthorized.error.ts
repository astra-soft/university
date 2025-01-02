// src/errors/Unauthorized.error.ts

/**
 * Authentication error handler
 * @module Errors/UnauthorizedError
 * @description
 * Handles authentication failures:
 * - Invalid credentials
 * - Missing token
 * - Expired token
 * - Insufficient permissions
 */

// ! own
// errors
import { AppError, EOrigin } from '@errors';
// interfaces
import { EHttpClientErrorStatus } from '@interfaces';

/**
 * Error for authentication failures
 * @extends AppError
 */
export class UnauthorizedError extends AppError {
	/**
	 * Creates a new unauthorized error
	 * @param origin - Error placement origin
	 * @param message - Error message
	 * @param subError - Error sub-type
	 * @param details - Error details from MongoDB
	 */
	constructor({
		origin,
		message,
		originalError,
		subError,
		details
	}: {
		origin: EOrigin;
		message: string;
		originalError?: Error;
		subError?: string;
		details?: any;
	}) {
		super({
			name: UnauthorizedError.name,
			statusCode: EHttpClientErrorStatus.Unauthorized,
			origin,
			message,
			subError,
			originalError,
			details
		});
	}
}
