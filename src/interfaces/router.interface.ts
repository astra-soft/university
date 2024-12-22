// src/interface/router.interface.ts

/**
 * Router type definitions
 * @module Interfaces/Router
 * @description
 * Defines types for HTTP request handling including:
 * - Request handler function signatures
 * - Router configuration types
 * - Route parameters
 */

// ! lib
// http
import { IncomingMessage, ServerResponse } from 'http';

// ! own
// core
import { RequestContext } from '@core';

/**
 * HTTP request handler function type
 * @param req - Node.js HTTP request object
 * @param res - Node.js HTTP response object
 * @param context - Request context containing metadata and auth info
 */
export type RequestHandler = (
	req: IncomingMessage,
	res: ServerResponse,
	context: RequestContext
) => void;
