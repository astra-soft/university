// src/interfaces/logger/block.interface.ts

/**
 * Module system type definitions and mappings
 * @module Interfaces/Logger/Module
 * @description
 * Defines the block type system including:
 * - Base block types (common and application modules)
 * - Block name enumerations for each type
 * - Mapping between block types and their names
 * - Type utilities for block name resolution
 */

/**
 * Base module types in the system
 * - Negative values (-1 to -4) are reserved for common modules
 * - Positive values (1+) are used for application modules
 */
export enum ETypeBlock {
	/** Main application components */
	App = -1,
	/** Database module */
	Database = -2,
	/** Guard module */
	Guard = -3,
	/** Validation module */
	Validator = -4,
	/** Logger module */
	Logger = -5,
	/** Error handler module */
	ErrorHandler = -6,

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
export enum EAppNameComponent {
	University = 1
}

/** Database module names */
export enum EDatabaseNameComponent {
	Mongo = 1
}

/** Guard module names */
export enum EGuardNameComponent {
	AccessGuard = 1
}

/** Validation module names */
export enum EValidatorNameComponent {
	Validator = 1
}

/** Logger module names */
export enum ELoggerNameComponent {
	Logger = 1
}

/** Router module names */
export enum ERouterNameModule {
	TestRouter = 1,
	AuthRouter = 2,
	StudentRouter = 3,
	TeacherRouter = 4
	// RoleRouter = 5
}

/** Router module urls */
export enum ERouterUrlModule {
	Test = '/test',
	Auth = '/auth',
	Students = '/users/students',
	Teachers = '/users/teachers'
}

/** Controller module names */
export enum EControllerNameModule {
	TestController = 1,
	AuthController = 2,
	StudentController = 3,
	TeacherController = 4
}

/** ErrorHandler module names */
export enum EErrorHandlerNameModule {
	MainErrorHandler = 1
}

/** API module names */
export enum EApiNameModule {}

/** Mapper module names */
export enum EMapperNameModule {}

/** Service module names */
export enum EServiceNameModule {
	StudentService = 1,
	TeacherService = 2
}

/** Repository module names */
export enum ERepositoryNameModule {
	UserRepository = 1,
	InvoiceRepository = 2
}

/**
 * Mapping between module types and their names with corresponding values
 * @example
 * ModuleNames[ETypeModule.Router] = {
 *   AuthRouter: ERouterNameModule.AuthRouter,
 *   UserRouter: ERouterNameModule.UserRouter
 * }
 */
export const BlockNames: Record<ETypeBlock, Record<string, number>> = {
	[ETypeBlock.App]: {
		University: EAppNameComponent.University
	},
	[ETypeBlock.Database]: {
		Mongo: EDatabaseNameComponent.Mongo
	},
	[ETypeBlock.Guard]: {
		AccessGuard: EGuardNameComponent.AccessGuard
	},
	[ETypeBlock.Validator]: {
		Validator: EValidatorNameComponent.Validator
	},
	[ETypeBlock.Logger]: {
		Logger: ELoggerNameComponent.Logger
	},
	[ETypeBlock.Router]: {
		AuthRouter: ERouterNameModule.AuthRouter,
		TestRouter: ERouterNameModule.TestRouter,
		StudentRouter: ERouterNameModule.StudentRouter,
		TeacherRouter: ERouterNameModule.TeacherRouter
	},
	[ETypeBlock.Controller]: {
		TestController: EControllerNameModule.TestController,
		AuthController: EControllerNameModule.AuthController,
		StudentController: EControllerNameModule.StudentController,
		TeacherController: EControllerNameModule.TeacherController
	},
	[ETypeBlock.ErrorHandler]: {
		MainErrorHandler: EErrorHandlerNameModule.MainErrorHandler
	},
	[ETypeBlock.Api]: {},
	[ETypeBlock.Mapper]: {},
	[ETypeBlock.Service]: {
		StudentService: EServiceNameModule.StudentService,
		TeacherService: EServiceNameModule.TeacherService
	},
	[ETypeBlock.Repository]: {
		UserRepository: ERepositoryNameModule.UserRepository,
		InvoiceRepository: ERepositoryNameModule.InvoiceRepository
	}
};

/**
 * Type for getting block names of a specific module type
 * @template T - Block type from ETypeBlock
 * @example
 * type RouterNames = TBlockNames<ETypeBlock.Router> // "AuthRouter" | "UserRouter"
 */
export type TBlockNames<T extends ETypeBlock> = keyof (typeof BlockNames)[T];

/**
 * Type for getting block value by type and name
 * @template T - Block type from ETypeBlock
 * @example
 * type RouterValue = TBlockValue<ETypeBlock.Router> // 1 | 2
 */
export type TBlockValue<T extends ETypeBlock> =
	(typeof BlockNames)[T][TBlockNames<T>];
