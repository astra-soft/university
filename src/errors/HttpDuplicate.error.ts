// src/errors/HttpDuplicate.error.ts

/**
 * Duplicate key error handler
 * @module Errors/Duplicate
 * @description
 * Handles MongoDB duplicate key errors when:
 * - Unique index violation
 * - Duplicate values in unique fields
 */

// ! own
// errors
import { HttpError } from '@errors';
// interfaces
import { EHttpClientErrorStatus } from '@interfaces';

/**
 * Error for duplicate key violations
 * @extends HttpError
 */
export class HttpDuplicateKeyError extends HttpError {
	/**
	 * Creates a new duplicate key error
	 * @param details - MongoDB error details
	 */
	constructor(details: any) {
		super(`Duplicate key error`, EHttpClientErrorStatus.Conflict, details);
	}
}
