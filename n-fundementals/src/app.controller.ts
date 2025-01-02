import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Declares this class as a controller to handle incoming HTTP requests
export class AppController {
	constructor(private readonly appService: AppService) {
		// Injects the AppService into the controller for handling business logic
	}

	/**
	 * Handles GET requests to the root route ('/').
	 * Calls the `getHello` method from the AppService and returns its response.
	 * @returns {string} A greeting string.
	 */
	@Get()
	getHello(): string {
		return this.appService.getHello(); // Delegates logic to the AppService
	}
}
