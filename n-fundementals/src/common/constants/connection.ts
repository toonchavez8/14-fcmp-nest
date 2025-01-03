import { ConfigService } from '@nestjs/config';

export type Connection = {
	CONNECTION_STRING: string;
	DB: string;
	DBNAME: string;
};

export const createConnection = (configService: ConfigService): Connection => ({
	CONNECTION_STRING: `postgresql://${configService.get('DB_USER')}:${configService.get('DB_PASS')}@${configService.get('DB_HOST')}:${configService.get('DB_PORT')}/${configService.get('DB_NAME')}`,
	DB:
		configService.get('NODE_ENV') === 'production'
			? 'nest_prod'
			: 'nest_dev', // Example for dynamic DB selection
	DBNAME: configService.get('DB_NAME') || 'default_db',
});
