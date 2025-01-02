// src/config/index.ts

/**
 * Application Configuration
 * @module Config
 * @description
 * Centralizes application configuration from multiple sources:
 * - Environment variables (.env)
 * - JSON configuration files
 * - Default values
 */

// ! lib
// dotenv-flow
import dotenvFlow from 'dotenv-flow';

// ! own
// configs json
import appConfig from './app.json';
import databaseConfig from './database.json';

dotenvFlow.config(); // Automatically load variables from .env file depending from NODE_ENV

/**
 * Combined application configuration
 * Environment variables take precedence over JSON config
 */
export const config = {
	/** Application settings */
	app: {
		/** Server port */
		port: Number(process.env.PORT) || appConfig.port,
		/** Runtime environment */
		environment: process.env.NODE_ENV || appConfig.environment
	},
	/** Authentication settings */
	auth: {
		/** Cryptographic salt */
		salt: process.env.SALT || appConfig.salt,
		/** JWT expiration time
		 * @default - 24 hours
		 */
		expiresIn: Number(process.env.AUTH_EXPIRES_IN) || 24 * 3600 * 1000
	},
	/** Database settings */
	database: {
		/** MongoDB connection URL */
		url: process.env.MONGO_URL || databaseConfig.url
	},

	/** Logging settings */
	log: {
		colors: {
			INFO: '\x1b[32m',
			ERROR: '\x1b[31m',
			DEBUG: '\x1b[35m',
			WARN: '\x1b[33m'
		},
		maxLevelWidth: 5,
		maxCurrentTimeWidth: 12,
		maxModuleTypeWidth: 14,
		maxModuleNameWidth: 18
	}
};
