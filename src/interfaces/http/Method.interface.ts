// src/interfaces/http/method.interface.ts

/**
 * HTTP method definitions and types
 * @module Interfaces/Http/Method
 * @description
 * Defines standard HTTP methods used in the application.
 * These methods align with RESTful API conventions:
 * - GET: Retrieve resources
 * - POST: Create new resources
 * - PUT: Update resources (full update)
 * - PATCH: Partial resource updates
 * - DELETE: Remove resources
 */

/**
 * Standard HTTP methods enum
 * @enum {string}
 */
export enum EHttpMethod {
	/** Retrieve a resource or list of resources */
	GET = 'GET',
	/** Create a new resource */
	POST = 'POST',
	/** Update a resource completely */
	PUT = 'PUT',
	/** Update a resource partially */
	PATCH = 'PATCH',
	/** Remove a resource */
	DELETE = 'DELETE'
}
