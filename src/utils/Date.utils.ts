// src/utils/Date.utils.ts

/**
 * Utility functions for work with dates
 * @module Utils/Date
 *
 * Этот модуль предоставляет утилиты для работы с датами, включая форматирование времени в 24-часовом формате.
 */

/** Utility functions for work with dates */
export class DateUtils {
	/**
	 * Возвращает время в 24-часовом формате.
	 * @param date - Дата, для которой нужно получить время.
	 * @returns Время в формате "HH:mm:ss.SSS".
	 */
	static get24HourTime(date: Date): string {
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');
		const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

		return `${hours}:${minutes}:${seconds}.${milliseconds}`;
	}
}
