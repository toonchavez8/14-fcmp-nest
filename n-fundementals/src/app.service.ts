import { DevConfigService } from '@/common/providers/DevConfigService';
import { Inject, Injectable } from '@nestjs/common';

@Injectable() // Marks this class as a provider that can be injected into other parts of the application
export class AppService {
	constructor(
		private readonly DevConfigService: DevConfigService, // Injecting the DevConfigService to use its methods for configuration-related tasks
		@Inject('Config') // Using the @Inject decorator to inject a custom dependency identified by the token 'Config'
		private readonly Config: { port: number }, // This is an object with a `port` property, injected into the service
	) {}

	/**
	 * A simple method to return a greeting message.
	 * This message includes:
	 * - The default greeting "Hello World!"
	 * - The database host from the DevConfigService
	 * - The application port from the injected 'Config' object
	 * @returns A string containing the greeting and configuration details
	 */
	getHello(): string {
		return (
			'Hello World! |  DevConfigService says: ' +
			this.DevConfigService.getDBHost() + // Fetching the database host from the DevConfigService
			' | ' + // Separator
			'this port is: ' +
			this.Config.port // Accessing the injected port value from the Config object
		);
	}
}
