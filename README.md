# Nest JS POC

- [Nest JS POC](#nest-js-poc)
  - [POC Overview](#poc-overview)
  - [Prerequisites](#prerequisites)
    - [MongoDB](#mongodb)
    - [Local SNS](#local-sns)
    - [Local SQS](#local-sqs)
    - [Local Seq - logging app](#local-seq---logging-app)
  - [Installation](#installation)
  - [Running the app](#running-the-app)
  - [Rest API examples](#rest-api-examples)
  - [Code of Note](#code-of-note)
    - [Types & Automapper](#types--automapper)
    - [class-validator - validating API models before hitting endpoints](#class-validator---validating-api-models-before-hitting-endpoints)
    - [API Versioning](#api-versioning)
    - [Intelligent logging](#intelligent-logging)
      - [HTTP Request/Response Logging](#http-requestresponse-logging)
    - [Generic Repository pattern](#generic-repository-pattern)
    - [JSON Schemas & Queries in separate files? Maybe...](#json-schemas--queries-in-separate-files-maybe)
    - [SQS Events](#sqs-events)
      - [Events Controllers](#events-controllers)
  - [Mongosh: Importing data via shell & Mongosh](#mongosh-importing-data-via-shell--mongosh)


<hr />

## POC Overview

For local demo of Lambda functions handling SQS events within this POC, please see: https://github.com/paulbackhouse/serverless-lambda

This POC provides an example of the following

- Code design, thin controllers, Dependency injection (decoupling), business services, repository pattern
- class-validator https://github.com/typestack/class-validator
- Automapper NestJs https://automapperts.netlify.app/docs/introduction/what-why & https://automapperts.netlify.app/docs/nestjs
- Logging, best practise https://blog.bitsrc.io/logging-best-practices-for-node-js-applications-8a0a5969b94c 
- typegoose https://typegoose.github.io/typegoose/docs/guides/quick-start-guide/
- mongosh, how to import data into mongoDb using shell scripts witih mongosh https://docs.mongodb.com/mongodb-shell/install/
- Docker: Local SNS, although currently not workiing as expected https://github.com/s12v/sns
- Docker: Local SQS https://github.com/roribio/alpine-sqs
- Docker: Local Lambda, see https://github.com/paulbackhouse/serverless-lambda for connecting project
- Example of using JSON files to stored mongo queries, potentially mongon json schemas. keeping these isolated from typescript

## Prerequisites

You will need to install the docker containers mentioned above before

### MongoDB
Connection string: https://github.com/paulbackhouse/nestjs-poc/blob/f3906f548cbd88304bae9810ee1ccd18545575db/src/shared/services/baseRespository.service.ts#L70
```bash
$ docker pull mongo
$ docker run --name mongodb -d mongo
```

### Local SNS
You can specify a db.json file in your root for the docker container to run using local config
Example: https://github.com/paulbackhouse/nestjs-poc/blob/main/misc/db.json
```bash
$ docker run -d -p 9911:9911 -v "$PWD{path_from_your_root_dir_locally_to_db.json}":/etc/sns s12v/sns
```
### Local SQS
Local url: http://localhost:9325/
```bash
$ docker run --name alpine-sqs -p 9324:9324 -p 9325:9325 -d roribio16/alpine-sqs:latest
```
### Local Seq - logging app
Local url: http://localhost:5341/
```bash
# https://docs.datalust.co/docs/getting-started-with-docker
$ docker run --name seq -d --restart unless-stopped -e ACCEPT_EULA=Y -p 5341:80 datalust/seq:latest
```

Make sure you have these containers and they are running.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Rest API examples
Using Postman, you can import the collection, see: https://github.com/paulbackhouse/nestjs-poc/blob/main/misc/NestJS%20POC.postman_collection.json

## Code of Note

### Types & Automapper

See types: https://github.com/paulbackhouse/nestjs-poc/tree/main/src/modules/user/types

Using Automapper, we can configure entities and Dtos (https://martinfowler.com/eaaCatalog/dataTransferObject.html) as relatable and mappable objects. 

The *Types* demonstrate how using the decorator @AutoMap, you can easily setup conversion from entity to Dto with a single line of code using the *Mapper* service, injected as needed, see https://github.com/paulbackhouse/nestjs-poc/blob/main/src/modules/user/services/user.service.ts, lines 50 and 54 for examples.

Automapper provides *profile* logic, whereby you can setup and configure how objects map to each other using a *profile* class, see: https://github.com/paulbackhouse/nestjs-poc/blob/main/src/modules/user/user.profile.map.ts

This is all hooked up at https://github.com/paulbackhouse/nestjs-poc/blob/main/src/modules/user/user.module.ts and in app.module.ts

### class-validator - validating API models before hitting endpoints
class-validator provides a simple, declorative way of ensuring API models sent to endpoints are validated with out the need to create business logic to perform this propety validation.

See: https://github.com/paulbackhouse/nestjs-poc/blob/main/src/modules/user/types/user.dto.ts

### API Versioning
The POC demonstrates how NestJS supports API versioning.
- See: https://github.com/paulbackhouse/nestjs-poc/blob/main/src/main.ts
- Method based versioning:  https://github.com/paulbackhouse/nestjs-poc/blob/main/src/modules/user/user.controller.ts
- Controller based versioning: https://github.com/paulbackhouse/nestjs-poc/blob/main/src/modules/events/events.controller.ts & https://github.com/paulbackhouse/nestjs-poc/blob/main/src/modules/events/events.v2.controller.ts

### Intelligent logging
This is a practise whereby using a logger services, you provide detailed steps within a process, which enables a developer (for example) to understand what code is running with what state, thus providing a quicker way of identifying the cause(es) of issue(s) in a process when bugs/errors occur.

The POC provides two logger service examples, demonstrating how to config different *app*.
See: https://github.com/paulbackhouse/nestjs-poc/blob/main/src/modules/user/user.controller.ts Lines 54 and 85

You can filter Seq logging instance using
```bash
# put in Seq search bar
name like 'Booking%'
```

#### HTTP Request/Response Logging
See: https://github.com/paulbackhouse/nestjs-poc/blob/main/src/shared/http.interceptor.ts

### Generic Repository pattern
Generic Repository pattern can be helpful when designing code (ref: https://medium.com/@erickwendel/generic-repository-with-typescript-and-node-js-731c10a1b98e)

The POC provides a very basic example of this:
- See: https://github.com/paulbackhouse/nestjs-poc/blob/main/src/modules/user/services/user.repository.service.ts
- Base: https://github.com/paulbackhouse/nestjs-poc/blob/main/src/shared/services/baseRespository.service.ts

### JSON Schemas & Queries in separate files? Maybe... 
As a concept to separate code and provide more clarity within files (potentially), *user.repository.service.ts* provides an example of how a query can be separated from the Typescript code and imported, dynamically updated with a parameter and executed. 

This proves that we could look to reduce code line sizes in files by separating queries and json schemas for MongoDB into JSON files

See: https://github.com/paulbackhouse/nestjs-poc/blob/395d010dcf1efd69deb2ab6c9f3b4943a270ad86/src/modules/user/services/user.repository.service.ts#L33

By seprating schemas and queries into JSON files which are imported, we could provide a clearer view of these objects to our developers/teams.

### SQS Events
You will need to have the project https://github.com/paulbackhouse/serverless-lambda open and running locally.

By using dependency injection and decoupling logic, the file *event.queue.service.ts* is solely responsible for publishing events (could also have subscribe logic). 

This queuing service is the only file aware of the dependency on AWS SDK. This provides a single place to maintain this logic and should, in the future we decide to use some other queuing service, we can easily replace AWS SQS with this single file and removing the AWS SQS dependency in one place.

The rest of the application (i.e. EventControllers) are unaware of AWS SQS being used, they only care about *event.queue.service.ts* and the *IEventMessage* interface.

See: https://github.com/paulbackhouse/nestjs-poc/blob/main/src/shared/services/events/event.queue.service.ts

#### Events Controllers
There are two events controllers, one raises the *hello* Lambda and the other the *goodbye* Lambda. It also demonostrates how the logging can work for raising events within a system.

See the Postman collection for */events* API calls.

## Mongosh: Importing data via shell & Mongosh
As a POC, with a view towards having *shell* files available to setup a local development environment, a data import file exists which, when run, will insert a collection of users.

See: https://github.com/paulbackhouse/nestjs-poc/tree/main/misc/data
- dbimport.sh: Shell script - all in one executor
- import-users.js: Js file which has code that performs MongoDB data calls
- users.json: The user data that is import

```bash
# change directory
cd misc/data

# run import
sh dataimport.sh

# observe terminal console output
```

The future concept could a collection of *shell* scripts which can setup local environments, for example
```bash
# starts up all required servics for local dev, i.e. everything
sh dev-start

# potentially some customisable way to start only services required?
sh dev-start --app --sns --sqs --lambda --db

# reset local data store to initial state, i.e. contains data which provides a replication of our use cases
sh dev-db-reset
```
