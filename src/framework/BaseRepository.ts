// src/framework/BaseRepository.ts

/**
 * BaseRepository
 * @module Framework/BaseRepository
 */

// ! lib
// Mongoose
import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';
// koa
import { Context } from 'koa';

// ! own
// framework
import { BaseModule } from '@framework';
// interfaces
import { EColor, ETypeBlock, TBlockValue } from '@interfaces';

/**
 * Base class for all repositories.
 * Provides common functionality for interacting with Mongoose models.
 * @abstract
 * @extends BaseModule
 */
export abstract class BaseRepository<T extends Document> extends BaseModule {
	protected model: Model<T>;

	protected log({
		ctx,
		filter,
		options
	}: {
		ctx: Context;
		filter?: FilterQuery<T>;
		options: {
			method: 'Fetching' | 'Delete' | 'Update' | 'Create';
			isFilterEmpty: boolean;
			isAll: boolean;
		};
	}) {
		this.info({
			message: `${options.method} a ${options.isAll ? 'all' : 'single'} '${
				EColor.CYAN
			}${this.model.modelName}${EColor.GREEN}' record${
				options.isAll ? 's' : ''
			} ${options.isFilterEmpty ? '' : ' with filter'}`,
			requestId: ctx.state.requestId,
			details: options.isFilterEmpty ? undefined : { filter }
		});
	}

	constructor(moduleName: TBlockValue<ETypeBlock.Repository>, model: Model<T>) {
		super(ETypeBlock.Repository, moduleName);
		this.model = model;
	}

	/**
	 * Create document in the collection.
	 * @param data to create document
	 * @returns Promise<T>
	 */
	protected async create({ data }: { data: any }): Promise<T> {
		return this.model.create(data);
	}

	/**
	 * Find a single document by filter with optional selected fields.
	 * @param filter Query to find a single document
	 * @param select Fields to include or exclude (e.g., '+password')
	 * @returns Promise<T | null>
	 */
	protected async findOne(
		filter: FilterQuery<T> = {},
		select: string | null = null
	): Promise<T | null> {
		const query = this.model.findOne(filter);
		if (select) {
			query.select(select);
		}
		return query.exec();
	}

	/**
	 * Find multiple documents by filter with optional options like select, sort, and pagination.
	 * @param filter Query to find documents
	 * @param options Additional options like select, sort, limit, and skip
	 * @returns Promise<T[]>
	 */
	protected async findMany(
		filter: FilterQuery<T> = {},
		options: {
			select?: string;
			sort?: Record<string, 1 | -1>; // e.g., { createdAt: -1 }
			limit?: number;
			skip?: number;
		} = {}
	): Promise<T[]> {
		const query = this.model.find(filter);

		if (options.select) {
			query.select(options.select);
		}

		if (options.sort) {
			query.sort(options.sort);
		}

		if (options.limit) {
			query.limit(options.limit);
		}

		if (options.skip) {
			query.skip(options.skip);
		}

		return query.exec();
	}

	/**
	 * Count the number of documents matching a filter.
	 * @param filter Query to count documents
	 * @returns Promise<number>
	 */
	protected async count(filter: FilterQuery<T> = {}): Promise<number> {
		return this.model.countDocuments(filter).exec();
	}

	/**
	 * Check if a document exists by filter.
	 * @param filter Query to check existence
	 * @returns Promise<boolean>
	 */
	protected async exists(filter: FilterQuery<T> = {}): Promise<boolean> {
		const count = await this.count(filter);
		return count > 0;
	}

	/**
	 * Update a document by filter.
	 * @param filter Query to find the document
	 * @param update Data to update
	 * @returns Promise<T | null>
	 */
	protected async update({
		ctx,
		filter = {},
		update = {}
	}: {
		ctx: Context;
		filter: FilterQuery<T>;
		update?: UpdateQuery<T>;
	}): Promise<T | null> {
		const isFilterEmpty = Object.keys(filter).length === 0;

		this.log({
			ctx,
			filter,
			options: { method: 'Update', isFilterEmpty, isAll: false }
		});

		return this.model.findOneAndUpdate(filter, update, { new: true }).exec();
	}

	/**
	 * Delete a document by filter.
	 * @param filter Query to find the document
	 * @returns Promise<T | null>
	 */
	protected async delete({
		ctx,
		filter = {}
	}: {
		ctx: Context;
		filter?: FilterQuery<T>;
	}): Promise<T | null> {
		const isFilterEmpty = Object.keys(filter).length === 0;

		this.log({
			ctx,
			filter,
			options: { method: 'Delete', isFilterEmpty, isAll: false }
		});
		return this.model.findOneAndDelete(filter).exec();
	}
}
