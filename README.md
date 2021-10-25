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

# production mode
$ npm run start:prod
```

## POC Overview

For local demo of Lambda functions handling SQS events within this POC, please see: https://github.com/paulbackhouse/serverless-lambda

This POC provides an example of the following

- Code design, thin controllers, Dependency injection (decoupling), business services, repository pattern
- class-validator https://github.com/typestack/class-validator
- Automapper NestJs https://automapperts.netlify.app/docs/introduction/what-why & https://automapperts.netlify.app/docs/nestjs
- Logging, best practise https://blog.bitsrc.io/logging-best-practices-for-node-js-applications-8a0a5969b94c 
- typegoose https://typegoose.github.io/typegoose/docs/guides/quick-start-guide/
- mongosh, how to import data into mongoDb using shell scripts witih mongosh https://docs.mongodb.com/mongodb-shell/install/
- Docker: Local SN, although currently not workiing as expected https://github.com/s12v/sns
- Docker: Local SQS https://github.com/roribio/alpine-sqs
- Docker: Local Lambda, see https://github.com/paulbackhouse/serverless-lambda for connecting project

## Prerequisites

You will need to install the docker containers mentioned above before

```bash
# mongo
docker pull mongo
docker run --name mongodb -d mongo


# local sns
# you can specify a db.json file in your root for the docker container to run using local config
# see
docker run -d -p 9911:9911 -v "$PWD{path_from_your_root_dir_locally_to_db.json}":/etc/sns s12v/sns

```



