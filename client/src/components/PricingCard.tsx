import { useState } from "react";

interface Props {
  title: string;
  price: string;
  amount: string;
  duration: string;
  features: string[];
  color: "blue" | "green" | "orange";
  phone: string;
  consent: boolean;
}

export function PricingCard({ title, price, amount, phone, consent }: Props) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount, phone })
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <button onClick={handleCheckout}>
      {loading ? "Loading..." : `Pagar ${price}`}
    </button>
  );
}
