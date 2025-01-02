// src/errors/Duplicate.error.ts

/**
 * Duplicate key error handler
 * @module Errors/DuplicateKeyError
 * @description
 * Handles MongoDB duplicate key errors when:
 * - Unique index violation
 * - Duplicate values in unique fields
 */

// ! own
// errors
import { AppError, EOrigin } from '@errors';
// interfaces
import { EHttpClientErrorStatus } from '@interfaces';

/**
 * Error for duplicate key violations
 * @extends AppError
 */
export class DuplicateKeyError extends AppError {
	/**
	 * Creates a new duplicate key error
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
			name: DuplicateKeyError.name,
			statusCode: EHttpClientErrorStatus.Conflict,
			origin,
			message,
			subError,
			originalError,
			details
		});
	}
}
