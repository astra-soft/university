/**
 * Advanced logging system implementation
 * @module Core/Logger
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
// interfaces
import {
	ELogLevel,
	EColor,
	ETypeModule,
	ILogData,
	ERouterId,
	ILog,
	ILogCompressed,
	ModuleNames
} from '@interfaces';
// utils
import { isDebug, isNotProduction, isNotUndefined } from '@utils';

/**
 * Static logger class providing centralized logging functionality
 */
export class Logger {
	/** Color mapping for different log levels */
	private static colors = {
		[ELogLevel.INFO]: EColor.GREEN, // Success and info messages
		[ELogLevel.ERROR]: EColor.RED, // Errors and failures
		[ELogLevel.DEBUG]: EColor.PURPLE, // Debug information
		[ELogLevel.WARN]: EColor.YELLOW // Warnings and cautions
	};

	/** Fixed widths for log formatting */
	private static readonly maxLevelWidth = 5; // Log level width
	private static readonly maxCurrentTimeWidth = 12; // Timestamp width
	private static readonly maxRouterIdWidth = 12; // Router ID width
	private static readonly maxModuleTypeWidth = 10; // Module type width
	private static readonly maxModuleNameWidth = 14; // Module name width

	/**
	 * Pads a string to specified width for alignment
	 * @param str - String to pad
	 * @param width - Desired width
	 */
	private static padString(str: string, width: number): string {
		return str.padEnd(width);
	}

	/**
	 * Formats current time in 24-hour format with milliseconds
	 * @param date - Date to format
	 */
	private static get24HourTime(date: Date): string {
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');
		const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

		return `${hours}:${minutes}:${seconds}.${milliseconds}`;
	}

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
		if (isNotProduction()) {
			Logger.writeLog(log);
		}

		// save log to file
		Logger.saveLog(log);
	}

	private static saveLog(log: ILog) {
		const logCompressed = Logger.compressLog(log);
		// TODO: make saving log to file
	}

	private static writeLog({
		id,
		createdAt,
		level,
		message,
		moduleType,
		moduleName,
		requestId,
		routerId,
		details
	}: ILog) {
		const color = Logger.colors[level];

		// ? Форматируем лог с фиксированной шириной для уровня, времени и блока

		// Formatted log level
		const paddedLevel = `${EColor.WHITE}[${color}${Logger.padString(
			ELogLevel[level],
			Logger.maxLevelWidth
		)}${EColor.WHITE}]`;

		// Formatted current time
		const paddedCurrentTime = `${EColor.GRAY}${Logger.padString(
			Logger.get24HourTime(createdAt),
			Logger.maxCurrentTimeWidth
		)}${EColor.WHITE}`;

		// Форматируем routerId лога
		const paddedRouter = isNotUndefined(routerId)
			? ` Method: ${EColor.CYAN}${Logger.padString(
					ERouterId[routerId!],
					Logger.maxRouterIdWidth
			  )}${EColor.WHITE} -`
			: '';

		// Formatted type module
		const paddedModuleType = `${EColor.CYAN}${Logger.padString(
			ETypeModule[moduleType],
			Logger.maxModuleTypeWidth
		)}${EColor.WHITE}`;

		// Formatted module name
		const paddedModuleName = `${EColor.CYAN}${Logger.padString(
			Object.keys(ModuleNames[moduleType]).find(
				key => ModuleNames[moduleType][key] === moduleName
			) || 'Unknown',
			Logger.maxModuleNameWidth
		)}${EColor.WHITE}`;

		// Форматированное сообщение лога
		let logMessage = `${paddedLevel} ${paddedCurrentTime} ${paddedModuleType}: ${paddedModuleName}${paddedRouter} ${color}${message}${EColor.WHITE}`;

		// Если есть дополнительные данные, добавляем их
		if (details) {
			logMessage += `\nDetails: ${EColor.GRAY}${JSON.stringify(
				details,
				null,
				0
			)}${EColor.WHITE}`;
		}

		// Если есть requestId, добавляем его
		if (isNotUndefined(requestId)) {
			logMessage += `\nRequestId: ${EColor.GRAY}${requestId}${EColor.WHITE}`;
		}

		if (isDebug()) {
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
			ri: log.routerId,
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
