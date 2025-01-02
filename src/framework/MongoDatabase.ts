// src/framework/MongoDatabase.ts

/**
 * MongoDatabase
 * @module Framework/MongoDatabase
 */

// ! lib
// mongoose
import mongoose from 'mongoose';

// ! own
// config
import { config } from '@config';
// framework
import { BaseDatabase } from '@framework';
// interfaces
import { EDatabaseNameComponent } from '@interfaces';

/**
 * Class representing a mongo database module.
 *
 * @extends BaseDatabase
 */
export class MongoDatabase extends BaseDatabase {
	constructor() {
		super(EDatabaseNameComponent.Mongo, config.database.url);
	}

	public async connect(): Promise<void> {
		try {
			await mongoose.connect(this.url);
			this.info({
				message: 'MongoDB connected'
			});
		} catch (error) {
			this.error({
				message: 'MongoDB connection error',
				details: { error }
			});
			process.exit(1); // Завершаем процесс, если соединение не удалось
		}
	}

	public async disconnect(): Promise<void> {
		try {
			await mongoose.disconnect();
			// TODO: сделать что-то потом
			// this.info({
			// 	message: 'MongoDB disconnected'
			// });
		} catch (error) {
			this.error({
				message: 'MongoDB disconnection error',
				details: { error }
			});
		}
	}
}
