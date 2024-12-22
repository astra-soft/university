// src/core/Module.ts

/**
 * Base component abstract class providing logging functionality
 * @module Core/Module
 * @description
 * Provides base functionality for all application modules including:
 * - Standardized logging methods (info, error, debug, warn)
 * - Module type and name identification
 * - Automatic module context for logs
 */

// ! own
// core
import { Logger } from '@core';
// interface
import { ETypeModule, ILogModuleData, TModuleValue } from '@interfaces';

/**
 * Abstract base class for all application modules
 * Provides standardized logging and module identification
 */
export abstract class Module {
	/** Module name from corresponding enum */
	protected readonly name: TModuleValue<ETypeModule>;
	/** Module type identifier */
	protected readonly type: ETypeModule;

	/**
	 * Creates a new module instance
	 * @param type - Module type from ETypeModule
	 * @param name - Module name from corresponding enum
	 */
	constructor(type: ETypeModule, name: TModuleValue<ETypeModule>) {
		this.name = name;
		this.type = type;
	}

	/**
	 * Logs an informational message
	 * @param logData - Log data without module context
	 */
	protected info(logData: ILogModuleData): void {
		Logger.info({
			moduleType: this.type,
			moduleName: this.name,
			...logData
		});
	}

	/**
	 * Logs an error message
	 * @param logData - Log data without module context
	 */
	protected error(logData: ILogModuleData): void {
		Logger.error({
			moduleType: this.type,
			moduleName: this.name,
			...logData
		});
	}

	/**
	 * Logs a debug message
	 * @param logData - Log data without module context
	 */
	protected debug(logData: ILogModuleData): void {
		Logger.debug({
			moduleType: this.type,
			moduleName: this.name,
			...logData
		});
	}

	/**
	 * Logs a warning message
	 * @param logData - Log data without module context
	 */
	protected warn(logData: ILogModuleData): void {
		Logger.warn({
			moduleType: this.type,
			moduleName: this.name,
			...logData
		});
	}
}
