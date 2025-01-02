// src/classes/BaseUser.class.ts

/**
 * @module Classes/BaseUser
 *
 * This module defines the base user class for all user types within the system.
 */

// ! lib
// mongoose
import { Document } from 'mongoose';

// ! own
// interfaces
import {
	ELoginResult,
	EUserRole,
	IBaseUser,
	ICreateLoginAttempt
} from '@interfaces';
// utils
import { CryptoUtils, EnvironmentUtils } from '@utils';

/**
 * @class BaseUser
 * @description Abstract class representing a base user in the system.
 *
 * This class implements the IBaseUser interface and provides methods
 * for user authentication and management.
 */
export abstract class BaseUser extends Document implements IBaseUser {
	/**
	 * properties
	 */
	public private!: IBaseUser['private'];
	public contact!: IBaseUser['contact'];
	public credentials!: IBaseUser['credentials'];
	public security!: IBaseUser['security'];
	public preferences!: IBaseUser['preferences'];
	public system!: IBaseUser['system'];

	/**
	 * abstract methods
	 */
	abstract getRole(): EUserRole;

	/**
	 * Checks if the provided password matches the user's hashed password.
	 *
	 * @param {string} password - The password to check.
	 * @throws {HttpUnauthorizedError} If the password is incorrect.
	 */
	checkPassword(this: IBaseUser, password: string): boolean {
		return CryptoUtils.compareHash(password, this.credentials.password);
	}

	/**
	 * Creates an authentication token for the user
	 *
	 * @returns {string} The authentication token
	 */
	createToken(this: IBaseUser): string {
		return CryptoUtils.generateJwtToken({
			_id: this._id, // User identifier
			credentials: {
				login: this.credentials.login,
				email: this.credentials.email
			},
			role: this.getRole // User role
		});
	}

	async addLoginAttempt(
		this: IBaseUser,
		attempt: ICreateLoginAttempt
	): Promise<void> {
		const update: Record<string, any> = {
			$push: {
				'security.loginHistory': {
					$each: [attempt],
					$slice: EnvironmentUtils.isProduction() ? -64 : -4
				}
			}
		};

		// Если попытка входа неудачная, увеличиваем errorLoginAttempts
		if (attempt.result !== ELoginResult.Success) {
			update.$inc = { 'security.errorLoginAttempts': 1 };
		} else {
			// Сбрасываем счетчик при успешной попытке
			update.$set = { 'security.errorLoginAttempts': 0 };
		}

		// Выполняем обновление
		await this.updateOne(update);
	}

	hasExceededLoginAttempts(this: IBaseUser): boolean {
		return (
			this.security.errorLoginAttempts >= EnvironmentUtils.maxLoginAttempts
		);
	}

	async lockoutLogin(this: IBaseUser): Promise<Date> {
		const lockoutUntil = new Date(
			Date.now() + EnvironmentUtils.lockoutPeriodMinutes * 60 * 1000
		);

		await this.updateOne({
			'security.lockoutUntil': lockoutUntil
		});

		return lockoutUntil;
	}

	isLoginLocked(this: IBaseUser): boolean {
		return (
			this.security.lockoutUntil instanceof Date &&
			this.security.lockoutUntil > new Date()
		);
	}
}
