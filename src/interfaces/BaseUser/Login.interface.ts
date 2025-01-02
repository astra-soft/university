// src/interfaces/BaseUser/Login.interface.ts

/**
 * @module Interfaces/BaseUser/Login
 *
 * This module defines the interfaces related to user login functionality.
 * It includes the structure for login attempts and the possible results
 * of a login operation.
 */

/**
 * @enum {string}
 * @description Enum representing the possible results of a login attempt.
 *
 * This enum defines the outcomes of a login attempt, indicating whether
 * the attempt was successful, failed due to invalid credentials, or blocked
 * due to account restrictions.
 */
export enum ELoginResult {
	/**
	 * @description Represents a successful login attempt.
	 */
	Success = 'success',

	/**
	 * @description Represents a failed login attempt due to invalid credentials.
	 */
	Failed = 'failed',

	/**
	 * @description Represents a blocked account due to restrictions.
	 */
	Blocked = 'blocked'
}

/**
 * @interface ILoginAttempt
 * @description Interface representing a record of a login attempt.
 *
 * This interface defines the structure for storing information about
 * a user's login attempt, including the timestamp, IP address,
 * user agent, geolocation data, and the result of the attempt.
 */
export interface ILoginAttempt {
	/** @property {Date} timestamp - The timestamp of the login attempt. */
	timestamp: Date;

	/** @property {string} ip - The IP address from which the login attempt was made. */
	ip: string;

	/** @property {string} [userAgent] - The user agent string of the client making the request. */
	userAgent?: string;

	/** @property {Object} [location] - Geolocation data if available. */
	location?: {
		/** @property {string} [country] - The country of the user. */
		country?: string;

		/** @property {string} [city] - The city of the user. */
		city?: string;

		/** @property {Object} [coordinates] - The geographical coordinates of the user. */
		coordinates?: {
			/** @property {number} latitude - The latitude of the user's location. */
			latitude: number;

			/** @property {number} longitude - The longitude of the user's location. */
			longitude: number;
		};
	};

	/** @property {ELoginResult} result - The result of the login attempt. */
	result: ELoginResult;
}

export interface ICreateLoginAttempt extends Omit<ILoginAttempt, 'timestamp'> {}
