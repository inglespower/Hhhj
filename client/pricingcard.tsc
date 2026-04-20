import { useState } from "react";

export function PricingCard({ title, amount, phone, consent }) {
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    if (!phone || !consent) return alert("Falta número o consentimiento");

    setLoading(true);

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, phone }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={pay} disabled={loading}>
        {loading ? "Procesando..." : "Pagar"}
      </button>
    </div>
  );
}
