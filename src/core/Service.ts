// src/core/Service.ts

/**
 * Architecture component
 * Business logic layer implementation
 * @module Core/Service
 * @description
 * Base service class providing:
 * - Business logic encapsulation
 * - Data transformation
 * - Cross-cutting concerns
 * - Operation orchestration
 */

// ! own
// core
import { Module } from '@core';
// interface
import { EServiceNameModule, ETypeModule } from '@interfaces';

/**
 * Base service class for business logic operations
 * @extends Module
 * @description
 * Abstract base class for implementing business logic.
 * Services coordinate between controllers and repositories,
 * handling data transformation and business rules.
 */
export class Service extends Module {
	/**
	 * Creates a new service instance
	 * @param name - Service name from enum
	 */
	constructor(name: EServiceNameModule) {
		super(ETypeModule.Service, name);
	}
}
