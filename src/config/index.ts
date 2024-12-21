// src/config/config.ts

import 'dotenv/config';

import appConfig from './app.json';
import databaseConfig from './database.json';

export const config = {
	app: {
		port: Number(process.env.PORT) || appConfig.port
	},
	database: {
		url: process.env.MONGO_URL || databaseConfig.url
	}
};
