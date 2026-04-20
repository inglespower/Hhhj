import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { PricingCard } from "@/components/PricingCard";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("success")) {
      setPaymentStatus("success");
    }

    if (params.get("canceled")) {
      setPaymentStatus("canceled");
    }
  }, []);

  return (
    <div>
      <Navbar />

      {paymentStatus === "success" && <p>Pago exitoso ✅</p>}
      {paymentStatus === "canceled" && <p>Pago cancelado ❌</p>}

      <h1>InglesPower ⚡</h1>

      <Input
        placeholder="Tu número"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <div>
        <PricingCard title="$2 Plan" amount="2.00" phone={phone} consent={consent} />
        <PricingCard title="$4 Plan" amount="4.00" phone={phone} consent={consent} />
        <PricingCard title="$6 Plan" amount="6.00" phone={phone} consent={consent} />
      </div>
    </div>
  );
}
