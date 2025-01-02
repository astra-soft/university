// src/server.ts

// ! lib
import 'module-alias/register';
import 'reflect-metadata';

// ! own
// app
import { App } from '@app';
// framework
import { Logger, MongoDatabase } from '@framework';
// interfaces
import { EAppNameComponent, ETypeBlock } from '@interfaces';

const app = new App();

async function main() {
	try {
		// TODO: внедрить подключение к MongoDB в App
		const MongoDB = new MongoDatabase();
		// Подключение к базе данных
		await MongoDB.connect();

		// Запуск приложения
		app.start();

		// Graceful shutdown
		process.on('SIGINT', async () => {
			// Logger.info({
			// 	message: 'Shutting down application...',
			// 	moduleName: EAppNameComponent.AccountingSystem,
			// 	moduleType: ETypeBlock.App
			// });

			await MongoDB.disconnect();
			process.exit(0);
		});

		process.on('SIGTERM', async () => {
			// Logger.info({
			// 	message: 'Application terminated.',
			// 	moduleName: EAppNameComponent.AccountingSystem,
			// 	moduleType: ETypeBlock.App
			// });

			await MongoDB.disconnect();
			process.exit(0);
		});
	} catch (error) {
		Logger.error({
			message: 'Application startup failed',
			moduleName: EAppNameComponent.University,
			moduleType: ETypeBlock.App,
			details: { error }
		});
		process.exit(1);
	}
}

main();
