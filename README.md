bank_api
===========

small app to handle users transactions

to start the app:
- add .env file with the same variables in .env.example and add your own values
- make sure that you have redis already installed
- npm install
- node_modules/.bin/sequelize db:create
- node_modules/.bin/sequelize db:migrate
- node_modules/.bin/sequelize db:seed:all (to add demo users)
- node server.js

and I guess you are fine to go now :)


