import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

// Define a test suite for the AppController
describe('AppController', () => {
	let appController: AppController; // Define a variable to hold the instance of the controller

	// Before each test, set up the testing module
	beforeEach(async () => {
		// Create a testing module with the AppController and AppService
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController], // Register the controller for testing
			providers: [AppService], // Provide the service dependency
		}).compile(); // Compile the testing module

		// Retrieve an instance of the controller from the testing module
		appController = app.get<AppController>(AppController);
	});

	// Define a nested test suite for the 'root' route
	describe('root', () => {
		// Test case to check if the controller returns the expected response
		it('should return "Hello World!"', () => {
			// Assert that the `getHello` method returns "Hello World!"
			expect(appController.getHello()).toBe('Hello World!');
		});
	});
});
