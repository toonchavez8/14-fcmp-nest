export type ConnectionType = {
	CONNECTION_STRING: string;
	DB: string;
	DBNAME: string;
};

export const CONNECTION: ConnectionType = {
	CONNECTION_STRING: 'mongodb://localhost:27017',
	DB: 'nest-test',
	DBNAME: 'songs',
};
