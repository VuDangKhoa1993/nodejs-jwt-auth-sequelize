const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// parse requests for content-type is application/json
app.use(bodyParser.json());
// parse request for content-type is application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models/index');
const Role = db.role;

(async () => {
    try {
        await db.sequelize.sync({ force: true });
        await db.sequelize.authenticate();
        console.log('connect to the database successfull')
    }
    catch(err) {
        console.log('error when connect to database');
        console.log(err)
    }
})();

// .then(() => {
//     // initial();
//     Role.bulkCreate([
//         { id: 1, name: 'User'},
//         { id: 2, name: 'moderator'},
//         { id: 3, name: 'admin' }
//     ]);
// });