const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51JDadrSIynWpvHmn4rGb0FnDhRXDcAbEDTHq4Ry1nx8MsSyez3TvLlottsvSssSSjpV2OZk8Ba4o5TouG65JO5H500hx9JVJvw");

const app = express();

const port = process.env.PORT || 80;

app.use(cors({ origin: true }));
app.use(express.json());

app.post('/payments/create',async (req, res) => {
    const total = req.query.total;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "inr",
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
})

app.listen(port, () => console.log(`Server is listening on port ${port}`));