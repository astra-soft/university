// src/app/App.ts

// ! lib
// koa
import Koa from 'koa';
// koa-body
import koaBody from 'koa-body';

// ! own
// config
import { config } from '@config';
// framework
import { BaseModule } from '@framework';
// interfaces
import { EAppNameComponent, EColor, ETypeBlock } from '@interfaces';
// middleware
import { ErrorHandlerMiddleware, RequestIdMiddleware } from '@middleware';
// utils
import { StringUtils } from '@utils';
// private
import { routerManager } from './routes';

export class App extends BaseModule {
	private app: Koa;

	constructor() {
		super(ETypeBlock.App, EAppNameComponent.University);
		this.app = new Koa();

		// const logMessage = `\n${EColor.CYAN}=============================================\n\t${EColor.GREEN}Starting University Server...\n${EColor.CYAN}=============================================\n`;
		// console.log(logMessage);
	}

	/**
	 * Initializes global middlewares.
	 */
	private initializeMiddlewares(): void {
		this.info({ message: 'Initializing middlewares...' });
		this.app.use(RequestIdMiddleware);
		this.app.use(ErrorHandlerMiddleware);
	}

	/**
	 * Initializes application routes.
	 */
	private initializeRoutes(): void {
		this.info({ message: 'Start registering routes' });
		const { count, routes } = routerManager.init();
		this.app.use(routes);
		this.info({
			message: `${StringUtils.padString('End', 5)} registering routes${
				EColor.WHITE
			} - ${EColor.CYAN}${count}${EColor.WHITE}`
		});
	}

	/**
	 * Starts the Koa server.
	 */
	public start(): void {
		this.app.listen(config.app.port, () => {
			const logMessage = `Server running in ${EColor.WHITE}- ${EColor.PURPLE}http://localhost:${config.app.port}${EColor.WHITE}`;

			this.info({
				message: `${EColor.CYAN}==================================================`
			});
			this.info({
				message: `\tStarting University in ${EColor.CYAN}${config.app.environment}${EColor.GREEN} mode`
			});
			this.info({
				message: `${EColor.CYAN}==================================================`
			});

			this.app.use(
				koaBody({
					multipart: true, // Поддержка загрузки файлов
					formidable: {
						uploadDir: './uploads', // Директория для временного хранения файлов
						keepExtensions: true // Сохранять расширения файлов
					}
				})
			);

			this.initializeMiddlewares();
			this.initializeRoutes();

			this.info({
				message: logMessage
			});
		});
	}
}
