// src/framework/BaseRouter.ts

/**
 * BaseRouter
 * @module Framework/BaseRouter
 */

// ! lib
import Router, { Middleware, RouterContext } from '@koa/router';

// ! own
// framework
import { BaseModule } from '@framework';
// interfaces
import {
	EColor,
	EHttpMethod,
	ERouterUrlModule,
	ETypeBlock,
	IModuleRouter,
	TBlockValue
} from '@interfaces';
// utils
import { StringUtils } from '@utils';

/**
 * Base class for all routers.
 * Provides functionality to manage routes and integrate controllers.
 * @abstract
 * @extends BaseModule
 */
export abstract class BaseRouter extends BaseModule implements IModuleRouter {
	protected readonly router: Router;
	protected routerCounter: number = 0;

	constructor(
		moduleName: TBlockValue<ETypeBlock.Router>,
		prefix: ERouterUrlModule
	) {
		super(ETypeBlock.Router, moduleName);
		this.router = new Router({ prefix });
	}

	/**
	 * Logs the registered route for debugging purposes.
	 *
	 * @param method - The HTTP method.
	 * @param path - The route path.
	 */
	private logRoute(method: EHttpMethod, path: string): void {
		const logMessage = `Route registered: ${EColor.CYAN}${
			StringUtils.padString(EHttpMethod[method], 6) // TODO: вынести число в константу
		}${EColor.WHITE} - ${EColor.PURPLE} ${path} ${EColor.WHITE}`;

		this.info({
			message: logMessage
		});
	}

	/**
	 * Returns the Koa Router instance.
	 */
	public getRouter(): Router {
		return this.router;
	}

	/**
	 * Abstract method to define routes for the router.
	 * Must be implemented by subclasses.
	 */
	public abstract defineRoutes(): void;

	/**
	 * Registers a route with the specified HTTP method.
	 *
	 * @param method - The HTTP method (GET, POST, PUT, DELETE).
	 * @param path - The route path.
	 * @param middleware - Middleware for the route.
	 */
	private registerRoute(
		method: EHttpMethod,
		path: string,
		...middleware: Middleware<RouterContext>[]
	): void {
		switch (method) {
			case EHttpMethod.GET:
				this.router.get(path, ...middleware);
				break;
			case EHttpMethod.POST:
				this.router.post(path, ...middleware);
				break;
			case EHttpMethod.PUT:
				this.router.put(path, ...middleware);
				break;
			case EHttpMethod.PATCH:
				this.router.patch(path, ...middleware);
				break;
			case EHttpMethod.DELETE:
				this.router.delete(path, ...middleware);
				break;
			default:
				throw new Error(`Unsupported HTTP method: ${method}`);
		}

		this.routerCounter++;

		this.logRoute(
			method,
			this.router.opts.prefix ? `${this.router.opts.prefix}${path}` : path
		);
	}

	/**
	 * Initializes the router by defining routes.
	 * To be called externally.
	 */
	public initializeRoutes(): number {
		this.defineRoutes();

		return this.routerCounter;
	}

	/**
	 * Registers a GET route.
	 *
	 * @param path - The route path.
	 * @param middleware - Middleware for the route.
	 */
	protected get(
		path: string,
		...middleware: Middleware<RouterContext>[]
	): void {
		this.registerRoute(EHttpMethod.GET, path, ...middleware);
	}

	/**
	 * Registers a POST route.
	 *
	 * @param path - The route path.
	 * @param middleware - Middleware for the route.
	 */
	protected post(
		path: string,
		...middleware: Middleware<RouterContext>[]
	): void {
		this.registerRoute(EHttpMethod.POST, path, ...middleware);
	}

	/**
	 * Registers a PUT route.
	 *
	 * @param path - The route path.
	 * @param middleware - Middleware for the route.
	 */
	protected put(
		path: string,
		...middleware: Middleware<RouterContext>[]
	): void {
		this.registerRoute(EHttpMethod.PUT, path, ...middleware);
	}

	/**
	 * Registers a PATCH route.
	 *
	 * @param path - The route path.
	 * @param middleware - Middleware for the route.
	 */
	protected patch(
		path: string,
		...middleware: Middleware<RouterContext>[]
	): void {
		this.registerRoute(EHttpMethod.PATCH, path, ...middleware);
	}

	/**
	 * Registers a DELETE route.
	 *
	 * @param path - The route path.
	 * @param middleware - Middleware for the route.
	 */
	protected delete(
		path: string,
		...middleware: Middleware<RouterContext>[]
	): void {
		this.registerRoute(EHttpMethod.DELETE, path, ...middleware);
	}
}
