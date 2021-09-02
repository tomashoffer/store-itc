var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var cookieParser = require('cookie-parser');
var fs = require("fs");
var corsOptions = { origin: '*' };
var cors = require("cors");
var morgan = require('morgan');
var paypal = require('paypal-rest-sdk');
// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(cors(corsOptions));
app.use(express.static('public'));
// IMPORT ROUTES FILES
var userRoute = require('./routes/userRoutes');
var productRoute = require('./routes/porductRoutes');
var cartRoute = require('./routes/cartRoutes');
var paypalRoute = require('./routes/paypalRoutes');
// ROUTES
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);
app.use('/paypal', paypalRoute);
app.listen(port, function () { console.log('listen server on 3000'); });
