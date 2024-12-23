// src/core/index.ts

/**
 * Core application components
 * @module Core
 * @description
 * Exports fundamental application components including:
 *
 * Base Components:
 * - RequestContext: HTTP request context management  // TODO: Future implementation
 * - Module: Base class for all modules
 * - Logger: Centralized logging system
 *
 * Application Modules:
 * - Auth: Authentication and authorization // TODO: Future implementation
 * - App: Main application instance         // TODO: Future implementation
 *
 * Architecture Components:
 * - Router: Request routing and handling
 * - Service: Business logic layer
 * - Controller: Request processing       // TODO: Future implementation
 * - Mapper: Data mapping layer           // TODO: Future implementation
 * - Repository: Data access layer
 */

// Base components
export * from './RequestContext';
export * from './Logger';
export * from './Module';

// Architecture components
export * from './Router';
export * from './Service';
export * from './Repository';
