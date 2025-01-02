// src/modules/student/Student.service.ts

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
import { BaseService } from '@framework';
// interfaces
import {
	EServiceNameModule,
	EHttpServerErrorStatus,
	IStudent
} from '@interfaces';
// modules
import { CreateStudentDto, StudentRepository } from '@modules/student';
// utils
import { CryptoUtils } from '@utils';

export class StudentService extends BaseService {
	private userRepository = new StudentRepository();

	constructor() {
		super(EServiceNameModule.StudentService);
	}

	public async getAllUsers(ctx: Context) {
		this.info({
			message: 'Fetching all students',
			requestId: ctx.state.requestId
		});
		try {
			const students = await this.userRepository.getAll(ctx);

			return students;
		} catch (error: unknown) {
			if (error instanceof AppError) {
				if (error.origin === EOrigin.Service) {
					this.error({
						requestId: ctx.state.requestId,
						message: error.message,
						details: {
							originalError: error.originalError,
							subError: error.subError,
							errorName: error.name,
							stack: error.stack
						}
					});
				}

				throw error;
			}

			throw new AppError({
				name: 'Unknown error',
				statusCode: EHttpServerErrorStatus.InternalServerError,
				origin: EOrigin.Service,
				message: 'Error occurred while fetching students',
				// subError?: string,
				originalError: error as Error
				// details: any,
			});
		}
	}

	public async findByLogin({ ctx, login }: { ctx: Context; login: string }) {
		this.info({
			message: 'Fetching one student by login',
			requestId: ctx.state.requestId
		});
		return await this.userRepository.findByLogin({
			ctx,
			login
		});
	}

	public async findByEmail({
		ctx,
		email,
		options: { includePassword = false }
	}: {
		ctx: Context;
		email: string;
		options: { includePassword?: boolean };
	}): Promise<IStudent> {
		this.info({
			message: 'Fetching one student by email',
			requestId: ctx.state.requestId,
			details: {
				email
			}
		});

		try {
			// Вызов репозитория
			const user = await this.userRepository.findByEmail({
				ctx,
				email,
				options: { includePassword }
			});

			// Логирование результата
			if (user) {
				this.info({
					message: 'Student found by email',
					requestId: ctx.state.requestId,
					details: { email, userId: user.id }
				});
			} else {
				this.warn({
					message: 'No student found for the provided email',
					requestId: ctx.state.requestId,
					details: { email }
				});
			}

			return user as IStudent;
		} catch (error: unknown) {
			if (error instanceof AppError) {
				if (error.origin === EOrigin.Service) {
					this.error({
						requestId: ctx.state.requestId,
						message: error.message,
						details: {
							originalError: error.originalError,
							subError: error.subError,
							errorName: error.name,
							stack: error.stack
						}
					});
				}

				throw error;
			}

			this.error({
				requestId: ctx.state.requestId,
				message: 'Error occurred while fetching student by email',
				details: {
					error: error
				}
			});
			throw new AppError({
				name: 'Unknown error',
				statusCode: EHttpServerErrorStatus.InternalServerError,
				origin: EOrigin.Service,
				message: 'Error occurred while fetching student by email',
				// subError?: string,
				originalError: error as Error
				// details: any,
			});
		}
	}

	public async createOneStudent({
		ctx,
		dto
	}: {
		ctx: Context;
		dto: CreateStudentDto;
	}): Promise<IStudent> {
		try {
			this.info({
				message: 'Creating student',
				requestId: ctx.state.requestId
			});

			console.log(181);

			// hashed pass before save
			const hashedPassword = CryptoUtils.hashString(dto.credentials.password);

			console.log(184);

			return await this.userRepository.createOne({
				ctx,
				data: {
					private: { ...dto.private },
					contact: { ...dto.contact },
					credentials: {
						email: dto.credentials.email,
						login: dto.credentials.login,
						password: hashedPassword
					},
					preferences: { ...dto.preferences }
				}
			});
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
					message: 'Error creating student',
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
					message: 'Error creating student',
					details: error as object
				});
				throw new AppError({
					name: 'Unknown error',
					statusCode: EHttpServerErrorStatus.InternalServerError,
					origin: EOrigin.Service,
					message: 'Error creating student',
					// subError?: string,
					originalError: error as Error,
					details: error
				});
			}
		}
	}
}
