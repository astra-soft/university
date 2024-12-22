// src/errors/Http.error.ts

/**
 * Base HTTP error class
 * @module Errors/Http
 * @description
 * Provides base error class for all HTTP-related errors with:
 * - HTTP status code
 * - Error message
 * - Optional error details
 */

/**
 * Base class for all HTTP errors
 * @extends Error
 */
export class HttpError extends Error {
	/** HTTP status code */
	public statusCode: number;
	/** Additional error details */
	public details: any;

	/**
	 * Creates a new HTTP error
	 * @param message - Error message
	 * @param statusCode - HTTP status code (defaults to 500)
	 * @param details - Additional error information
	 */
	constructor(message: string, statusCode: number = 500, details: any = null) {
		super(message);
		this.statusCode = statusCode;
		this.details = details;
		this.name = this.constructor.name;
	}
}
