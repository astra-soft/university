// src/modules/student/Student.router.ts

// ! own
// framework
import { BaseRouter } from '@framework';
// interfaces
import { ERouterNameModule, ERouterUrlModule } from '@interfaces';
// middleware
import { ValidateBodyMiddleware } from '@middleware';
// modules
import { UserController, CreateStudentDto } from '@modules/student';

export class StudentRouter extends BaseRouter {
	private readonly userController: UserController = new UserController();

	constructor() {
		super(ERouterNameModule.StudentRouter, ERouterUrlModule.Students);
	}

	public defineRoutes(): void {
		this.get('/', async ctx => {
			return await this.userController.getAllUsers({ ctx });
		});

		this.post('/', ValidateBodyMiddleware(CreateStudentDto), async ctx => {
			return await this.userController.createUser({ ctx });
		});
	}
}
