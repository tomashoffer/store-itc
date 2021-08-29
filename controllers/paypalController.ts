export {};
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AZCmPT28z6IUeZHoXnDkxbdIHB2tEM_5rh3Ke32YLYlZe90Xl7Fz9tX5A-hqyT_XUobxi5zVOhqhW1OT',
    'client_secret': 'EGBWjVlUYeRC7g8VDmau_o6cs6ry14LR1TSJu3vtvyU7K5_U6689YDmKYWBxMcrZaakk0Buoa_mOnYS5'
  });
  


export function createPayment(req: any, res: any){
    const currentTotal = req.params.currentTotal;
    console.log('este es el total: ' + currentTotal)
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3000/thankYou.html",
          "cancel_url": "http://localhost:3000/paypal/cancel.html"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Red Sox Hat",
                  "sku": "001",
                  "price": `${currentTotal}`,
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": `${currentTotal}`
          },
          "description": "T-shirt from Front End Store"
      }]
  };
  try{
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        payment.links.forEach((link)=>{
            if(link.rel === 'approval_url'){
                console.log(link.href)
                res.send(link.href);
            }
        })
    }
  });
    }catch(e){
        console.log(e);
        res.send(e)
    }
  }


  export function succesPayment(req: any, res: any){
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
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
      } else {
          console.log(JSON.stringify(payment));
          res.send('Success');
      }
  });
  };

  export function cancelPayment(req: any, res: any){
        res.send('Cancelled');
  }
