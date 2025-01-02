// src/interface/color.interface.ts

/**
 * Console color definitions
 * @module Interfaces/Common/Colors
 * @description
 * Defines ANSI color codes for console output formatting.
 * Used primarily in logging system for:
 * - Log level highlighting
 * - Module name coloring
 * - Important data emphasis
 * - Error messages
 */

/**
 * ANSI color codes for console text formatting
 * @enum {string}
 * @description
 * Each value is an ANSI escape sequence that changes text color
 * Reset to default color using WHITE (reset code)
 */
export enum EColor {
	/** Reset to default color */
	WHITE = '\x1b[0m',
	/** Error messages, warnings */
	RED = '\x1b[31m',
	/** Success messages, info */
	GREEN = '\x1b[32m',
	/** Warnings, important notices */
	YELLOW = '\x1b[33m',
	/** Links, special data */
	BLUE = '\x1b[34m',
	/** System messages, module names */
	CYAN = '\x1b[36m',
	/** Debug information */
	PURPLE = '\x1b[35m',
	/** Additional details, timestamps */
	GRAY = '\x1b[90m'
}
