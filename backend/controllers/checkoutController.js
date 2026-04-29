const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// @desc    Create Stripe checkout session
// @route   POST /api/checkout/create-session
// @access  Private
const createCheckoutSession = async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: order.orderItems.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    })),
    mode: 'payment',
    success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/order/${order._id}?success=true`,
    cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/order/${order._id}?canceled=true`,
    metadata: {
      orderId: order._id.toString(),
    },
  });

  res.json({ id: session.id, url: session.url });
};

module.exports = {
  createCheckoutSession,
};
