import type { Express } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export function registerRoutes(app: Express) {

  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { amount, phone } = req.body;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "InglesPower",
              },
              unit_amount: Math.round(parseFloat(amount) * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:5000?success=true",
        cancel_url: "http://localhost:5000?canceled=true",
      });

      res.json({ url: session.url });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

}
