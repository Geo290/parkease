require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const clientRoutes = require('./routes/client.routes');
const { run, stop } = require('./config/db');

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('api/v1/client', clientRoutes);

run()
    .then(() => {
        const server = app.listen(port, () => {
            console.log(`SERVER IS LISTENING ON PORT ${port}`);
        });

        process.on('SIGTERM', () => stop(server));
        process.on('SIGINT', () => stop(server));
    })
    .catch(console.error);