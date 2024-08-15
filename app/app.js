require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const membershipRoutes = require('./routes/memebership.routes');
const userRoutes = require('./routes/user.routes');
const { run, stop } = require('./config/db');

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/api/v1/membership', membershipRoutes);
app.use('/api/v1/user', userRoutes);

run()
    .then(() => {
        const server = app.listen(port, () => {
            console.log(`SERVER IS LISTENING ON PORT ${port}`);
        });

        process.on('SIGTERM', () => stop(server));
        process.on('SIGINT', () => stop(server));
    })
    .catch(console.error);