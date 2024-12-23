// src/interface/index.ts

/**
 * Application interfaces and types
 * @module Interfaces
 * @description
 * Central export point for all interfaces and types used in the application.
 * Organized into categories:
 *
 * Folders:
 * - http: HTTP-related interfaces
 * - logger: Logging system interfaces
 *
 * Files:
 * - colors: Console color definitions
 * - environment: Environment configuration
 * - language: Internationalization support
 */

// folders
export * from './http';
export * from './logger';
export * from './Http';
export * from './Logger';
export * from './BaseUser';
// files
export * from './colors.interface';
export * from './environment.interface';
export * from './language.interface';
export * from './router.interface';
