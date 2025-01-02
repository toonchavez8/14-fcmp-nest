import { Injectable } from '@nestjs/common';

@Injectable() // Marks this class as a provider that can be injected into other parts of the application
export class DevConfigService {
	// Property to store the database host
	DBHOST = 'localhost';

	// Method to retrieve the database host
	getDBHost() {
		return this.DBHOST;
	}
}
