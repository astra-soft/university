// src/core/Repository.ts

/**
 * Architecture component
 * Data access layer implementation
 * @module Core/Repository
 * @description
 * Base repository class providing:
 * - Database operations abstraction
 * - Data access patterns
 * - Entity management
 * - CRUD operations
 */

// ! own
// core
import { Module } from '@core';
// interface
import { ERepositoryNameModule, ETypeModule } from '@interfaces';

/**
 * Base repository class for data access operations
 * @extends Module
 * @description
 * Abstract base class for implementing data access patterns.
 * Each entity should have its own repository implementation.
 */
export class Repository extends Module {
	/**
	 * Creates a new repository instance
	 * @param name - Repository name from enum
	 */
	constructor(name: ERepositoryNameModule) {
		super(ETypeModule.Repository, name);
	}
}
