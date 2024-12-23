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
