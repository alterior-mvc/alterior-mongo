import { Inject } from '@angular/core';
import { Middleware } from '@alterior/core';
import * as express from 'express';
import * as mongodb from 'mongodb';

const session = require("express-session"); 

/**
 * Return a middleware that will retrieve and persist session data 
 * using MongoDB. By default, this will use the default MongoDB 
 * connection (see mongoProvider), but you can override the token
 * of the database as necessary.
 */
export function mongoSession(sessionSecret : string, dbToken? : any) : Function {

	@Middleware()
	class MongoSession {

		constructor(
			@Inject(dbToken) private db : mongodb.Db
		) {
		}

		handle(req : express.Request, res : express.Response, next : Function) {
			//(sessionSecret : string)
			const MongoStore = require('connect-mongo')(session);
			return session({
				secret: sessionSecret,
				store: new MongoStore({
					db: this.db
				})
			});
		}
	}
	
	dbToken = dbToken || mongodb.Db;
	return <any>MongoSession;

}