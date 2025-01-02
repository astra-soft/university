// src/classes/Student.class.ts

/**
 * @module Classes/Student
 *
 * This module defines the student class.
 */

// ! own
// classes
import { BaseUser } from '@classes';
// interfaces
import { EUserRole, IStudentMethods } from '@interfaces';

export class Student extends BaseUser implements IStudentMethods {
	// todo implement methods

	getRole(): EUserRole {
		return EUserRole.Student;
	}
}
