import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { stripe } from '../../services/stripe';

async function subscribe(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).end('Method not allowrd');
  }

  const session = await getSession({ req: request });

  const stripeCustomer = await stripe.customers.create({
    email: session.user.email,
  });

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomer.id,
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    line_items: [
      {
        price: 'price_1J6jrJFb2cChk0A1HcTZjXeH',
        quantity: 1,
      }
    ],
    mode: 'subscription',
    allow_promotion_codes: true,
    success_url: process.env.STRIPE_SUCCESS_URL,
    cancel_url: process.env.STRIPE_CANCEL_URL,
  });

  return response.status(200).json({ sessionId: stripeCheckoutSession.id });
}

export default subscribe;
