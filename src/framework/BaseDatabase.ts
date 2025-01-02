// src/framework/BaseDatabase.ts

/**
 * BaseDatabase
 * @module Framework/BaseDatabase
 */

// ! own
// framework
import { BaseModule } from '@framework';
// interfaces
import { EDatabaseNameComponent, ETypeBlock } from '@interfaces';

/**
 * Class representing a database module.
 * @abstract
 * @extends BaseModule
 */
export abstract class BaseDatabase extends BaseModule {
	/** URL для подключения к базе данных */
	protected url: string;

	constructor(moduleName: EDatabaseNameComponent, url: string) {
		super(ETypeBlock.Database, moduleName);
		this.url = url;
	}

	/**
	 * Подключение к базе данных
	 */
	public abstract connect(): Promise<void>;

	/**
	 * Отключение от базы данных
	 */
	public abstract disconnect(): Promise<void>;
}
