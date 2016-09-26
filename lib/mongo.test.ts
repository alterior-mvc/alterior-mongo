import * as assert from 'assert';
import { mongoCollection, mongoProvider, internalMongoProvider, MongoClientFactory } from './mongo';
import * as mongodb from 'mongodb';

describe("mongoCollection", () => {
	it("should produce a factory provider", () => {
		let provider = mongoCollection(mongodb.Db, 'users');

		assert(provider.provide === 'mongo:users');
		assert(provider.useFactory !== null);

	});
})

describe("mongoProvider", () => {
	it("should try to connect to mongo", done => {
		class MockClientFactory implements MongoClientFactory {
			connect(url : string) {
				return <any> Promise.resolve({
					isValid: true
				});
			}
		}

		internalMongoProvider(mongodb.Db, null, new MockClientFactory())
			.then(provider => {
				assert(provider.provide === mongodb.Db);
				assert(provider.useValue && provider.useValue.isValid === true);
				done();
			});
	});
})