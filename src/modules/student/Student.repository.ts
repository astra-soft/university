// src/modules/student/Student.repository.ts

/**
 * StudentRepository
 * @module Modules/Student/StudentRepository
 */

// ! lib
// koa
import { Context } from 'koa';
// mongodb
import { MongoError } from 'mongodb';
// mongoose
import mongoose from 'mongoose';

// ! own
// errors
import {
	AppError,
	CastError,
	DuplicateKeyError,
	EOrigin,
	ValidationError
} from '@errors';
// framework
import { BaseRepository } from '@framework';
// interfaces
import {
	EHttpServerErrorStatus,
	ERepositoryNameModule,
	IStudent
} from '@interfaces';
// models
import { StudentModel } from '@models';
// modules
import { CreateStudentDto } from '@modules/student';

export class StudentRepository extends BaseRepository<IStudent> {
	constructor() {
		super(ERepositoryNameModule.UserRepository, StudentModel);
	}

	/**
	 * get all users
	 * @param ctx Context of the request
	 * @returns Promise<IUser[]>
	 */
	async getAll(ctx: Context) {
		try {
			this.log({
				ctx,
				filter: {},
				options: {
					method: 'Fetching',
					isFilterEmpty: true,
					isAll: true
				}
			});

			return this.findMany();
		} catch (error) {
			this.error({
				message: 'Error fetching students',
				requestId: ctx.state.requestId,
				details: error as object
			});
			throw new AppError({
				name: 'Unknown database error',
				statusCode: EHttpServerErrorStatus.InternalServerError,
				origin: EOrigin.Repository,
				message: 'Error fetching students',
				// subError?: string,
				originalError: error as Error
				// details: any,
			});
		}
	}

	/**
	 * Find user by login
	 * @param login Login of the user
	 * @param ctx Context of the request
	 * @returns Promise<IUser | null>
	 */
	async findByLogin({
		ctx,
		login
	}: {
		ctx: Context;
		login: string;
	}): Promise<IStudent | null> {
		try {
			this.log({
				ctx,
				filter: {},
				options: {
					method: 'Fetching',
					isFilterEmpty: false,
					isAll: false
				}
			});

			const user = await this.findOne(
				{
					'credentials.login': login
				},
				'+credentials.password'
			);

			// this.info({
			// 	message: `Fetching user by login`,
			// 	requestId: ctx.state.requestId,
			// 	details: { login }
			// });
			return user; // this.model.findOne({ 'credentials.login': login }).exec();
		} catch (error) {
			this.error({
				message: 'Error getting one user by login',
				requestId: ctx.state.requestId,
				details: error as object
			});
			throw new AppError({
				name: 'Unknown database error',
				statusCode: EHttpServerErrorStatus.InternalServerError,
				origin: EOrigin.Repository,
				message: 'Error getting one user by login',
				// subError?: string,
				originalError: error as Error
				// details: any,
			});
		}
	}

	/**
	 * Find user by email
	 * @param email Email of the user
	 * @param ctx Context of the request
	 * @returns Promise<IUser | null>
	 */
	async findByEmail({
		ctx,
		email,
		options: { includePassword = false }
	}: {
		ctx: Context;
		email: string;
		options: { includePassword?: boolean };
	}): Promise<IStudent | null> {
		try {
			this.log({
				ctx,
				filter: { 'employer.email': email },
				options: { method: 'Fetching', isFilterEmpty: false, isAll: false }
			});

			// Построение запроса
			const query = this.model.findOne({ 'credentials.email': email });
			if (includePassword) {
				query.select('+credentials.password');
			}

			const user = await query.exec();

			return user;
		} catch (error) {
			this.error({
				message: 'Error getting one user by email',
				requestId: ctx.state.requestId,
				details: error as object
			});
			throw new AppError({
				name: 'Unknown database error',
				statusCode: EHttpServerErrorStatus.InternalServerError,
				origin: EOrigin.Repository,
				message: 'Error getting one user by email',
				// subError?: string,
				originalError: error as Error
				// details: any,
			});
		}
	}

	async createOne({ ctx, data }: { ctx: Context; data: CreateStudentDto }) {
		try {
			this.log({
				ctx,
				filter: {},
				options: { method: 'Create', isFilterEmpty: true, isAll: false }
			});

			return this.create({ data });
		} catch (error: unknown) {
			if (error instanceof mongoose.Error.ValidationError) {
				this.warn({
					message: error.message,
					requestId: ctx.state.requestId,
					details: error
				});
				throw new ValidationError({
					origin: EOrigin.Service,
					message: error.message,
					originalError: error as Error,
					details: { ...error.errors }
				});
			} else if (error instanceof mongoose.Error.CastError) {
				this.warn({
					message: error.message,
					requestId: ctx.state.requestId,
					details: error as object
				});
				throw new CastError({
					origin: EOrigin.Service,
					message: error.message,
					originalError: error as Error,
					details: { path: error.path, reason: error.reason }
				});
			} else if (error instanceof MongoError && error.code === 11000) {
				// Logger.warn('Duplicate key error', this.name, error);
				this.error({
					message: 'Error creating user',
					requestId: ctx.state.requestId,
					details: { ...(error as object), reason: 'Duplicate key error' }
				});
				throw new DuplicateKeyError({
					origin: EOrigin.Service,
					message: error.message,
					originalError: error as Error,
					details: error.cause
				});
			} else {
				this.error({
					requestId: ctx.state.requestId,
					message: 'Error creating user',
					details: error as object
				});
				throw new AppError({
					name: 'Unknown error',
					statusCode: EHttpServerErrorStatus.InternalServerError,
					origin: EOrigin.Service,
					message: 'Error creating user',
					// subError?: string,
					originalError: error as Error,
					details: error
				});
			}
		}
	}
}
