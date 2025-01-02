// src/framework/RouterManager.ts

/**
 * RouterManager
 * @module Framework/RouterManager
 */

// ! lib
// koa
import Router from '@koa/router';
// framework
import { IClassRouter } from '@interfaces';

export class RouterManager {
	private mainRouter: Router;
	private routers: Array<IClassRouter> = [];

	constructor() {
		this.mainRouter = new Router();
	}

	/**
	 * Регистрирует маршруты из списка роутеров
	 * @param routers Массив экземпляров роутеров
	 */
	public addRouters(routers: Array<IClassRouter>): void {
		this.routers = routers;
	}

	/**
	 * Зарегистрировать маршруты из списка роутеров
	 * и получить основной роутер в ответе
	 * @returns Router
	 */
	public init() {
		let allRoutersCounter = 0;
		this.routers.forEach(router => {
			const routerInstance = new router(); //.initializeRoutes();
			allRoutersCounter += routerInstance.initializeRoutes();

			const routers = routerInstance.getRouter();

			this.mainRouter.use(routers.routes());
			this.mainRouter.use(routers.allowedMethods());
		});

		return {
			routes: this.mainRouter.routes(),
			count: allRoutersCounter
		};
	}
}
