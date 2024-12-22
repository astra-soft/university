// src/interfaces/http/Status.interface.ts

/**
 * HTTP status codes definitions
 * @module Interfaces/Http/Status
 * @description
 * Defines standard HTTP status codes grouped by their types:
 * - 1xx: Informational responses
 * - 2xx: Successful responses
 * - 3xx: Redirection messages
 * - 4xx: Client error responses
 * - 5xx: Server error responses
 */

/**
 * HTTP informational response status codes (1xx)
 * @enum {number}
 */
export enum EHttpInformationalStatus {
	/** Server has received the request headers and client should proceed */
	Continue = 100,
	/** Server is switching protocols as requested */
	SwitchingProtocols = 101
}

/**
 * HTTP success status codes (2xx)
 * @enum {number}
 */
export enum EHttpSuccessStatus {
	/** Request succeeded */
	OK = 200,
	/** Request succeeded and new resource created */
	Created = 201,
	/** Request accepted but processing not completed */
	Accepted = 202,
	/** Request succeeded but no content to return */
	NoContent = 204
}

/**
 * HTTP redirection status codes (3xx)
 * @enum {number}
 */
export enum EHttpRedirectionStatus {
	/** Resource has multiple representations */
	MultipleChoices = 300,
	/** Resource moved permanently */
	MovedPermanently = 301,
	/** Resource found under different URI */
	Found = 302,
	/** Temporary redirect */
	TemporaryRedirect = 307,
	/** Permanent redirect */
	PermanentRedirect = 308
}

/**
 * HTTP client error status codes (4xx)
 * @enum {number}
 */
export enum EHttpClientErrorStatus {
	/** Server cannot understand request */
	BadRequest = 400,
	/** Request requires authentication */
	Unauthorized = 401,
	/** Server understood but refuses request */
	Forbidden = 403,
	/** Resource not found */
	NotFound = 404,
	/** Method not allowed for resource */
	MethodNotAllowed = 405,
	/** Resource conflict */
	Conflict = 409,
	/** Resource no longer available */
	Gone = 410,
	/** Precondition failed */
	PreconditionFailed = 412,
	/** Request entity too large */
	PayloadTooLarge = 413,
	/** Request URI too long */
	URITooLong = 414,
	/** Unsupported media type */
	UnsupportedMediaType = 415,
	/** Range not satisfiable */
	RangeNotSatisfiable = 416,
	/** Expectation failed */
	ExpectationFailed = 417,
	/** Too many requests */
	TooManyRequests = 429
}

/**
 * HTTP server error status codes (5xx)
 * @enum {number}
 */
export enum EHttpServerErrorStatus {
	/** Generic server error */
	InternalServerError = 500,
	/** Server does not support functionality */
	NotImplemented = 501,
	/** Server acting as gateway got invalid response */
	BadGateway = 502,
	/** Server temporarily unavailable */
	ServiceUnavailable = 503,
	/** Gateway timeout */
	GatewayTimeout = 504
}

/**
 * Type combining all HTTP status codes
 */
export type THttpStatus =
	| EHttpInformationalStatus
	| EHttpSuccessStatus
	| EHttpRedirectionStatus
	| EHttpClientErrorStatus
	| EHttpServerErrorStatus;
