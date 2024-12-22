// src/interfaces/http/Request.interface.ts

/**
 * HTTP request/response type definitions
 * @module Interfaces/Http/Request
 * @description
 * Defines types for HTTP requests and responses including:
 * - Request headers and body
 * - Response structure
 * - Query parameters
 * - URL parameters
 */

import { THttpStatus, EHttpMethod } from '@interfaces';

/**
 * Base HTTP headers interface
 */
export interface IHttpHeaders {
	/** Content type of the request/response */
	'Content-Type'?: string;
	/** Authorization header */
	Authorization?: string;
	/** Accept types */
	Accept?: string;
	[key: string]: string | undefined;
}

/**
 * Query parameters type
 * @example
 * { search: "term", page: "1", limit: "10" }
 */
export type TQueryParams = Record<string, string>;

/**
 * URL parameters type
 * @example
 * { id: "123", userId: "456" }
 */
export type TUrlParams = Record<string, string>;

/**
 * HTTP request configuration
 * @template T - Request body type
 */
export interface IHttpRequest<T = unknown> {
	/** HTTP method */
	method: EHttpMethod;
	/** Request URL */
	url: string;
	/** Request headers */
	headers?: IHttpHeaders;
	/** Request body */
	body?: T;
	/** Query parameters */
	query?: TQueryParams;
	/** URL parameters */
	params?: TUrlParams;
}

/**
 * HTTP response structure
 * @template T - Response data type
 */
export interface IHttpResponse<T = unknown> {
	/** HTTP status code */
	status: THttpStatus;
	/** Response headers */
	headers: IHttpHeaders;
	/** Response data */
	data: T;
	/** Optional error message */
	message?: string;
}

/**
 * Error response structure
 */
export interface IHttpErrorResponse {
	/** HTTP status code */
	status: THttpStatus;
	/** Error message */
	message: string;
	/** Detailed error information */
	details?: Record<string, unknown>;
	/** Error code for client handling */
	code?: string;
	/** Stack trace (only in development) */
	stack?: string;
}

/**
 * Pagination parameters
 */
export interface IPaginationParams {
	/** Page number (1-based) */
	page: number;
	/** Items per page */
	limit: number;
	/** Total items count */
	total: number;
}

/**
 * Paginated response wrapper
 * @template T - Item type
 */
export interface IPaginatedResponse<T> {
	/** Array of items */
	items: T[];
	/** Pagination information */
	pagination: IPaginationParams;
}
