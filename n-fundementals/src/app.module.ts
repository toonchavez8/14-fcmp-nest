import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { SongsModule } from '@/songs/songs.module';
import { LoggerMiddleware } from '@/common/middleware/logger.middleware';
import { DevConfigService } from '@/common/providers/DevConfigService';

const devConfig = { port: 3000 };
const prodConfig = { port: 4000 };

@Module({
	imports: [SongsModule],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: DevConfigService,
			useClass: DevConfigService,
		},
		{
			provide: 'Config',
			useFactory: () => {
				return process.env.NODE_ENV === 'production'
					? prodConfig
					: devConfig;
			},
		},
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(LoggerMiddleware)
			.forRoutes({ path: 'songs', method: RequestMethod.POST });
	}
}
