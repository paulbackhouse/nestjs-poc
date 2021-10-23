
console.log(`MongoDb: CONNECTING... to TEST`);

// connect to db test
db = connect('mongodb://localhost:27018/test');
console.info(`MongoDb: CONNECTED... to TEST`);

// load user data
users = require('./users.json');

// insert the user collection
console.info(`MongoDb: IMPORTING... User Collection: ${users.length} users to import`);

db.User.insertMany(users);
console.info(`MongoDb: IMPORTED... User Collection`);
