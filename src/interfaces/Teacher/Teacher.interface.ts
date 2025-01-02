// src/interface/Teacher/Teacher.interface.ts

/**
 * Teacher interfaces and types
 * @module Interfaces/Teacher/Teacher
 * @description
 * Exports interfaces and types related to teachers within the system.
 */

// ! own
// classes
import { Teacher } from '@classes';
// interfaces
import {
	EUserRole,
	IBaseUserMethods,
	IBaseUserSchema,
	IHashedBaseUser
} from '@interfaces';

/**
 * Teacher schema
 */
export interface ITeacherSchema extends IBaseUserSchema {
	// todo add properties
}

/**
 * Teacher methods
 */
export interface ITeacherMethods extends IBaseUserMethods {
	// todo add methods
}

/**
 * Base hashed teacher
 */
export interface IHashedTeacher extends IHashedBaseUser {
	role: EUserRole.Teacher;
}

export interface ITeacher
	extends Teacher,
		ITeacherSchema,
		Document,
		ITeacherMethods {}
