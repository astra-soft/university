// src/interface/student/Student.interface.ts

/**
 * Student interfaces and types
 * @module Interfaces/Student/Student
 * @description
 * Exports interfaces and types related to students within the system.
 */

// ! own
// classes
import { Student } from '@classes';
// interfaces
import {
	EUserRole,
	IBaseUserMethods,
	IBaseUserSchema,
	IHashedBaseUser
} from '@interfaces';

/**
 * Student schema
 */
export interface IStudentSchema extends IBaseUserSchema {
	// todo add properties
}

/**
 * Methods for student
 */
export interface IStudentMethods extends IBaseUserMethods {
	// todo add methods
}

/**
 * Base hashed student
 */
export interface IHashedStudent extends IHashedBaseUser {
	role: EUserRole.Student;
}

export interface IStudent
	extends Student,
		IStudentSchema,
		Document,
		IStudentMethods {}
