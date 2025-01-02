// src/utils/String.utils.ts

/**
 * Utility functions for work with strings
 * @module Utils/String
 *
 * Этот модуль предоставляет утилиты для работы со строками, включая методы для получения первых и последних символов,
 * а также для дополнения строк до заданной длины.
 */

export class StringUtils {
	/**
	 * Дополняет строку до заданной длины.
	 * @param str - Исходная строка.
	 * @param width - Желаемая длина строки.
	 * @returns Дополненная строка.
	 */
	static padString(str: string, width: number): string {
		return str.padEnd(width);
	}

	/**
	 * Возвращает последний символ строки.
	 * @param string - Исходная строка.
	 * @returns Последний символ строки.
	 */
	static getLastChar(string: string): string {
		return string.charAt(string.length - 1);
	}

	/**
	 * Возвращает первый символ строки.
	 * @param string - Исходная строка.
	 * @returns Первый символ строки.
	 */
	static getFirstChar(string: string): string {
		return string.charAt(0);
	}
}
