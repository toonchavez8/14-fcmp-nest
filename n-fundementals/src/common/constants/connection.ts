export type Connection = {
	CONNECTION_STRING: string;
	DB: string;
	DBNAME: string;
};

export const Connection: Connection = {
	CONNECTION_STRING: 'mongodb://localhost:27017',
	DB: 'nest-test',
	DBNAME: 'songs',
};
