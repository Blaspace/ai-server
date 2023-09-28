const Stripe = require("stripe");
const { estimatedDocumentCount } = require("../schema/User");

const stripe = Stripe(process.env.STRIPE_SECRIT_KEY);
const handleStripe = async (req, res) => {
  const { amount, payment_metod } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "ai image generator",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log("parment", payment);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = handleStripe;
