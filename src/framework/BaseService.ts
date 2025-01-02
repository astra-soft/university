// src/framework/BaseService.ts

/**
 * BaseService
 * @module Framework/BaseService
 */

// ! own
// framework
import { BaseModule } from '@framework';
// interfaces
import { ETypeBlock, TBlockValue } from '@interfaces';

/**
 * Base class for all services.
 * Provides common functionality like logging and initialization.
 * @abstract
 * @extends BaseModule
 */
export abstract class BaseService extends BaseModule {
	constructor(moduleName: TBlockValue<ETypeBlock.Service>) {
		super(ETypeBlock.Service, moduleName);
	}

	/**
	 * Example method to demonstrate base functionality.
	 * Can be overridden or extended by child services.
	 */
	protected exampleMethod() {
		this.info({
			message: 'Executing example method in BaseService'
		});
	}
}
