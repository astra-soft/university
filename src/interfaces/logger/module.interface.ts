// src/interfaces/logger/module.interface.ts

/**
 * Module system type definitions and mappings
 * @module Interfaces/Logger/Module
 * @description
 * Defines the module type system including:
 * - Base module types (common and application modules)
 * - Module name enumerations for each type
 * - Mapping between module types and their names
 * - Type utilities for module name resolution
 */

/**
 * Base module types in the system
 * - Negative values (-1 to -4) are reserved for common modules
 * - Positive values (1+) are used for application modules
 */
export enum ETypeModule {
	/** Main application module */
	App = -1,
	/** Database module */
	Database = -2,
	/** Authentication module */
	Auth = -3,
	/** Validation module */
	Validator = -4,

	/** Router modules */
	Router = 1,
	/** Controller modules */
	Controller = 2,
	/** API modules */
	Api = 3,
	/** Data mapping modules */
	Mapper = 4,
	/** Service modules */
	Service = 5,
	/** Repository modules */
	Repository = 6
}

/** Application module names */
export enum EAppNameModule {
	University = 1
}

/** Database module names */
export enum EDatabaseNameModule {
	Mongo = 1
}

/** Authentication module names */
export enum EAuthNameModule {
	Auth = 1
}

/** Validation module names */
export enum EValidatorNameModule {
	Validator = 1
}

/** Router module names */
export enum ERouterNameModule {
	AuthRouter = 1,
	UserRouter = 2
}

/** Controller module names */
export enum EControllerNameModule {
	AuthController = 1,
	UserController = 2
}

/** API module names */
export enum EApiNameModule {}

/** Mapper module names */
export enum EMapperNameModule {}

/** Service module names */
export enum EServiceNameModule {
	UserService = 1
}

/** Repository module names */
export enum ERepositoryNameModule {
	UserRepository = 1
}

/**
 * Mapping between module types and their names with corresponding values
 * @example
 * ModuleNames[ETypeModule.Router] = {
 *   AuthRouter: ERouterNameModule.AuthRouter,
 *   UserRouter: ERouterNameModule.UserRouter
 * }
 */
export const ModuleNames: Record<ETypeModule, Record<string, number>> = {
	[ETypeModule.App]: {
		University: EAppNameModule.University
	},
	[ETypeModule.Database]: {
		Mongo: EDatabaseNameModule.Mongo
	},
	[ETypeModule.Auth]: {
		Auth: EAuthNameModule.Auth
	},
	[ETypeModule.Validator]: {
		Validator: EValidatorNameModule.Validator
	},
	[ETypeModule.Router]: {
		AuthRouter: ERouterNameModule.AuthRouter,
		UserRouter: ERouterNameModule.UserRouter
	},
	[ETypeModule.Controller]: {
		AuthController: EControllerNameModule.AuthController,
		UserController: EControllerNameModule.UserController
	},
	[ETypeModule.Api]: {},
	[ETypeModule.Mapper]: {},
	[ETypeModule.Service]: {
		UserService: EServiceNameModule.UserService
	},
	[ETypeModule.Repository]: {
		UserRepository: ERepositoryNameModule.UserRepository
	}
};

/**
 * Type for getting module names of a specific module type
 * @template T - Module type from ETypeModule
 * @example
 * type RouterNames = TModuleNames<ETypeModule.Router> // "AuthRouter" | "UserRouter"
 */
export type TModuleNames<T extends ETypeModule> = keyof (typeof ModuleNames)[T];

/**
 * Type for getting module value by type and name
 * @template T - Module type from ETypeModule
 * @example
 * type RouterValue = TModuleValue<ETypeModule.Router> // 1 | 2
 */
export type TModuleValue<T extends ETypeModule> =
	(typeof ModuleNames)[T][TModuleNames<T>];

/**
 * Type containing all possible module names across all module types
 * @example
 * type AllNames = TAllModuleNames // "University" | "Mongo" | "AuthRouter" | ...
 */
export type TAllModuleNames = {
	[K in ETypeModule]: TModuleNames<K>;
}[ETypeModule];
