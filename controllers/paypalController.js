"use strict";
exports.__esModule = true;
exports.cancelPayment = exports.succesPayment = exports.createPayment = void 0;
var paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AZCmPT28z6IUeZHoXnDkxbdIHB2tEM_5rh3Ke32YLYlZe90Xl7Fz9tX5A-hqyT_XUobxi5zVOhqhW1OT',
    'client_secret': 'EGBWjVlUYeRC7g8VDmau_o6cs6ry14LR1TSJu3vtvyU7K5_U6689YDmKYWBxMcrZaakk0Buoa_mOnYS5'
});
function createPayment(req, res) {
    var currentTotal = req.params.currentTotal;
    console.log('este es el total: ' + currentTotal);
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/thankYou.html",
            "cancel_url": "http://localhost:3000/cancel.html"
        },
        "transactions": [{
                "item_list": {
                    "items": [{
                            "name": "Red Sox Hat",
                            "sku": "001",
                            "price": "" + currentTotal,
                            "currency": "USD",
                            "quantity": 1
                        }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "" + currentTotal
                },
                "description": "T-shirt from Front End Store"
            }]
    };
    try {
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            }
            else {
                payment.links.forEach(function (link) {
                    if (link.rel === 'approval_url') {
                        console.log(link.href);
                        res.send(link.href);
                    }
                });
            }
        });
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }
}
exports.createPayment = createPayment;
function succesPayment(req, res) {
    var payerId = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": '25'
                }
            }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        }
        else {
            console.log(JSON.stringify(payment));
            res.send('Success');
        }
    });
}
exports.succesPayment = succesPayment;
;
function cancelPayment(req, res) {
    res.send('Cancelled');
}
exports.cancelPayment = cancelPayment;
