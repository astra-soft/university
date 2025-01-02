// src/errors/Cast.error.ts

/**
 * MongoDB cast error handler
 * @module Errors/CastError
 * @description
 * Handles MongoDB CastError cases when:
 * - Invalid ObjectId format
 * - Type conversion fails
 * - Invalid enum value
 */

// ! own
// errors
import { AppError, EOrigin } from '@errors';
// interfaces
import { EHttpClientErrorStatus } from '@interfaces';

/**
 * Error for invalid data type conversions
 * @extends AppError
 */
export class CastError extends AppError {
	/**
	 * Creates a new cast error
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
			name: CastError.name,
			statusCode: EHttpClientErrorStatus.BadRequest,
			origin,
			message,
			subError,
			originalError,
			details
		});
	}
}
