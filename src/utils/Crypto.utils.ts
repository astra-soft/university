// src/utils/Crypto.utils.ts

/**
 * Utility functions for work with cryptography
 * @module Utils/Crypto
 *
 * Этот модуль предоставляет утилиты для работы с криптографией, включая генерацию и валидацию JWT токенов,
 * хеширование строк и сравнение хешей.
 */

// ! lib
// crypto
import crypto from 'crypto';

// ! own
// config
import { config } from '@config';

/**
 * Utility class for cryptography
 */
export class CryptoUtils {
	static salt: string = config.auth.salt;

	/**
	 * Generates a JWT token
	 * @param data - Data to encode into the token
	 * @returns JWT token
	 */
	public static generateJwtToken(data: Record<string, any>): string {
		const header = {
			alg: 'HS256', // Signature algorithm
			typ: 'JWT' // Token type
		};

		const payload = {
			...data,
			iat: Math.floor(Date.now() / 1000) // Token issued at
		};

		// Encode header and payload in Base64
		const base64Header = Buffer.from(JSON.stringify(header)).toString(
			'base64url'
		);
		const base64Payload = Buffer.from(JSON.stringify(payload)).toString(
			'base64url'
		);

		// Create the signature
		const signature = crypto
			.createHmac('sha256', this.salt)
			.update(`${base64Header}.${base64Payload}`)
			.digest('base64url');

		// Assemble the token
		return `${base64Header}.${base64Payload}.${signature}`;
	}

	/**
	 * Validates a JWT token
	 * @param token - JWT token to validate
	 * @returns Decoded token payload or null if invalid
	 */
	public static validateJwtToken(token: string) {
		const [base64Header, base64Payload, signature] = token.split('.');

		const expectedSignature = crypto
			.createHmac('sha256', this.salt)
			.update(`${base64Header}.${base64Payload}`)
			.digest('base64url');

		if (expectedSignature !== signature) {
			return null;
		}

		return JSON.parse(Buffer.from(base64Payload, 'base64url').toString('utf8'));
	}

	/**
	 * Hashes a string using PBKDF2
	 * @param string - String to hash
	 * @returns Hashed string
	 */
	public static hashString(string: string): string {
		return crypto
			.pbkdf2Sync(string, this.salt, 100000, 64, 'sha512') // PBKDF2 algorithm with iterations
			.toString('hex'); // Convert to a string
	}

	/**
	 * Compares a string with its hash
	 * @param string - Original string
	 * @param hash - Hash to compare with
	 * @returns `true` if the hash matches, otherwise `false`
	 */
	public static compareHash(string: string, hash: string): boolean {
		return this.hashString(string) === hash; // Compare hashes
	}
}
