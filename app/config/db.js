require('dotenv').config();

const { connect, disconnect } = require('mongoose');

const USER = process.env.DB_USERNAME;
const PASS = process.env.DB_PASSKEY;
const DB = process.env.DB_NAME;
// const URI = `mongodb+srv://${USER}:${PASS}@cluster0.8puqbr9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const URI = 'mongodb://localhost:27017';

const run = async () => {
    try {
        await connect(URI, { dbName: DB });

        console.log("App connected to server");

    } catch (error) {
        console.error("Error while connecting to DB: ", error);
        process.exit(1);
    }
}

const stop = async (server) => {
    server.close(async (error) => {
        if (error) {
            console.error("Error while closing the server");
            process.exit(1);
        }
    });

    try {
        await disconnect();
        console.log("App successfully disconnected from DB");
        proces.exit(0);

    } catch (error) {
        console.error("Error while disconnecting from DB: ", error);
        process.exit(1);
    }
}

module.exports = { run, stop };