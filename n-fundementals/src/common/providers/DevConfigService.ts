import { Injectable } from '@nestjs/common';

@Injectable()
export class DevConfigService {
	// Property to store the database host
	DBHOST = 'localhost';

	// Method to retrieve the database host
	getDBHost() {
		return this.DBHOST;
	}
}
