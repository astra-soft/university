// src/interfaces/BaseUser/BaseUser.interface.ts

/**
 * @module Interfaces/BaseUser
 *
 * This module defines the base user interface for all user types within the system.
 * It includes the structure for user-related data, including personal information,
 * contact details, credentials, security settings, and system metadata.
 */

// ! lib
import { Document } from 'mongoose';

// ! own
// interfaces
import {
	ESupportedLanguage,
	ESystemStatus,
	EAccountStatus,
	ILoginAttempt,
	TId,
	EUserRole
} from '@interfaces';

/**
 * @enum {string}
 * @description Enum representing the gender of the user.
 *
 * This enum defines the possible gender values that a user can have.
 */
export enum EGender {
	/** @description Represents male gender. */
	Male = 'male',

	/** @description Represents female gender. */
	Female = 'female',

	/** @description Represents other gender identities. */
	Other = 'other'
}

/**
 * @interface IBaseUserSchema
 * @description Interface representing the base structure of a user in the system.
 *
 * This interface defines the properties that every user must have, including
 * personal identification data, contact information, credentials, security settings,
 * user preferences, and system metadata.
 */
export interface IBaseUserSchema {
	/** @property {Object} private - Private identification data of the user. */
	private: {
		/** @property {string} firstName - Legal first name of the user. */
		firstName: string;

		/** @property {string} lastName - Legal last name of the user. */
		lastName: string;

		/** @property {string} [middleName] - Middle name or patronymic of the user. */
		middleName?: string;

		/** @property {Date} dateOfBirth - Date of birth of the user. */
		dateOfBirth: Date;

		/** @property {EGender} [gender] - Gender of the user. */
		gender?: EGender;

		/** @property {string} [nationalId] - National ID or passport number of the user. */
		nationalId?: string;

		/** @property {string} citizenship - Citizenship or nationality of the user. */
		citizenship: string;

		/** @property {ESupportedLanguage} nativeLanguage - Native language of the user. */
		nativeLanguage: ESupportedLanguage;

		/** @property {string} [passportScanUrl] - URL of the passport scan. */
		passportScanUrl?: string;

		/** @property {Array<Object>} [documents] - Additional documents of the user. */
		documents?: {
			/** @property {string} type - Type of the document. */
			type: string;

			/** @property {string} number - Document number. */
			number: string;

			/** @property {Date} issueDate - Issue date of the document. */
			issueDate: Date;

			/** @property {Date} [expiryDate] - Expiry date of the document. */
			expiryDate?: Date;

			/** @property {string} [scanUrl] - URL of the document scan. */
			scanUrl?: string;
		}[];

		/** @property {Object} [medical] - Medical information of the user. */
		medical?: {
			/** @property {string} [bloodType] - Blood type of the user. */
			bloodType?: string;

			/** @property {Array<string>} [allergies] - List of allergies of the user. */
			allergies?: string[];

			/** @property {Object} emergencyContact - Emergency contact information. */
			emergencyContact: {
				/** @property {string} name - Name of the emergency contact. */
				name: string;

				/** @property {string} relation - Relation to the user. */
				relation: string;

				/** @property {string} phone - Phone number of the emergency contact. */
				phone: string;
			};
		};
	};

	/** @property {Object} contact - Personal contact information of the user. */
	contact: {
		/** @property {string} [personalEmail] - Personal email of the user. */
		personalEmail?: string;

		/** @property {string} phone - Primary phone number of the user. */
		phone: string;

		/** @property {string} [emergencyPhone] - Emergency contact phone number. */
		emergencyPhone?: string;

		/** @property {Object} address - Current residential address of the user. */
		address: {
			/** @property {string} country - Country of residence. */
			country: string;

			/** @property {string} city - City of residence. */
			city: string;

			/** @property {string} street - Street address. */
			street: string;

			/** @property {string} building - Building number. */
			building: string;

			/** @property {string} [apartment] - Apartment number. */
			apartment?: string;

			/** @property {string} postalCode - Postal code. */
			postalCode: string;
		};

		/** @property {Array<Object>} [socialMedia] - Social media profiles of the user. */
		socialMedia?: {
			/** @property {string} type - Type of social media. */
			type: string;

			/** @property {string} username - Username on the social media platform. */
			username: string;

			/** @property {string} url - URL to the social media profile. */
			url: string;
		}[];
	};

	/** @property {Object} credentials - University credentials of the user. */
	credentials: {
		/** @property {string} login - University login (usually student/employee ID). */
		login: string;

		/** @property {string} email - University email of the user. */
		email: string;

		/** @property {string} password - Hashed password of the user. */
		password: string;
	};

	/** @property {Object} security - Security settings of the user. */
	security: {
		/** @property {boolean} twoFactorEnabled - Indicates if two-factor authentication is enabled. */
		twoFactorEnabled: boolean;

		/** @property {string} [twoFactorSecret] - Encrypted two-factor secret key. */
		twoFactorSecret?: string;

		/** @property {Date} [lockoutUntil] - Account lockout expiration date. */
		lockoutUntil?: Date;

		/** @property {number} errorLoginAttempts - Number of failed login attempts. */
		errorLoginAttempts: number;

		/** @property {Array<ILoginAttempt>} loginHistory - Last 64 login attempts. */
		loginHistory: ILoginAttempt[];

		/** @property {Array<Object>} [recoveryQuestions] - Security questions for account recovery. */
		recoveryQuestions?: {
			/** @property {string} question - Security question. */
			question: string;

			/** @property {string} answerHash - Hashed answer to the security question. */
			answerHash: string;
		}[];

		/** @property {Array<Object>} [trustedDevices] - List of trusted devices. */
		trustedDevices?: {
			/** @property {string} deviceId - Unique identifier for the device. */
			deviceId: string;

			/** @property {string} deviceName - Name of the device. */
			deviceName: string;

			/** @property {Date} lastUsed - Last used date of the device. */
			lastUsed: Date;

			/** @property {string} ipAddress - IP address of the device. */
			ipAddress: string;
		}[];

		/** @property {Array<Object>} [activeSessions] - Active sessions of the user. */
		activeSessions?: {
			/** @property {string} sessionId - Unique identifier for the session. */
			sessionId: string;

			/** @property {string} deviceInfo - Information about the device used. */
			deviceInfo: string;

			/** @property {string} ipAddress - IP address of the session. */
			ipAddress: string;

			/** @property {Date} startedAt - Session start time. */
			startedAt: Date;

			/** @property {Date} lastActivity - Last activity timestamp of the session. */
			lastActivity: Date;
		}[];
	};

	/** @property {Object} preferences - User preferences. */
	preferences: {
		/** @property {ESupportedLanguage} language - Interface language preference. */
		language: ESupportedLanguage;

		/** @property {string} [avatarUrl] - URL of the user's profile picture. */
		avatarUrl?: string;

		/** @property {Object} notifications - Notification settings. */
		notifications: {
			/** @property {boolean} email - Email notification preference. */
			email: boolean;

			/** @property {boolean} sms - SMS notification preference. */
			sms: boolean;

			/** @property {boolean} push - Push notification preference. */
			push: boolean;
		};
	};

	/** @property {Object} system - System metadata related to the user. */
	system: {
		/** @property {EAccountStatus} accountStatus - Current account status. */
		accountStatus: EAccountStatus;

		/** @property {ESystemStatus} systemStatus - Current system status. */
		systemStatus: ESystemStatus;

		/** @property {Date} createdAt - Account creation date. */
		createdAt: Date;

		/** @property {Date} [updatedAt] - Last profile update date. */
		updatedAt?: Date;

		/** @property {Date} [lastLoginAt] - Last successful login date. */
		lastLoginAt?: Date;

		/** @property {Date} [lastActivityAt] - Last activity timestamp. */
		lastActivityAt?: Date;

		/** @property {Date} [tosAcceptedAt] - Terms of service acceptance date. */
		tosAcceptedAt?: Date;

		/** @property {Date} [passwordChangedAt] - Last password change timestamp. */
		passwordChangedAt?: Date;
	};
}

/**
 * @interface IBaseUserMethods
 * @description Interface representing methods related to user actions.
 *
 * This interface defines the methods that can be performed by a user,
 * such as checking passwords and generating authentication tokens.
 */
export interface IBaseUserMethods {
	/**
	 * Checks if the provided password matches the user's hashed password.
	 *
	 * @param {string} password - The password to check.
	 * @returns {boolean} true if password is correct, false otherwise
	 */
	checkPassword(this: IBaseUser, password: string): boolean;

	// TODO: implement additional methods
	// Additional methods can be defined here, such as:
	// generateAuthToken, isLocked, incrementLoginAttempts, resetLoginAttempts, etc.

	/**
	 * Retrieves the role of the user.
	 *
	 * @returns {EUserRole} The role of the user.
	 */
	getRole(this: IBaseUser): EUserRole;
}

/**
 * @interface IBaseHashedUser
 * @description Interface representing a user with hashed credentials in the system.
 *
 * This interface extends the IBaseUserSchema and includes the user ID and
 * hashed credentials, providing a structure for user authentication.
 */
export interface IHashedBaseUser {
	/** @property {TId} _id - Unique identifier for the user. */
	_id: TId;

	/** @property {Object} credentials - User's credentials. */
	credentials: {
		/** @property {string} login - University login (usually student/employee ID). */
		login: string;

		/** @property {string} email - University email of the user. */
		email: string;
	};

	/** @property {number} iat - Issued at timestamp for the user. */
	iat: number;

	/** @property {EUserRole} role - Role of the user in the system. */
	role: EUserRole;
}

/**
 * @interface IBaseUser
 * @description Interface representing a user in the system.
 *
 * This interface extends the IBaseUserSchema and IBaseUserMethods,
 * combining the user data structure with the methods that can be performed
 * on the user.
 */
export interface IBaseUser
	extends IBaseUserSchema,
		Document,
		IBaseUserMethods {}
