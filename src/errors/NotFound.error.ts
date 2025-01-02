// src/errors/NotFound.error.ts

/**
 * Not found error handler
 * @module Errors/NotFoundError
 * @description
 * Handles not found failures:
 * - Not found routers
 * - Not found entities
 * - Not found files
 */

// ! own
// errors
import { AppError, EOrigin } from '@errors';
// interfaces
import { EHttpClientErrorStatus } from '@interfaces';

/**
 * Error for not found failures
 * @extends HttpError
 */
export class NotFoundError extends AppError {
	/**
	 * Creates a new not found error
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
			name: NotFoundError.name,
			statusCode: EHttpClientErrorStatus.NotFound,
			origin,
			message,
			subError,
			originalError,
			details
		});
	}
}
