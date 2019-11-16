# Alterior MongoDB Support
[![npm version](https://badge.fury.io/js/%40alterior%2Fmongo.svg)](https://badge.fury.io/js/%40alterior%2Fmongo)
[![Build Status](https://travis-ci.org/alterior-mvc/alterior-mongo.svg?branch=master)](https://travis-ci.org/alterior-mvc/alterior-mongo)
[![Join the chat at https://gitter.im/alterior-mvc/Lobby](https://badges.gitter.im/alterior-core/Lobby.svg)](https://gitter.im/alterior-mvc/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

**NOTE: This library is intended for use with Alterior 2.x. It is not 
compatible with Alterior 3.x.**

Use this package if you want to connect to MongoDB from your [Alterior](https://github.com/alterior-mvc/alterior-core) application.

## Accessing MongoDB from Alterior 

```
npm i mongodb @alterior/mongo
```

Now use `mongoProvider` to inject an instance of `mongodb.Db` into your application:

```typescript
import { AppOptions } from '@alterior/core';
import { mongoProvider } from '@alterior/mongo';
import * as mongodb from 'mongodb';

@AppOptions({
    providers: [mongoProvider(mongodb.Db)]
})
class App { 
}
```

Now, you can inject `mongodb.Db` into your controllers:

```typescript
import { Controller, Get } from '@alterior/core';
import * as mongodb from 'mongodb';

@Controller()
class SampleController {
    constructor(
        private db : mongodb.Db
    ) {
    }
    
    @Get('/stuff')
    public getStuff() {
        return this.db.collection('stuff').find().toArray();
    }
}
```

You can pass any token into `mongoProvider`, which can be used to inject multiple database connections if necessary.

## Storing Sessions in MongoDB

This package also provides a connector for storing Express sessions in MongoDB using `mongo-connect`.

```typescript
import * as mongodb from 'mongodb';
import { mongoProvider, mongoSession } from '@alterior/mongo';

@AppOptions({
	providers: [mongoProvider(mongodb.Db)]
	middleware: [mongoSession(mongodb.Db, SESSION_SECRET)]
})
export class App { }
```

You can then access and modify session data from your route methods. We recommend you make an interface representing your session data.

```typescript

interface SessionData {
	displayName : string;
	cartTotal : number;
}

@Controller()
class SampleController {
	@Get('/cart/total') 
	public get(session : SessionData) {
		return session.cartTotal;
	} 
}
```