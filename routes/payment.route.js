const express = require('express');
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01"
});

stripe.applePayDomains.create({
  domain_name: 'i-will-help-you.netlify.app'
});

router.get("/config", (req, res) => {
   res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
   });
});

router.post("/create-payment-intent", async (req, res) => {
   try {
     const paymentIntent = await stripe.paymentIntents.create({
       currency: "usd",
       amount: 2500,
       automatic_payment_methods: { enabled: true },
     });
 
     res.send({
       clientSecret: paymentIntent.client_secret,
     });
   } catch (e) {
     return res.status(400).send({
       error: {
         message: e.message,
       },
     });
   }
 });



module.exports = router;