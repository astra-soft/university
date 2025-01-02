// src/interface/BaseUser/Status.interface.ts

/**
 * @module Interfaces/BaseUser/Status
 *
 * This module defines the various status types for users within the system.
 * It includes enumerations for common user statuses and current statuses,
 * which help in tracking the state of users in the application.
 */

/**
 * @enum {string}
 * @description Enum representing common statuses for students.
 *
 * This enum defines the primary statuses that a student can have within the system,
 * indicating their current state in relation to their academic journey.
 */
export enum EStudentCommonStatus {
	/** @description Represents an active student. */
	Active = 'active',

	/** @description Represents a graduated student. */
	Graduated = 'graduated',

	/** @description Represents a student on academic leave. */
	AcademicLeave = 'academic_leave',

	/** @description Represents a student who has been expelled. */
	Expelled = 'expelled'
}

/**
 * @enum {string}
 * @description Enum representing current statuses for students.
 *
 * This enum defines the current statuses that a student can have,
 * indicating their activity level and engagement in the educational process.
 */
export enum EStudentCurrentStatus {
	/** @description Represents a student currently in class. */
	InClass = 'in_class',

	/** @description Represents a student currently listening to a lecture. */
	ListeningToLecture = 'listening_to_lecture',

	/** @description Represents a student currently in the university. */
	InUniversity = 'in_university',

	/** @description Represents a student who is currently off duty. */
	OffDuty = 'off_duty'
}

/**
 * @enum {string}
 * @description Enum representing common statuses for teachers.
 *
 * This enum defines the primary statuses that a teacher can have within the system,
 * indicating their current state in relation to their professional role.
 */
export enum ETeacherCommonStatus {
	/** @description Represents an active teacher. */
	Active = 'active',

	/** @description Represents a teacher on vacation. */
	Vacation = 'vacation',

	/** @description Represents a teacher who has been fired. */
	Fired = 'fired'
}

/**
 * @enum {string}
 * @description Enum representing current statuses for teachers.
 *
 * This enum defines the current statuses that a teacher can have,
 * indicating their activity level and engagement in the educational process.
 */
export enum ETeacherCurrentStatus {
	/** @description Represents a teacher currently lecturing. */
	Lecturing = 'lecturing',

	/** @description Represents a teacher currently in class with students. */
	InClass = 'in_class',

	/** @description Represents a teacher currently preparing for classes. */
	Preparing = 'preparing',

	/** @description Represents a teacher currently available for communication or consultations. */
	Available = 'available'
}

/**
 * @enum {string}
 * @description Enum representing common statuses for administrators.
 *
 * This enum defines the primary statuses that an administrator can have within the system,
 * indicating their current state in relation to their administrative role.
 */
export enum EAdminCommonStatus {
	/** @description Represents an active administrator. */
	Active = 'active',

	/** @description Represents an administrator who is temporarily suspended. */
	Suspended = 'suspended',

	/** @description Represents a blocked administrator. */
	Blocked = 'blocked'
}

/**
 * @enum {string}
 * @description Enum representing current statuses for administrators.
 *
 * This enum defines the current statuses that an administrator can have,
 * indicating their activity level and engagement in system management.
 */
export enum EAdminCurrentStatus {
	/** @description Represents an administrator managing accounts. */
	ManagingAccounts = 'managing_accounts',

	/** @description Represents an administrator performing system maintenance. */
	SystemMaintenance = 'system_maintenance',

	/** @description Represents an administrator handling user requests. */
	HandlingRequests = 'handling_requests',

	/** @description Represents an administrator monitoring system activity. */
	Monitoring = 'monitoring'
}

/**
 * @enum {string}
 * @description Enum representing common statuses for moderators.
 *
 * This enum defines the primary statuses that a moderator can have within the system,
 * indicating their current state in relation to their moderation role.
 */
export enum EModeratorCommonStatus {
	/** @description Represents an active moderator. */
	Active = 'active',

	/** @description Represents a moderator currently in training. */
	Training = 'training',

	/** @description Represents a moderator currently on probation. */
	Probation = 'probation',

	/** @description Represents a moderator who is temporarily suspended. */
	Suspended = 'suspended'
}

/**
 * @enum {string}
 * @description Enum representing current statuses for moderators.
 *
 * This enum defines the current statuses that a moderator can have,
 * indicating their activity level and engagement in content moderation.
 */
export enum EModeratorCurrentStatus {
	/** @description Represents a moderator currently reviewing content. */
	ReviewingContent = 'reviewing_content',

	/** @description Represents a moderator currently moderating chat. */
	ModeratingChat = 'moderating_chat',

	/** @description Represents a moderator currently resolving reports. */
	ResolvingReports = 'resolving_reports',

	/** @description Represents a moderator currently available for inquiries. */
	Available = 'available'
}

// ? --- --- ---   --- --- ---   --- --- ---

/**
 * @enum {string}
 * @description Enum representing system statuses for users.
 *
 * This enum defines the various system statuses that a user can have,
 * indicating their current state in relation to system access and activity.
 */
export enum ESystemStatus {
	/** @description Represents a user who is currently online. */
	Online = 'online',

	/** @description Represents a user who has logged out. */
	LoggedOut = 'logged_out',

	/** @description Represents a user who is online but inactive. */
	Away = 'away',

	/** @description Represents an account that is temporarily suspended. */
	Suspended = 'suspended',

	/** @description Represents a user in an active learning session. */
	InSession = 'in_session',

	/** @description Represents an account that is under maintenance. */
	Maintenance = 'maintenance',

	/** @description Represents a user who is currently offline. */
	Offline = 'offline',

	/** @description Represents a user who has enabled Do Not Disturb. */
	DoNotDisturb = 'do_not_disturb'
}

/**
 * @enum {string}
 * @description Enum representing account statuses.
 *
 * This enum defines the various statuses that an account can have,
 * indicating its current state in relation to usability and access.
 */
export enum EAccountStatus {
	/** @description Represents an active and usable account. */
	Active = 'active',

	/** @description Represents a temporarily deactivated account. */
	Inactive = 'inactive',

	/** @description Represents an archived account. */
	Archived = 'archived',

	/** @description Represents a terminated account. */
	Terminated = 'terminated'
}
