<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

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
docker pull mongo
docker run --name mongodb -d mongo
```

### Local SNS
You can specify a db.json file in your root for the docker container to run using local config
Example: https://github.com/paulbackhouse/nestjs-poc/blob/main/misc/db.json
```bash
docker run -d -p 9911:9911 -v "$PWD{path_from_your_root_dir_locally_to_db.json}":/etc/sns s12v/sns
```
### Local SQS
Local url: http://localhost:9325/
```bash
docker run --name alpine-sqs -p 9324:9324 -p 9325:9325 -d roribio16/alpine-sqs:latest
```
### Local Seq - logging app
Local url: http://localhost:5341/
```bash
# https://docs.datalust.co/docs/getting-started-with-docker
docker run --name seq -d --restart unless-stopped -e ACCEPT_EULA=Y -p 5341:80 datalust/seq:latest
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

GET users


## Code of Note

### Types & Automapper

See types: https://github.com/paulbackhouse/nestjs-poc/tree/main/src/modules/user/types

Using Automapper, we can configure entities and Dtos (https://martinfowler.com/eaaCatalog/dataTransferObject.html).

The *Types* demonstrates how using the decorator @AutoMap, you can easily setup conversion from entity to Dto with a single line of code using the *Mapper/8 service, injected as needed, see https://github.com/paulbackhouse/nestjs-poc/blob/main/src/modules/user/services/user.service.ts, lines 50 and 54 for examples.

Automapper provides *profile* logic, whereby you can setup and configure how objects map to each other using a *profile* class, see: https://github.com/paulbackhouse/nestjs-poc/blob/main/src/modules/user/user.profile.map.ts

This is all hooked up at https://github.com/paulbackhouse/nestjs-poc/blob/main/src/modules/user/user.module.ts and in app.module.ts




