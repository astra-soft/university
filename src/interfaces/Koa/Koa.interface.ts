// src/interface/Koa/Koa.interface.ts

// ! own
// interfaces
import { IHashedBaseUser } from '@interfaces';

/**
 * Custom state interface for Koa context
 * @description
 * Defines the structure of the `state` object used in Koa's context.
 * This interface extends the default state to include:
 * - Request-specific metadata (`requestId`, `clientData`).
 * - User information (`user`).
 * - Validated data (`validatedData` and `validatedParams`).
 */

/**
 * Interface for custom state used in Koa context.
 */
export interface ICustomState {
	/** Unique request identifier for tracking logs or debugging */
	requestId: string;

	/** Client-specific metadata attached to each request */
	clientData: {
		/** IP address of the client making the request */
		clientIp: string;

		/** HTTP method of the request */
		method: string;

		/** URL being accessed by the client */
		url: string;

		/** Request headers as key-value pairs */
		headers: Record<string, any>;
	};

	/**
	 * Authenticated user information, if available
	 * @type {IHashedBaseUser | undefined}
	 * Contains hashed or base user data for authenticated requests.
	 */
	user?: IHashedBaseUser;

	/**
	 * Data validated from the request body
	 * @type {any | undefined}
	 * Represents validated data extracted from the request body after processing middleware.
	 */
	validatedData?: any;

	/**
	 * Data validated from the request parameters
	 * @type {any | undefined}
	 * Represents validated data extracted from URL parameters or query strings.
	 */
	validatedParams?: any;
}
/**
 * Extends the Koa `BaseContext` interface to include the custom state.
 */
declare module 'koa' {
	interface BaseContext {
		/** Custom state used for enhanced request handling */
		state: ICustomState;
	}
}
