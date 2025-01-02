// src/errors/index.ts

/**
 * Custom HTTP error definitions
 * @module Errors
 * @description
 * Exports custom error classes for HTTP-related errors:
 * - Base app error
 * - Cast errors (type conversion)
 * - Duplicate key errors
 * - Not found errors
 * - Authentication errors
 * - Validation errors
 */

/**
 * Base app error
 */
export * from './App.error';

/**
 * Custom errors
 */
export * from './Cast.error';
export * from './Duplicate.error';
export * from './Forbidden.error';
export * from './NotFound.error';
export * from './Unauthorized.error';
export * from './Validation.error';
/**
 * Error mapping
 * use all errors
 */
export * from './ErrorMapping';
