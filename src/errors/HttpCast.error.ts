// src/errors/HttpCast.error.ts

/**
 * MongoDB cast error handler
 * @module Errors/Cast
 * @description
 * Handles MongoDB CastError cases when:
 * - Invalid ObjectId format
 * - Type conversion fails
 * - Invalid enum value
 */

// ! own
// errors
import { HttpError } from '@errors';
// interfaces
import { EHttpClientErrorStatus } from '@interfaces';

/**
 * Error for invalid data type conversions
 * @extends HttpError
 */
export class HttpCastError extends HttpError {
	/**
	 * Creates a new cast error
	 * @param field - Field name that failed conversion
	 * @param details - Error details from MongoDB
	 */
	constructor(field: string, details: any) {
		super(
			`Invalid value for field ${field}`,
			EHttpClientErrorStatus.BadRequest,
			details
		);
	}
}
