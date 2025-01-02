import { DevConfigService } from './common/providers/DevConfigService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	constructor(private readonly DevConfigService: DevConfigService) {}
	getHello(): string {
		return 'Hello World! ' + this.DevConfigService.getDBHost();
	}
}
