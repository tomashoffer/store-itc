var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var cookieParser = require('cookie-parser');
var fs = require("fs");
var morgan = require('morgan');
// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(express.static('public'));
// IMPORT ROUTES FILES
var userRoute = require('./routes/userRoutes');
var productRoute = require('./routes/porductRoutes');
var cartRoute = require('./routes/cartRoutes');
// ROUTES
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);
app.listen(port, function () { console.log('listen on 3000'); });
