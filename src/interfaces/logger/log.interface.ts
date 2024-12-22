// src/interfaces/logger/log.interface.ts

/**
 * Logging system interfaces and types
 * @module Interfaces/Logger/Log
 * @description
 * Defines the core logging system structures including:
 * - Complete log entry model (ILog)
 * - Log data structures for different contexts
 * - Compressed log format for storage
 * - Router endpoint identifiers
 *
 * The logging system supports:
 * - Module-specific context
 * - Request tracking
 * - Route identification
 * - Detailed error reporting
 * - Storage optimization
 */

// ! own
// interfaces
import { ELogLevel, ETypeModule, TModuleValue } from '@interfaces';

/**
 * Complete log entry model containing all log information
 * @extends ILogData
 */
export interface ILog extends ILogData {
	/** Unique identifier for the log entry */
	id: string;
	/** Timestamp when the log was created */
	createdAt: Date;
	/** Severity level of the log */
	level: ELogLevel;
}

/**
 * Log data passed to logging methods
 * Contains module-specific information and basic log data
 * @extends ILogModuleData
 */
export interface ILogData extends ILogModuleData {
	/** Module name value from corresponding enum */
	moduleName: TModuleValue<ETypeModule>;
	/** Type of the module that generated the log */
	moduleType: ETypeModule;
}

/**
 * Basic log data passed from modules
 * Contains essential information about the log event
 */
export interface ILogModuleData {
	/** Main log message */
	message: string;
	/** Optional request identifier for tracking */
	requestId?: string;
	/** Optional router identifier for API endpoints */
	routerId?: ERouterId;
	/** Optional additional information in key-value format */
	details?: Record<string, any>;
}

/**
 * Compressed log model for storage optimization
 * Uses shortened property names and minimal required fields
 */
export interface ILogCompressed {
	/** Log ID (shortened from 'id') */
	i: string;
	/** Creation timestamp (shortened from 'createdAt') */
	c: Date;
	/** Message (shortened from 'message') */
	m: string;
	/** Log level (shortened from 'level') */
	l: ELogLevel;
	/** Module name code (shortened from 'moduleName') */
	mn: number;
	/** Module type (shortened from 'moduleType') */
	mt: ETypeModule;
	/** Request ID (shortened from 'requestId') */
	r: string;
	/** Router ID (shortened from 'routerId') */
	ri?: ERouterId;
	/** Additional details (shortened from 'details') */
	d?: Record<string, any>;
}

/**
 * Enumeration of available router endpoints
 * Used for identifying specific API routes in logs
 */
export enum ERouterId {
	// Authentication routes
	/** POST /auth/login */
	AuthLogin = 0,
	/** POST /auth/check-token */
	AuthCheckToken = 1,

	// User management routes
	/** POST /users/create */
	CreateUser = 2
}
