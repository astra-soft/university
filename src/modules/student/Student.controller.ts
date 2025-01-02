// src/modules/student/Student.controller.ts

// ! lib
// koa
import { Context } from 'koa';

// ! own
// errors
import { AppError, EOrigin } from '@errors';
// framework
import { BaseController } from '@framework';
// interfaces
import {
	EControllerNameModule,
	EHttpServerErrorStatus,
	EHttpSuccessStatus
} from '@interfaces';
// modules
import { CreateStudentDto, StudentService } from '@modules/student';

export class UserController extends BaseController {
	private readonly studentService: StudentService = new StudentService();

	constructor() {
		super(EControllerNameModule.StudentController);
	}

	public async getAllUsers({ ctx }: { ctx: Context }): Promise<void> {
		this.info({
			message: 'Fetching all students',
			requestId: ctx.state.requestId
		});

		try {
			const students = await this.studentService.getAllUsers(ctx);

			this.sendResponse({
				ctx,
				data: {
					students: students.map(user => user._id)
				},
				dataToSend: students,
				message: `Get all students - ${students.length}`,
				meta: {
					count: students.length
				}
			});
		} catch (error: unknown) {
			if (error instanceof AppError) {
				if (error.origin === EOrigin.Controller) {
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
				message: 'Error occurred while fetching all students',
				details: {
					error: error
				}
			});
			throw new AppError({
				name: 'Unknown error',
				statusCode: EHttpServerErrorStatus.InternalServerError,
				origin: EOrigin.Controller,
				message: 'Error occurred while fetching all students',
				// subError?: string,
				originalError: error as Error
				// details: any,
			});
		}
	}

	public async createUser({ ctx }: { ctx: Context }): Promise<void> {
		this.info({
			message: 'Request for create a student',
			requestId: ctx.state.requestId,
			details: {
				// id: cts.socket.remoteAddress,
				id: ctx.socket.remoteAddress
			}
		});

		try {
			const data: CreateStudentDto = ctx.state.validatedData;

			const newUser = await this.studentService.createOneStudent({
				ctx,
				dto: data
			});

			this.sendResponse({
				ctx,
				data: {
					userId: newUser._id
				},
				dataToSend: newUser,
				message: 'User created successfully',
				status: EHttpSuccessStatus.Created
			});
		} catch (error: unknown) {
			if (error instanceof AppError) {
				if (error.origin === EOrigin.Controller) {
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
				message: 'Error occurred while fetching user by email',
				details: {
					error: error
				}
			});
			throw new AppError({
				name: 'Unknown error',
				statusCode: EHttpServerErrorStatus.InternalServerError,
				origin: EOrigin.Controller,
				message: 'Error occurred while fetching user by email',
				// subError?: string,
				originalError: error as Error
				// details: any,
			});
		}
	}
}
