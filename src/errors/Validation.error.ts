// src/errors/ValidationError.error.ts

/**
 * Validation error handler
 * @module Errors/ValidationError
 * @description
 * Handles data validation failures:
 * - Schema validation
 * - Required fields
 * - Format validation
 * - Business rule validation
 */

// ! own
// errors
import { AppError, EOrigin } from '@errors';
// interfaces
import { EHttpClientErrorStatus } from '@interfaces';

/**
 * Error for validation failures
 * @extends AppError
 */
export class ValidationError extends AppError {
	/**
	 * Creates a new validation error
	 * @param origin - Error placement origin
	 * @param message - Error message
	 * @param subError - Error sub-type
	 * @param details - Validation failure details
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
			name: ValidationError.name,
			statusCode: EHttpClientErrorStatus.BadRequest,
			origin,
			message,
			subError,
			originalError,
			details
		});
	}
}
