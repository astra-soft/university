// src/config/config.ts

// ! lib
// dotenv
import 'dotenv/config';

// ! own
// configs json
import appConfig from './app.json';
import databaseConfig from './database.json';

export const config = {
	app: {
		port: Number(process.env.PORT) || appConfig.port,
		environment: process.env.NODE_ENV || appConfig.environment
	},
	database: {
		url: process.env.MONGO_URL || databaseConfig.url
	}
};
