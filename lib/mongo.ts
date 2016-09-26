import { ValueProvider, FactoryProvider } from '@angular/core';

import * as mongodb from 'mongodb';

/**
 * Provides a connection to MongoDB via dependency injection, using the given token `dbClass` as 
 * the injection token.
 */
export function mongoProvider(dbClass : any, url? : string): Promise<ValueProvider> {
	return internalMongoProvider(dbClass, url);
}

/**
 * Lets you provide a mongodb.Collection to dependency injection. Provides a string token 
 * which you must inject with @Inject('mongo:collectionName'). You can override the key with 
 * the optional third parameter.
 */
export function mongoCollection(dbClass : any, collectionName : string, token? : string): FactoryProvider {
	token = token || `mongo:${collectionName}`;

	return {
		provide: token,
		useFactory: (db : mongodb.Db) => {
			return db.collection(collectionName);
		},
		deps: [dbClass]
	}
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