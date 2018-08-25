# MyLocation Backend API.

Backend of location services implemented in node using mongoose, restify and karma testing framework.

## Introduction

This project was build by Yeoman generator tool.It generates a basic RESTful CRUD API service, a Node application, based on [Node.js](https://nodejs.org), [Restify](http://restify.com), and [MongoDB](https://www.mongodb.com).

According to their website, Restify, used most notably by [Netflix](http://techblog.netflix.com/2014/11/nodejs-in-flames.html), borrows heavily from [Express](http://expressjs.com). However, while Express is targeted at browser applications, with templating and rendering, Restify is keenly focused on building API services that are maintainable and observable.

Along with Node, Restify, and MongoDB, the project also implements the following packages: [Bunyan](https://github.com/trentm/node-bunyan) (includes [DTrace](http://dtrace.org/blogs/about/) support), [Jasmine](https://github.com/mhevery/jasmine-node) (using [jasmine-node](https://github.com/mhevery/jasmine-node)), [Mongoose](http://mongoosejs.com/index.html), and [Grunt](http://gruntjs.com).

Portions of this project's file structure and code are derived from what I consider the best parts of several different projects, including [generator-express](https://github.com/expressjs/generator), [generator-restify-mongo](https://github.com/lawrence-yu/generator-restify-mongo), and [generator-restify](https://github.com/chris-l/generator-restify).

## Installation

To begin, download node application sources from github

```shell
git co https://github.com/afinana/myloc-backend

```

Previous command generates directory structure, copying required files, and running 'npm install' to load the npm package dependencies.


## Using the Generated Application

Next, import the supplied set of sample widget documents into the local development instance of MongoDB from the supplied 'data/data.json' file.

```bash
NODE_ENV=development grunt mongoimport --verbose
```

This application contains configuration for three typical environments: 'Development' (default), 'Test', and 'Production'. If you want to import the sample widget documents into your Test or Production instances of MongoDB, first change the 'NODE_ENV' environment variable value.

```bash
NODE_ENV=production grunt mongoimport --verbose
```

To start the application in a new terminal window, use the following command.

```bash
npm start
```

To test the application, using jshint and the jasmine-node module, the sample documents must be imported into MongoDB and the application must be running (see above). To test the application, open a separate terminal window, and use the following command.

```bash
npm test
```

The project contains a set of jasmine-node tests, split between the '/widgets' and the '/utils' endpoints. If the application is running correctly, you should see the test results displayed in the terminal window.

Similarly, the following command displays a code coverage report, using the grunt, mocha, istanbul, and grunt-mocha-istanbul node modules.

```bash
grunt coverage
```

Grunt uses the grunt-mocha-istanbul module to execute the same set of jasmine-node tests. Based on those tests, the application's code coverage (statement, line, function, and branch coverage) is displayed.

You may test the running application, directly, by cURLing the '/widgets' endpoints.

```bash
curl -X GET -H "Accept: application/json" "http://localhost:3000/widgets"
```

For more legible output, try [HTTPie](https://httpie.org/) or [prettyjson](https://www.npmjs.com/package/prettyjson).

```bash
brew install httpie
http http://localhost:3000/widgets
http http://localhost:3000/widgets/SVHXPAWEOD
```

```bash
npm install -g prettyjson
curl -X GET -H "Accept: application/json" "http://localhost:3000/widgets" --silent | prettyjson
curl -X GET -H "Accept: application/json" "http://localhost:3000/widgets/SVHXPAWEOD" --silent | prettyjson
```

A much better RESTful API testing solution is [Postman](https://www.getpostman.com/). Postman provides the ability to individually configure each environment and abstract that environment-specific configuration, such as host and port, from the actual HTTP requests.

## API REST Endpoints

The scaffolded application includes the following endpoints.

```javascript
# widget resources
var PATH = '/widgets';
server.get({path: PATH, version: VERSION}, findDocuments);
server.get({path: PATH + '/:product_id', version: VERSION}, findOneDocument);
server.post({path: PATH, version: VERSION}, createDocument);
server.put({path: PATH, version: VERSION}, updateDocument);
server.del({path: PATH + '/:product_id', version: VERSION}, deleteDocument);

# utility resources
var PATH = '/utils';
server.get({path: PATH + '/ping', version: VERSION}, ping);
server.get({path: PATH + '/health', version: VERSION}, health);
server.get({path: PATH + '/info', version: VERSION}, information);
server.get({path: PATH + '/config', version: VERSION}, configuraton);
server.get({path: PATH + '/env', version: VERSION}, environment);
```

## Widget

The Widget is the basic document object used throughout the application. It is used, primarily, to demonstrate Mongoose's [Model](http://mongoosejs.com/docs/models.html) and [Schema](http://mongoosejs.com/docs/guide.html). The Widget object contains the following fields, as shown in the sample widget, below.

```json
{
  "product_id": "4OZNPBMIDR",
  "name": "Fapster",
  "color": "Orange",
  "size": "Medium",
  "price": "29.99",
  "inventory": 5
}
```

## MongoDB

Use the [mongo shell](https://docs.mongodb.com/manual/mongo/) to access the application's MongoDB instance and display the imported sample documents.

```text
mongo
 > show dbs
 > use node-restify-mongodb-development
 > show tables
 > db.widgets.find()
  { "_id" : ObjectId("574cf9bb0f515d7c67a87026"), "product_id" : "4OZNPBMIDR", "name" : "Fapster", "color" : "Orange", "size" : "Medium", "price" : "29.99", "inventory" : 5 }
  { "_id" : ObjectId("574cf9bb0f515d7c67a87027"), "product_id" : "SVHXPAWEOD", "name" : "Voonex", "color" : "Green", "size" : "Medium", "price" : "$10.99", "inventory" : 50 }
  { "_id" : ObjectId("574cf9bb0f515d7c67a87028"), "product_id" : "3YIRGZ6TDW", "name" : "Groopster", "color" : "Yellow", "size" : "Large", "price" : "$99.95", "inventory" : 100 }
  { "_id" : ObjectId("574cf9bb0f515d7c67a87029"), "product_id" : "6T2HC5MIZ9", "name" : "Chaintwist", "color" : "Purple", "size" : "Tiny", "price" : "$99.95", "inventory" : 15 }
  { "_id" : ObjectId("574cf9bb0f515d7c67a8702a"), "product_id" : "ERZ1RMJFR3", "name" : "Glozzom", "color" : "Red", "size" : "Huge", "price" : "$199.98", "inventory" : 35 }
  { "_id" : ObjectId("574cf9bb0f515d7c67a8702b"), "product_id" : "N43WV5234S", "name" : "Zapster", "color" : "Green", "size" : "Tiny", "price" : "$17.49", "inventory" : 65 }
  { "_id" : ObjectId("574cf9bb0f515d7c67a8702c"), "product_id" : "0BVCLPDZ42", "name" : "Chaintwist", "color" : "Blue", "size" : "Medium", "price" : "$89.95", "inventory" : 55 }
  { "_id" : ObjectId("574cf9bb0f515d7c67a8702d"), "product_id" : "N212QZOD9B", "name" : "Pentwist", "color" : "Yellow", "size" : "Huge", "price" : "$159.98", "inventory" : 95 }
  { "_id" : ObjectId("574cf9bb0f515d7c67a8702e"), "product_id" : "RTHGP1FCGN", "name" : "Reflupper", "color" : "Red", "size" : "Large", "price" : "$12.95", "inventory" : 25 }
  { "_id" : ObjectId("574cf9bb0f515d7c67a8702f"), "product_id" : "GKO1SFX04M", "name" : "Jukelox", "color" : "Blue", "size" : "Small", "price" : "$25.49", "inventory" : 75 }
```

## Environmental Variables

The scaffolded application relies on several environment variables to determine its environment-specific runtime configuration. If these environment variables are present, the application defaults to using the Development environment values, as shown below, in the application's 'config/config.js' file.

```javascript
var NODE_ENV   = process.env.NODE_ENV   || 'development';
var NODE_HOST  = process.env.NODE_HOST  || '127.0.0.1';
var NODE_PORT  = process.env.NODE_PORT  || 3000;
var MONGO_HOST = process.env.MONGO_HOST || '127.0.0.1';
var MONGO_PORT = process.env.MONGO_PORT || 27017;
var LOG_LEVEL  = process.env.LOG_LEVEL  || 'info';
var APP_NAME   = 'node-restify-mongodb-';
```

## Future Project TODOs

Future project enhancements include the following:

- Add filtering, sorting, field selection and paging
- Add basic HATEOAS-based response features
- Add authentication and authorization to production MongoDB instance
- Convert from out-dated jasmine-node to Jasmine?

# Docker configuration

## Docker mongodb configuration.
1. Create a mongodb image.
https://stackoverflow.com/questions/35400740/how-to-set-docker-mongo-data-volume

``` script

docker volume create mongodbdata
docker run -p 27017:27017 -v mongodbdata:/data/db mongo

```

## Optional commands
1. List docker images
``` script
docker images
```
2. Login in docker image
``` script
docker run –it mongo /bin/bash
```
