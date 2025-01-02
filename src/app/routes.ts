// src/app/routes.ts

// ! own
// framework
import { RouterManager } from '@framework';
// modules
// import { AuthRouter } from '@modules/auth';
import { StudentRouter } from '@modules/student';
// import { TeacherRouter } from '@modules/teacher';

const routerManager = new RouterManager();

// Регистрируем все роутеры
routerManager.addRouters([
	// AuthRouter,
	StudentRouter
]);

export { routerManager };
