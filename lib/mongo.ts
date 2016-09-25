import { ValueProvider } from '@angular/core';

import * as mongodb from 'mongodb';

/**
 * Provides a connection to MongoDB via dependency injection, using the given token `dbClass` as 
 * the injection token.
 */
export function mongoProvider(dbClass : any, url? : string): Promise<ValueProvider> {
	return internalMongoProvider(dbClass, url);
}

export function internalMongoProvider(dbClass : any, url? : string, clientFactory? : MongoClientFactory): Promise<ValueProvider> {
	clientFactory = clientFactory || new StandardClientFactory();

	if (!url)
		url = "mongodb://localhost:27017/db";
	return <Promise<any>> clientFactory.connect(url)
		.then(db => { return <ValueProvider>{
			provide: dbClass,
			useValue: db
		}; });
}

export interface MongoClientFactory {
	connect(mongoURL : string): Promise<mongodb.Db>;
}

export class StandardClientFactory implements MongoClientFactory {
	public connect(mongoURL : string): Promise<mongodb.Db> {
		return <any>mongodb.MongoClient.connect(mongoURL);
	}
}