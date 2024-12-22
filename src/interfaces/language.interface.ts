// src/interface/language.interface.ts

/**
 * Language system definitions
 * @module Interfaces/Language
 * @description
 * Defines supported languages in the application.
 * Used for:
 * - Internationalization (i18n)
 * - Content localization
 * - User preferences
 * - API responses
 */

/**
 * Enumeration of supported application languages
 * @enum {string}
 */
export enum ESupportedLanguage {
	/** English language */
	EN = 'en',
	/** Ukrainian language */
	UK = 'uk',
	/** Russian language */
	RU = 'ru'
}

/**
 * Type for language codes
 * @example
 * type LanguageCode = 'en' | 'uk' | 'ru'
 */
export type TLanguageCode = `${ESupportedLanguage}`;
