# Vyra API

API Rest para Vyra Project

Esta aplicación esta basada en el started barebones heroku para Node.js usando [Express 4](http://expressjs.com/).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://gitlab.com/vyra/vyra-api # or clone your own fork
$ cd vyra-api
$ npm install
$ npm start
```

La aplicación debería correr sobre [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku main
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation sobre Heroku

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)

## Varaibles de entorno

Vyra API requiere un conjunto de variables de entrono definidas para generar el token, obtener rutas de recursos y definir las cuentas de usuario

Las variables requeridas son:

``` js
NODE_ENV=prod
TOKEN_SECRET=token_de_prueba
EXPIRE_JWT=86400

ACCOUNT_USERNAME_BLACK=nombre del usuario administrador
ACCOUNT_PASSWORD_BLACK=password del usuario administrador
ACCOUNT_USERNAME_RED=nombre de usuario 1
ACCOUNT_PASSWORD_RED=password de usuario 1
ACCOUNT_USERNAME_BLUE=nombre de usuario 2
ACCOUNT_PASSWORD_BLUE=password de usuario 2

UID=vyraproject

DATABASE_URL=definido como lo requiere heroku
```