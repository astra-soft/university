// src/interface/BaseUser/Role.interface.ts

/**
 * @module Interfaces/BaseUser/Role
 *
 * This module defines the user roles within the system.
 * It includes an enumeration of the various roles that users can have,
 * along with their associated permissions and responsibilities.
 */

/**
 * @enum {string}
 * @description Enum representing user roles in the system.
 *
 * This enum defines the primary roles that users can have within the system,
 * along with their access levels. Each role corresponds to a specific set of
 * permissions and responsibilities.
 *
 * Roles include:
 * - Student: Basic user with access to educational materials.
 * - Teacher: User with the ability to create and manage educational content.
 * - Admin: User with full access to system management.
 * - Moderator: User with rights to moderate content and users.
 */
export enum EUserRole {
	/**
	 * @description Represents a student role.
	 *
	 * A student has access to educational materials, can participate in classes,
	 * complete assignments and tests, and interact with teachers.
	 */
	Student = 'student',

	/**
	 * @description Represents a teacher role.
	 *
	 * A teacher can create and manage educational materials, conduct classes,
	 * assess student work, and create tests and assignments.
	 */
	Teacher = 'teacher',

	/**
	 * @description Represents a moderator role.
	 *
	 * A moderator has the ability to moderate content, manage chats and forums,
	 * handle complaints, and temporarily block violators.
	 */
	Moderator = 'moderator',

	/**
	 * @description Represents an admin role.
	 *
	 * An admin has full access to system management, including user management,
	 * system settings, and monitoring system operations.
	 */
	Admin = 'admin'
}
