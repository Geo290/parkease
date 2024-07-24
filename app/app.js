require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(port, () => {
    console.log(`SERVER IS LISTENING ON PORT ${port}`);
});