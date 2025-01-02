// src/framework/BaseModule.ts

/**
 * BaseModule
 * @module Framework/BaseModule
 */

// ! own
// framework
import { Logger } from '@framework';
// interfaces
import {
	BlockNames,
	ETypeBlock,
	ILogModuleData,
	TBlockValue
} from '@interfaces';

/**
 * Base class for modules such as services, controllers, etc.
 */
export abstract class BaseModule {
	protected logger: typeof Logger;
	protected readonly moduleType: ETypeBlock;
	protected readonly moduleName: TBlockValue<ETypeBlock>;

	constructor(moduleType: ETypeBlock, moduleName: TBlockValue<ETypeBlock>) {
		if (!Object.values(ETypeBlock).includes(moduleType)) {
			throw new Error(
				`Invalid moduleType: ${moduleType}. Must be one of ${Object.values(
					ETypeBlock
				).join(', ')}.`
			);
		}

		const validNames = Object.values(BlockNames[moduleType]);
		if (!validNames.includes(moduleName)) {
			throw new Error(
				`Invalid moduleName: ${moduleName}. Must be one of ${validNames.join(
					', '
				)}.`
			);
		}

		this.logger = Logger;
		this.moduleType = moduleType;
		this.moduleName = moduleName;
	}

	private get logData() {
		return {
			moduleType: this.moduleType,
			moduleName: this.moduleName
		};
	}

	/**
	 * Logs an informational message.
	 *
	 * This method logs a message with the `INFO` level. It includes additional context,
	 * such as the module type, module name, and an optional request identifier (`requestId`),
	 * which is useful for grouping logs related to a single HTTP request.
	 *
	 * @param {ILogModuleData} logData - The data to be logged.
	 * @param {string} logData.message - The main log message.
	 * @param {string} [logData.requestId] - A unique identifier for the request, generated by middleware.
	 * @param {Record<string, any>} [logData.details] - Additional details providing context.
	 *
	 * @example
	 * this.info({
	 *   message: 'Fetching user data',
	 *   requestId: ctx.state.requestId,
	 *   details: { userId: 42 },
	 * });
	 */
	protected info(logData: ILogModuleData) {
		this.logger.info({
			...this.logData,
			...logData
		});
	}

	/**
	 * Logs an error message.
	 *
	 * This method logs a message with the `ERROR` level. It includes additional context,
	 * such as the module type, module name, and an optional request identifier (`requestId`). Useful for
	 * tracking errors or unexpected behavior in the application.
	 *
	 * @param {ILogModuleData} logData - The data to be logged.
	 * @param {string} logData.message - The main log message describing the error.
	 * @param {string} [logData.requestId] - A unique identifier for the request, generated by middleware.
	 * @param {Record<string, any>} [logData.details] - Additional key-value pairs providing context about the error.
	 *
	 * @example
	 * this.error({
	 *   message: 'User not found',
	 *   requestId: '12345',
	 *   details: { userId: 17 }
	 * });
	 */
	protected error(logData: ILogModuleData) {
		this.logger.error({
			...this.logData,
			...logData
		});
	}

	/**
	 * Logs an debug message.
	 *
	 * This method logs a message with the `DEBUG` level. It includes additional context,
	 * such as the module type, module name, and an optional request identifier (`requestId`). Useful for
	 * tracking debug information in the application.
	 *
	 * @param {ILogModuleData} logData - The data to be logged.
	 * @param {string} logData.message - The main log message describing the error.
	 * @param {string} [logData.requestId] - A unique identifier for the request, generated by middleware.
	 * @param {Record<string, any>} [logData.details] - Additional key-value pairs providing context about the error.
	 *
	 * @example
	 * this.debug({
	 *   message: 'Check params',
	 *   requestId: '12345',
	 *   details: { invoiceId: 17, userId: 42 }
	 * });
	 */
	protected debug(logData: ILogModuleData) {
		this.logger.debug({
			...this.logData,
			...logData
		});
	}

	/**
	 * Logs an warn message.
	 *
	 * This method logs a message with the `WARN` level. It includes additional context,
	 * such as the module type, module name, and an optional request identifier (`requestId`). Useful for
	 * tracking warnings in the application.
	 *
	 * @param {ILogModuleData} logData - The data to be logged.
	 * @param {string} logData.message - The main log message describing the error.
	 * @param {string} [logData.requestId] - A unique identifier for the request, generated by middleware.
	 * @param {Record<string, any>} [logData.details] - Additional key-value pairs providing context about the error.
	 *
	 * @example
	 * this.warn({
	 *   message: 'Login attempt failed',
	 *   requestId: '12345',
	 *   details: { userId: 42, reason: 'Invalid password' }
	 * });
	 */
	protected warn(logData: ILogModuleData) {
		this.logger.warn({
			...this.logData,
			...logData
		});
	}
}
