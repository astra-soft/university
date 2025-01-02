// src/classes/Teacher.class.ts

/**
 * @module Classes/Teacher
 *
 * This module defines the teacher class.
 */

// ! own
// classes
import { BaseUser } from '@classes';
// interfaces
import { EUserRole, ITeacherMethods } from '@interfaces';

export class Teacher extends BaseUser implements ITeacherMethods {
	// todo implement methods

	getRole(): EUserRole {
		return EUserRole.Teacher;
	}
}
