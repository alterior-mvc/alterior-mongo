import * as assert from 'assert';
import { mongoProvider, internalMongoProvider, MongoClientFactory } from './mongo';
import * as mongodb from 'mongodb';

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