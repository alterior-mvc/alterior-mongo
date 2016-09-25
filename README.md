# Alterior MongoDB Support

Use this package if you want to connect to MongoDB from your [Alterior](https://github.com/alterior-mvc/alterior-core) application.

```
npm i mongodb @alterior/mongo
```

Now use `mongoProvider` to inject an instance of `mongodb.Db` into your application:

```
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

```
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