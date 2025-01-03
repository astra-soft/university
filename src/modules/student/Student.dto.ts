// src/modules/student/Student.dto.ts

/**
 * @module Modules/Student/Student.dto
 * @description DTO for student
 * @exports CreateStudentDto
 *
 * @requires class-validator
 * @requires class-transformer
 */

// ! lib
// class-validator
import {
	IsString,
	IsNotEmpty,
	IsOptional,
	IsDate,
	MinLength,
	MaxLength,
	ValidateNested,
	IsEmail,
	IsEnum,
	IsArray
} from 'class-validator';
// class-transformer
import { Type } from 'class-transformer';

// ! own
// interfaces
import {
	EAccountStatus,
	EGender,
	ESupportedLanguage,
	ESystemStatus
} from '@interfaces';

class DocumentDto {
	@IsString()
	@IsNotEmpty()
	type?: string;

	@IsString()
	@IsNotEmpty()
	number?: string;

	@IsDate()
	issueDate?: Date;

	@IsDate()
	expiryDate?: Date;

	@IsString()
	@IsNotEmpty()
	scanUrl?: string;
}

class EmergencyContactDto {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsString()
	@IsNotEmpty()
	relation!: string;

	@IsString()
	@IsNotEmpty()
	phone!: string;
}

class MedicalInfoDto {
	@IsOptional()
	@IsString()
	bloodType?: string;

	@IsOptional()
	@IsArray()
	allergies?: string[];

	@IsOptional()
	@ValidateNested()
	@Type(() => EmergencyContactDto)
	emergencyContact?: EmergencyContactDto;
}

/** Private identification data */
class PrivateDto {
	/** Legal first name */
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(50)
	firstName!: string;

	/** Legal last name */
	@IsString()
	@IsOptional()
	lastName?: string;

	/** Middle name or patronymic */
	@IsString()
	@IsOptional()
	middleName?: string;

	/** Date of birth */
	@IsDate()
	@IsNotEmpty()
	@Type(() => Date)
	dateOfBirth!: Date;

	/** Gender */
	@IsString()
	@IsEnum(EGender)
	@IsOptional()
	gender?: EGender;

	/** National ID or passport number */
	@IsString()
	@IsNotEmpty()
	nationalId!: string;

	/** Citizenship/nationality */
	@IsString()
	@IsNotEmpty()
	citizenship!: string;

	/** Native language */
	@IsString()
	@IsEnum(ESupportedLanguage)
	@IsNotEmpty()
	nativeLanguage!: ESupportedLanguage;

	/** Passport scan URL */
	@IsString()
	@IsOptional()
	passportScanUrl?: string;

	/** Additional documents */
	@IsOptional()
	@IsArray()
	documents?: DocumentDto[];

	/** Medical information */
	@IsOptional()
	@ValidateNested()
	@Type(() => MedicalInfoDto)
	medical?: MedicalInfoDto;
}

class AddressDto {
	@IsString()
	@IsNotEmpty()
	country?: string;

	@IsString()
	@IsNotEmpty()
	city?: string;

	@IsString()
	@IsNotEmpty()
	street?: string;

	@IsString()
	@IsNotEmpty()
	building?: string;

	@IsOptional()
	@IsString()
	apartment?: string;

	@IsString()
	@IsNotEmpty()
	postalCode?: string;
}

class SocialMediaDto {
	@IsString()
	@IsNotEmpty()
	type?: string;

	@IsString()
	@IsNotEmpty()
	username?: string;

	@IsString()
	@IsNotEmpty()
	url?: string;
}

/** Personal contact information */
class ContactDto {
	/** Personal email */
	@IsEmail()
	@IsNotEmpty()
	personalEmail?: string;

	/** Primary phone number */
	@IsOptional()
	@IsString()
	phone?: string;

	/** Emergency contact phone */
	@IsOptional()
	@IsString()
	emergencyPhone?: string;

	/** Current residential address */
	@ValidateNested()
	@Type(() => AddressDto)
	address?: AddressDto;

	/** Social media profiles */
	@IsOptional()
	@IsArray()
	socialMedia?: SocialMediaDto[];
}

/** University credentials */
class CredentialsDto {
	/** University login (usually student/employee ID) */
	@IsString()
	@IsNotEmpty()
	login!: string;

	/** University email */
	@IsEmail()
	@IsNotEmpty()
	email!: string;

	/** Hashed password */
	@IsString()
	@IsNotEmpty()
	password!: string;
}

class PreferencesDto {
	/** Interface language */
	@IsEnum(ESupportedLanguage)
	language?: ESupportedLanguage;

	/** Profile picture URL */
	@IsOptional()
	@IsString()
	avatarUrl?: string;

	/** Notification settings */
	notifications?: {
		email?: boolean;
		sms?: boolean;
		push?: boolean;
	};
}

export class CreateStudentDto {
	@ValidateNested()
	@Type(() => PrivateDto)
	private!: PrivateDto;

	@ValidateNested()
	@Type(() => ContactDto)
	contact?: ContactDto;

	@ValidateNested()
	@Type(() => CredentialsDto)
	credentials!: CredentialsDto;

	@ValidateNested()
	@Type(() => PreferencesDto)
	preferences?: PreferencesDto;
}
