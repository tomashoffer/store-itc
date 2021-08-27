const express = require('express');
const app = express();
const port = process.env.PORT || 3000 
const cookieParser = require('cookie-parser');
const fs = require("fs");
const morgan = require('morgan');

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(express.static('public'));

// IMPORT ROUTES FILES
const userRoute = require('./routes/userRoutes');
const productRoute = require('./routes/porductRoutes');
const cartRoute = require('./routes/cartRoutes');

// ROUTES
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);


app.listen(port, () => { console.log('listen on 3000') })


