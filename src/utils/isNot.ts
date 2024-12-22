// src/utils/isNot.ts

/**
 * Utility functions for type checking and value validation
 * @module Utils/IsNot
 */

/**
 * Checks if a value is not undefined
 * @param value - Any value to check
 * @returns {boolean} True if value is not undefined, false otherwise
 * @example
 * isNotUndefined(null)      // returns true
 * isNotUndefined(0)         // returns true
 * isNotUndefined(undefined) // returns false
 */
export function isNotUndefined(value: any): boolean {
	return value !== undefined;
}

/**
 * Checks if a value is undefined
 * @param value - Any value to check
 * @returns {boolean} True if value is undefined, false otherwise
 * @example
 * isUndefined(undefined) // returns true
 * isUndefined(null)      // returns false
 * isUndefined(0)        // returns false
 */
export function isUndefined(value: any): boolean {
	return value === undefined;
}

/**
 * Checks if a value is not null
 * @param value - Any value to check
 * @returns {boolean} True if value is not null, false otherwise
 * @example
 * isNotNull(undefined) // returns true
 * isNotNull(0)        // returns true
 * isNotNull(null)     // returns false
 */
export function isNotNull(value: any): boolean {
	return value !== null;
}

/**
 * Checks if a value is null
 * @param value - Any value to check
 * @returns {boolean} True if value is null, false otherwise
 * @example
 * isNull(null)      // returns true
 * isNull(undefined) // returns false
 * isNull(0)        // returns false
 */
export function isNull(value: any): boolean {
	return value === null;
}
