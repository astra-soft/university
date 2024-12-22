// src/errors/index.ts

/**
 * Custom HTTP error definitions
 * @module Errors
 * @description
 * Exports custom error classes for HTTP-related errors:
 * - Base HTTP error
 * - Cast errors (type conversion)
 * - Duplicate key errors
 * - Authentication errors
 * - Validation errors
 */

// Base error
export * from './Http.error';
// Specific errors
export * from './HttpCast.error';
export * from './HttpDuplicate.error';
export * from './HttpUnauthorized.error';
export * from './HttpValidationError.error';
