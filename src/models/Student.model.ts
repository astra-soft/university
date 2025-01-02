// src/models/Student.model.ts

// ! lib
// mongoose
import { Schema, model } from 'mongoose';

// ! own
// classes
import { Student } from '@classes';
// interfaces
import {
	EAccountStatus,
	EGender,
	ELoginResult,
	ESupportedLanguage,
	ESystemStatus,
	IStudent
} from '@interfaces';

const studentSchema = new Schema<IStudent>({
	/** Private identification data */
	private: {
		/** Legal first name */
		firstName: { type: String, required: true },
		/** Legal last name */
		lastName: { type: String, required: true },
		/** Middle name or patronymic */
		middleName: { type: String, required: false },
		/** Date of birth */
		dateOfBirth: { type: Date, required: true },
		/** Gender */
		gender: { type: String, enum: Object.values(EGender) },
		/** National ID or passport number */
		nationalId: { type: String, required: true },
		/** Citizenship/nationality */
		citizenship: { type: String, required: true },
		/** Native language */
		nativeLanguage: { type: String, enum: Object.values(ESupportedLanguage) },
		/** Passport scan URL */
		passportScanUrl: { type: String, required: false },
		/** Additional documents */
		documents: [
			{
				type: String,
				number: String,
				issueDate: Date,
				expiryDate: Date,
				scanUrl: String
			}
		],
		/** Medical information */
		medical: {
			bloodType: String,
			allergies: [String],
			emergencyContact: {
				name: String,
				relation: String,
				phone: String
			}
		}
	},

	/** Personal contact information */
	contact: {
		/** Personal email */
		personalEmail: String,
		/** Primary phone number */
		phone: String,
		/** Emergency contact phone */
		emergencyPhone: String,
		/** Current residential address */
		address: {
			country: String,
			city: String,
			street: String,
			building: String,
			apartment: String,
			postalCode: String
		},
		/** Social media profiles */
		socialMedia: [
			{
				type: String,
				username: String,
				url: String
			}
		]
	},

	/** University credentials */
	credentials: {
		/** University login (usually student/employee ID) */
		login: { type: String, required: true },
		/** University email */
		email: { type: String, required: true },
		/** Hashed password */
		password: { type: String, required: true, select: false }
	},

	/** Security settings */
	security: {
		/** Two-factor authentication enabled */
		twoFactorEnabled: Boolean,
		/** Two-factor secret key (encrypted) */
		twoFactorSecret: String,
		/** Account lockout expiration */
		lockoutUntil: Date,
		/** Number of failed login attempts */
		errorLoginAttempts: { type: Number, default: 0 },
		/** Last 10 login attempts */
		loginHistory: [
			{
				timestamp: Date,
				/** IP address of request */
				ip: String,
				/** User agent string */
				userAgent: String,
				/** Geolocation data if available */
				location: {
					country: String,
					city: String,
					coordinates: {
						latitude: Number,
						longitude: Number
					}
				},
				/** Result of login attempt */
				result: { type: String, enum: Object.values(ELoginResult) }
			}
		],
		/** Security questions for account recovery */
		recoveryQuestions: [
			{
				question: String,
				answerHash: String
			}
		],
		/** List of trusted devices */
		trustedDevices: [
			{
				deviceId: String,
				deviceName: String,
				lastUsed: Date,
				ipAddress: String
			}
		],
		/** Active sessions */
		activeSessions: [
			{
				sessionId: String,
				deviceInfo: String,
				ipAddress: String,
				startedAt: Date,
				lastActivity: Date
			}
		]
	},

	/** User preferences */
	preferences: {
		/** Interface language */
		language: { type: String, enum: Object.values(ESupportedLanguage) },
		/** Profile picture URL */
		avatarUrl: String,
		/** Notification settings */
		notifications: {
			email: Boolean,
			sms: Boolean,
			push: Boolean
		}
	},

	/** System metadata */
	system: {
		/** Account status */
		accountStatus: { type: String, enum: Object.values(EAccountStatus) },
		/** Current system status */
		systemStatus: { type: String, enum: Object.values(ESystemStatus) },
		/** Account creation date - constant */
		createdAt: Date,
		/** Last profile update */
		updatedAt: Date,
		/** Last successful login */
		lastLoginAt: Date,
		/** Last activity timestamp */
		lastActivityAt: Date,
		/** Terms of service acceptance date */
		tosAcceptedAt: Date,
		/** Password last changed timestamp */
		passwordChangedAt: Date
	}
});

// Подключение методов из базового класса
studentSchema.loadClass(Student);

export const StudentModel = model<IStudent>('Student', studentSchema);
