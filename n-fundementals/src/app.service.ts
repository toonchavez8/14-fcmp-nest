import { DevConfigService } from './common/providers/DevConfigService';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	constructor(
		private readonly DevConfigService: DevConfigService,
		@Inject('Config')
		private readonly Config: { port: number },
	) {}
	getHello(): string {
		return (
			'Hello World! ' +
			this.DevConfigService.getDBHost() +
			' ' +
			'this port ' +
			this.Config.port
		);
	}
}
