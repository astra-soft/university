# University Management System

## Description

The **University Management System** is an application built on Koa.js designed to manage data for students and professors. The system includes functionality for authentication, user management, and robust error handling.

## Project Structure

The project is modular, making it easy to add new features and maintain the codebase. The main modules include:

- **app**: The core module of the application, responsible for initializing the server and setting up routes.
- **classes**: Defines the classes for all entities and their associated methods.
- **config**: Configuration files for the application and database.
- **errors**: Handles error mapping to HTTP statuses.
- **framework**: Contains base classes for controllers, services, and repositories to promote code reusability.
- **interfaces**: Defines TypeScript interfaces and types for strong typing across the application.
- **middleware**: Contains middleware for request/response handling, such as logging, authentication, and validation.
- **models**: Database models and schemas.
- **modules**: Feature-specific modules containing routes and business logic.
- **utils**: Utility functions and helpers used throughout the project.

## Errors

The system robustly handles various types of errors, including:

- **ValidationError**: Indicates issues with input validation.
- **NotFoundError**: Triggered when a requested resource is not found.
- **UnauthorizedError**: Indicates authentication failure.
- **DuplicateKeyError**: Triggered when a duplicate key violates database constraints.

These errors are converted to meaningful HTTP responses with appropriate status codes and messages.

## LICENSE

This project is licensed under a strict license. See the [LICENSE](LICENSE) file for more details.
