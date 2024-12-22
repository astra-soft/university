// src/errors/HttpValidationError.error.ts

/**
 * Validation error handler
 * @module Errors/Validation
 * @description
 * Handles data validation failures:
 * - Schema validation
 * - Required fields
 * - Format validation
 * - Business rule validation
 */

// ! own
// errors
import { HttpError } from '@errors';
// interfaces
import { EHttpClientErrorStatus } from '@interfaces';

/**
 * Error for validation failures
 * @extends HttpError
 */
export class HttpValidationError extends HttpError {
	/**
	 * Creates a new validation error
	 * @param details - Validation failure details
	 */
	constructor(details: any) {
		super('Validation error', EHttpClientErrorStatus.BadRequest, details);
	}
}
