// Home.tsx
import { Navbar } from "@/components/Navbar";
import { PricingCard } from "@/components/PricingCard";
import { Phone, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"success" | "canceled" | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setPaymentStatus("success");
      const ph = params.get("phone");
      if (ph) setPhone(ph);
      window.history.replaceState({}, "", "/");
    } else if (params.get("canceled") === "true") {
      setPaymentStatus("canceled");
      window.history.replaceState({}, "", "/");
    }
  }, []);

  return (
    <div>
      <Navbar />

      <h1>InglesPower</h1>

      <Input
        placeholder="Tu número"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <PricingCard
        title="Plan"
        price="$2"
        amount="2.00"
        duration="5 min"
        features={["Test"]}
        color="blue"
        phone={phone}
        consent={consent}
      />
    </div>
  );
}
