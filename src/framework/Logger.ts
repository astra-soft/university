// src/framework/Logger.ts

/**
 * Advanced logging system implementation
 * @module Framework/Logger
 * @description
 * Provides comprehensive logging functionality including:
 * - Multiple log levels (INFO, DEBUG, WARN, ERROR)
 * - Colored console output
 * - Module-based logging
 * - Request tracking
 * - Detailed error reporting
 * - Log compression for storage
 */

// ! own
// config
import { config } from '@config';
// interfaces
import {
	ELogLevel,
	EColor,
	ETypeBlock,
	ILogData,
	ILog,
	ILogCompressed,
	BlockNames,
	ELoggerNameComponent
} from '@interfaces';
// utils
import {
	DateUtils,
	EnvironmentUtils,
	StringUtils,
	ValueCheckerUtils
} from '@utils';

/**
 * Static logger class providing centralized logging functionality
 */
export class Logger {
	/** Color mapping for different log levels */
	private static colors = {
		[ELogLevel.INFO]: config.log.colors.INFO, // Success and info messages
		[ELogLevel.ERROR]: config.log.colors.ERROR, // Errors and failures
		[ELogLevel.DEBUG]: config.log.colors.DEBUG, // Debug information
		[ELogLevel.WARN]: config.log.colors.WARN // Warnings and cautions
	};

	/** Fixed widths for log formatting */
	private static readonly maxLevelWidth = config.log.maxLevelWidth; // Log level width
	private static readonly maxCurrentTimeWidth = config.log.maxCurrentTimeWidth; // Timestamp width
	private static readonly maxModuleTypeWidth = config.log.maxModuleTypeWidth; // Module type width
	private static readonly maxModuleNameWidth = config.log.maxModuleNameWidth; // Module name width

	private static createLog(level: ELogLevel, logData: ILogData): ILog {
		const id = crypto.randomUUID();

		const createdAt = new Date();

		return {
			id,
			createdAt,
			level,
			...logData
		};
	}

	private static log(level: ELogLevel, logData: ILogData) {
		const log = Logger.createLog(level, logData);

		// write log to console if not production
		if (EnvironmentUtils.isNotProduction()) {
			Logger.writeLog(log);
		}

		// save log to file
		Logger.saveLog(log);
	}

	private static saveLog(log: ILog) {
		try {
			const logCompressed = Logger.compressLog(log);
			// TODO: Implement saving to file or external storage
		} catch (error) {
			Logger.writeLog(
				Logger.createLog(ELogLevel.ERROR, {
					message: 'Error saving log',
					moduleType: ETypeBlock.Logger,
					moduleName: ELoggerNameComponent.Logger,
					details: {
						error
					}
				})
			);
		}
	}

	private static writeLog({
		id,
		createdAt,
		level,
		message,
		moduleType,
		moduleName,
		requestId,
		details
	}: ILog) {
		const color = Logger.colors[level];

		// ? Форматируем лог с фиксированной шириной для уровня, времени и блока

		// Formatted log level
		const paddedLevel = `${EColor.WHITE}[${color}${StringUtils.padString(
			ELogLevel[level],
			Logger.maxLevelWidth
		)}${EColor.WHITE}]`;

		// Formatted current time
		const paddedCurrentTime = `${EColor.GRAY}${StringUtils.padString(
			DateUtils.get24HourTime(createdAt),
			Logger.maxCurrentTimeWidth
		)}${EColor.WHITE}`;

		// Formatted type module
		const paddedModuleType = `${EColor.CYAN}${StringUtils.padString(
			ETypeBlock[moduleType],
			Logger.maxModuleTypeWidth
		)}${EColor.WHITE}`;

		// Formatted module name
		const paddedModuleName = `${EColor.CYAN}${StringUtils.padString(
			Object.keys(BlockNames[moduleType]).find(
				key => BlockNames[moduleType][key] === moduleName
			) || 'Unknown',
			Logger.maxModuleNameWidth
		)}${EColor.WHITE}`;

		// Форматированное сообщение лога
		let logMessage = `${paddedLevel} ${paddedCurrentTime} ${paddedModuleType}: ${paddedModuleName} ${color}${message}${EColor.WHITE}`;

		// Если есть дополнительные данные, добавляем их
		if (details) {
			logMessage += `\nDetails: ${EColor.GRAY}${JSON.stringify(
				details,
				null,
				0
			)}${EColor.WHITE}`;
		}

		// Если есть requestId, добавляем его
		if (ValueCheckerUtils.isNotUndefined(requestId)) {
			logMessage += `\nRequestId: ${EColor.GRAY}${requestId}${EColor.WHITE}`;
		}

		if (EnvironmentUtils.isDebug()) {
			// Add id to end of log
			logMessage += `\nLogId: ${EColor.GRAY}${id}${EColor.WHITE}`;
		}

		console.log(logMessage);
	}

	private static compressLog(log: ILog): ILogCompressed {
		return {
			i: log.id,
			c: log.createdAt,
			m: log.message,
			l: log.level,
			mn: log.moduleName,
			mt: log.moduleType,
			r: log.requestId || '',
			d: log.details
		};
	}

	// Лог уровня info
	public static info(logData: ILogData) {
		Logger.log(ELogLevel.INFO, logData);
	}

	// Лог уровня error
	public static error(logData: ILogData) {
		Logger.log(ELogLevel.ERROR, logData);
	}

	// Лог уровня debug
	public static debug(logData: ILogData) {
		Logger.log(ELogLevel.DEBUG, logData);
	}

	// Лог уровня warn
	public static warn(logData: ILogData) {
		Logger.log(ELogLevel.WARN, logData);
	}
}
