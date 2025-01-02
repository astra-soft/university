// src/utils/Environment.utils.ts

/**
 * Utility functions for environment management and checking
 * @module Utils/EnvironmentUtils
 *
 * Этот модуль предоставляет утилиты для управления окружением приложения, включая проверки на тип окружения
 * (продакшн, разработка, отладка) и получение текущего окружения.
 */

// ! own
// config
import { config } from '@config';
// interfaces
import { EEnvironment } from '@interfaces';

export class EnvironmentUtils {
	private static _environment: EEnvironment = config.app
		.environment as EEnvironment;
	private static _isProduction: boolean =
		this._environment === EEnvironment.Production;
	private static _isDevelopment: boolean =
		this._environment === EEnvironment.Development;
	private static _isDebug: boolean = this._environment === EEnvironment.Debug;

	static maxLoginAttempts: number = this.isProduction() ? 3 : 2;
	static lockoutPeriodMinutes: number = this.isProduction() ? 15 : 1;

	/**
	 * Checks if application is running in production environment
	 * @returns {boolean} True if environment is production
	 */
	static isProduction(): boolean {
		return this._isProduction;
	}

	/**
	 * Checks if application is not running in production environment
	 * @returns {boolean} True if environment is not production
	 */
	static isNotProduction(): boolean {
		return !this.isProduction();
	}

	/**
	 * Checks if application is running in development environment
	 * @returns {boolean} True if environment is development
	 */
	static isDevelopment(): boolean {
		return this._isDevelopment;
	}

	/**
	 * Checks if application is not running in development environment
	 * @returns {boolean} True if environment is not development
	 */
	static isNotDevelopment(): boolean {
		return !this.isDevelopment();
	}

	/**
	 * Checks if application is running in debug environment
	 * @returns {boolean} True if environment is debug
	 */
	static isDebug(): boolean {
		return this._isDebug;
	}

	/**
	 * Checks if application is not running in debug environment
	 * @returns {boolean} True if environment is not debug
	 */
	static isNotDebug(): boolean {
		return !this.isDebug();
	}

	/**
	 * Checks if application is running in specific environment
	 * @param environment - Environment to check against
	 * @returns {boolean} True if current environment matches specified environment
	 * @example
	 * isEnvironment(EEnvironment.Production) // returns true in production
	 */
	static isEnvironment(environment: EEnvironment): boolean {
		return this._environment === environment;
	}

	/**
	 * Checks if application is running in specific environment
	 * @param environment - Environment to check against
	 * @returns {boolean} False if current environment matches specified environment
	 * @example
	 * isNotEnvironment(EEnvironment.Production) // returns false in production
	 * isNotEnvironment(EEnvironment.Debug) // returns true in development
	 */
	static isNotEnvironment(environment: EEnvironment): boolean {
		return !this.isEnvironment(environment);
	}

	/**
	 * Gets current application environment
	 * @returns {EEnvironment} Current environment
	 * @example
	 * const env = getEnvironment(); // Returns current environment enum value
	 */
	static getEnvironment(): EEnvironment {
		return this._environment;
	}
}
