const express = require('express');
const app = express();
const port = process.env.PORT || 3000 
const cookieParser = require('cookie-parser');
const fs = require("fs");

export const localJson = () => {
    const fileJson = fs.readFileSync("./db/users.json");
    return JSON.parse(fileJson);
  };

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// IMPORT ROUTES FILES

// ROUTES


app.listen(port, () => { console.log('listen on 3000') })