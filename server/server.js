require("dotenv").config({ path: "./.env" });

const express = require("express");
const cors = require("cors");

const app = express();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.static("../client"));
app.use(express.json());
app.use(cors());

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
  console.log(`Node server listening at http://localhost:5252`)
);

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const app = express();

// const jsonParser = bodyParser.json();

// require("dotenv").config({ path: "./.env" });

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// app.use(cors());

// app.post("/create-checkout-session", jsonParser, async (req, res) => {
//   try {

//     const params = {
//       submit_type: 'pay',
//       mode: 'payment',
//       payment_method_types: ['card'],
//       billing_address_collection: 'auto',
//       shipping_options: [
//         { shipping_rate: 'shr_1Lj242Af5D9mxr02BJIUTxCF' },
//         { shipping_rate: 'shr_1Lj25EAf5D9mxr02Q0UkTz5U' },
//       ],
//       line_items: req.body.map((cartItem) => {
//         const img = cartItem.storedProduct.image[0].asset.url;

//         return {
//           price_data: {
//             currency: 'eur',
//             product_data: {
//               name: cartItem.storedProduct.name,
//               images: [img],
//             },
//             unit_amount: Number(cartItem.storedProduct.price) * 100,
//           },
//           adjustable_quantity: {
//             enabled: true,
//             minimum: 1,
//           },
//           quantity: cartItem.count
//         }
//       }),
//       success_url: `${req.headers.origin}/checkout/summary`,
//       cancel_url: `${req.headers.origin}/checkout/?canceled=true`,
//     }

//     const session = await stripe.checkout.sessions.create(params);
//     // res.redirect(303, session.url);
//     res.status(200).json(session);

//   } catch (error) {
//     console.log({ error, body: req.body });
//     res.status(400).json({ 'Failed': error });
//   }
// });

// app.listen(5252, () =>
//   console.log(`Node server listening at http://localhost:5252`)
// );

