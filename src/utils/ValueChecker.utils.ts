// src/utils/ValueChecker.utils.ts

/**
 * Utility class for checking values.
 * @module Utils/ValueCheckerUtils
 *
 * Этот модуль предоставляет утилиты для проверки значений на `null` и `undefined`,
 * а также для определения, являются ли значения "пустыми".
 */

export class ValueCheckerUtils {
	/**
	 * Проверяет, что значение не является `undefined`
	 * @param value Проверяемое значение любого типа
	 * @returns `true` если значение не `undefined`, `false` если `undefined`
	 * @example
	 * ValueCheckerUtils.isNotUndefined(null)      // returns true
	 * ValueCheckerUtils.isNotUndefined(0)         // returns true
	 * ValueCheckerUtils.isNotUndefined(undefined) // returns false
	 */
	static isNotUndefined(value: any): boolean {
		return value !== undefined;
	}

	/**
	 * Проверяет что переданное значение является "пустым"
	 * @param value Проверяемое значение любого типа
	 * @returns `true` если значение `undefined`, `null`, `{}`, `[]` и `false` если не пустое
	 * @example
	 * ValueCheckerUtils.isEmpty(null)      // returns true
	 * ValueCheckerUtils.isEmpty(undefined) // returns true
	 * ValueCheckerUtils.isEmpty(0)         // returns false
	 * ValueCheckerUtils.isEmpty({})         // returns true
	 * ValueCheckerUtils.isEmpty('')         // returns false
	 * ValueCheckerUtils.isEmpty([])         // returns true
	 */
	static isEmpty(value: any): boolean {
		if (this.isUndefinedOrNull(value)) {
			return true;
		}

		if (value instanceof Array) {
			return this.isEmptyArray(value);
		}

		if (value instanceof Object) {
			return this.isEmptyObject(value);
		}

		return false;
	}

	/**
	 * Проверяет, что объект пустой.
	 * @param value - Проверяемый объект.
	 * @returns `true`, если объект пустой, иначе `false`.
	 */
	static isEmptyObject(value: object): boolean {
		return Object.keys(value).length === 0;
	}

	/**
	 * Проверяет, что массив пустой.
	 * @param value - Проверяемый массив.
	 * @returns `true`, если массив пустой, иначе `false`.
	 */
	static isEmptyArray(value: Array<any>): boolean {
		return value.length === 0;
	}

	/**
	 * Проверяет, что значение является `undefined`
	 * @param value Проверяемое значение любого типа
	 * @returns `true` если значение `undefined`, `false` если не `undefined`
	 * @example
	 * ValueCheckerUtils.isUndefined(undefined) // returns true
	 * ValueCheckerUtils.isUndefined(null)      // returns false
	 * ValueCheckerUtils.isUndefined(0)         // returns false
	 */
	static isUndefined(value: any): boolean {
		return value === undefined;
	}

	/**
	 * Проверяет, что значение является `undefined` или `null`
	 * @param value Проверяемое значение любого типа
	 * @returns `true` если значение `undefined` или `null`, `false` если не `undefined` или `null`
	 * @example
	 * ValueCheckerUtils.isUndefinedOrNull(undefined) // returns true
	 * ValueCheckerUtils.isUndefinedOrNull(null)      // returns true
	 * ValueCheckerUtils.isUndefinedOrNull(0)         // returns false
	 */
	static isUndefinedOrNull(value: any): boolean {
		return this.isUndefined(value) || this.isNull(value);
	}

	/**
	 * Проверяет, что значение не является `null`
	 * @param value Проверяемое значение любого типа
	 * @returns `true` если значение не `null`, `false` если `null`
	 * @example
	 * ValueCheckerUtils.isNotNull(undefined) // returns true
	 * ValueCheckerUtils.isNotNull(0)         // returns true
	 * ValueCheckerUtils.isNotNull(null)      // returns false
	 */
	static isNotNull(value: any): boolean {
		return value !== null;
	}

	/**
	 * Проверяет, что значение является `null`
	 * @param value Проверяемое значение любого типа
	 * @returns `true` если значение `null`, `false` если не `null`
	 * @example
	 * ValueCheckerUtils.isNull(null)      // returns true
	 * ValueCheckerUtils.isNull(undefined) // returns false
	 * ValueCheckerUtils.isNull(0)         // returns false
	 */
	static isNull(value: any): boolean {
		return value === null;
	}
}
