const express = require("express");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 5252;

const app = express();

if (process.env.NODE_ENV !== 'production') require('dotenv').config({ path: "../client/.env" });

const stripe = require("stripe")(process.env.VITE_STRIPE_SECRET_KEY);

app.use(express.static(process.env.VITE_STATIC_DIR));
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
};

const calculateOrderAmount = (cartItems) => {
  const amount = cartItems.reduce((acc, cartItem) => (cartItem.count * Number(cartItem.storedProduct.price)) + acc , 0);

  return Number(amount.toFixed(2)) * 100;
}

app.post("/create-payment-intent", async (req, res) => {
  const { cartItems } = req.body;

  try {

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(cartItems),
      currency: "eur",
      payment_method_types: ['card'],
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.log("Error in server: ", error);
  }
});

app.listen(5252, () =>
  console.log(`Node server listening at http://localhost:5252 ${PORT}`)
);
