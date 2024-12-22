// src/utils/environment.ts

/**
 * Utility functions for environment management and checking
 * @module Utils/Environment
 */

// ! own
// config
import { config } from '@config';
// interfaces
import { EEnvironment } from '@interfaces';

/**
 * Checks if application is running in production environment
 * @returns {boolean} True if environment is production
 */
export function isProduction(): boolean {
	return getEnvironment() === EEnvironment.Production;
}

/**
 * Checks if application is not running in production environment
 * @returns {boolean} True if environment is not production
 */
export function isNotProduction(): boolean {
	return !isProduction();
}

/**
 * Checks if application is running in development environment
 * @returns {boolean} True if environment is development
 */
export function isDevelopment(): boolean {
	return getEnvironment() === EEnvironment.Development;
}

/**
 * Checks if application is not running in development environment
 * @returns {boolean} True if environment is not development
 */
export function isNotDevelopment(): boolean {
	return !isDevelopment();
}

/**
 * Checks if application is running in debug environment
 * @returns {boolean} True if environment is debug
 */
export function isDebug(): boolean {
	return getEnvironment() === EEnvironment.Debug;
}

/**
 * Checks if application is not running in debug environment
 * @returns {boolean} True if environment is not debug
 */
export function isNotDebug(): boolean {
	return !isDebug();
}

/**
 * Checks if application is running in specific environment
 * @param environment - Environment to check against
 * @returns {boolean} True if current environment matches specified environment
 * @example
 * isEnvironment(EEnvironment.Production) // returns true in production
 */
export function isEnvironment(environment: EEnvironment): boolean {
	return getEnvironment() === environment;
}

/**
 * Gets current application environment
 * @returns {EEnvironment} Current environment, defaults to Production if invalid
 * @example
 * const env = getEnvironment(); // Returns current environment enum value
 */
export function getEnvironment(): EEnvironment {
	if (
		Object.values(EEnvironment).includes(config.app.environment as EEnvironment)
	) {
		return config.app.environment as EEnvironment;
	} else {
		return EEnvironment.Production;
	}
}
