// src/errors/Forbidden.error.ts

/**
 * Authentication error handler
 * @module Errors/ForbiddenError
 * @description
 * Handles authentication failures:
 * - Insufficient permissions
 */

// ! own
// errors
import { AppError, EOrigin } from '@errors';
// interfaces
import { EHttpClientErrorStatus } from '@interfaces';

/**
 * Error for forbidden failures
 * @extends AppError
 */
export class ForbiddenError extends AppError {
	/**
	 * Creates a new forbidden error
	 * @param origin - Error placement origin
	 * @param message - Error message
	 * @param originalError - Original error
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
			name: ForbiddenError.name,
			statusCode: EHttpClientErrorStatus.Forbidden,
			origin,
			message,
			subError,
			originalError,
			details
		});
	}
}
