// src/interface/logger/level.interface.ts

/**
 * Log level definitions for the logging system
 * @module Interfaces/Logger/Level
 */

/**
 * Enumeration of available log levels in ascending order of severity
 * @enum {number}
 */
export enum ELogLevel {
	/** Informational messages about normal application operation */
	INFO = 0,
	/** Detailed messages useful for debugging */
	DEBUG = 1,
	/** Warning messages for potentially problematic situations */
	WARN = 2,
	/** Error messages for serious problems */
	ERROR = 3
}
