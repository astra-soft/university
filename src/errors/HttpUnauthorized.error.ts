// src/errors/HttpUnauthorized.error.ts

/**
 * Authentication error handler
 * @module Errors/Unauthorized
 * @description
 * Handles authentication failures:
 * - Invalid credentials
 * - Missing token
 * - Expired token
 * - Insufficient permissions
 */

// ! own
// errors
import { HttpError } from '@errors';
// interfaces
import { EHttpClientErrorStatus } from '@interfaces';

/**
 * Error for authentication failures
 * @extends HttpError
 */
export class HttpUnauthorizedError extends HttpError {
	/**
	 * Creates a new unauthorized error
	 * @param details - Authentication failure details
	 */
	constructor(details: any) {
		super('Unauthorized access', EHttpClientErrorStatus.Unauthorized, details);
	}
}
