// src/config/config.ts

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
// dotenv
import 'dotenv/config';

// ! own
// configs json
import appConfig from './app.json';
import databaseConfig from './database.json';

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
		environment: process.env.NODE_ENV || appConfig.environment,
		/** Cryptographic salt */
		salt: process.env.SALT || appConfig.salt
	},
	/** Database settings */
	database: {
		/** MongoDB connection URL */
		url: process.env.MONGO_URL || databaseConfig.url
	}
};
