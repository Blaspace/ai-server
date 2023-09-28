const stripe = require("stripe")(process.env.STRIPE_SECRIT_KEY);
const createClientSecret = async (req, res) => {
  const { amount, currency, description } = req.body;
  const intent = await stripe.paymentIntents.create({
    amount,
    currency,
    description,
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.json({ client_secret: intent.client_secret });
};

module.exports = createClientSecret;
