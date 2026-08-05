"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/common/Container";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ScrollProgress from "@/components/common/ScrollProgress";
import BackToTop from "@/components/common/BackToTop";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import OrderSummary from "@/components/checkout/OrderSummary";
import ShippingStep, { type ShippingData } from "@/components/checkout/ShippingStep";
import DeliveryStep, { type DeliveryMethod } from "@/components/checkout/DeliveryStep";
import PaymentStep, { type PaymentData, type PaymentMethod } from "@/components/checkout/PaymentStep";
import ReviewStep from "@/components/checkout/ReviewStep";
import { useCart } from "@/hooks/useCart";

const emptyShipping: ShippingData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

const emptyPayment: PaymentData = {
  cardNumber: "",
  cardName: "",
  expiry: "",
  cvc: "",
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [shipping, setShipping] = useState<ShippingData>(emptyShipping);
  const [shippingErrors, setShippingErrors] = useState<Partial<Record<keyof ShippingData, string>>>({});

  const [delivery, setDelivery] = useState<DeliveryMethod>("standard");

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [payment, setPayment] = useState<PaymentData>(emptyPayment);
  const [paymentErrors, setPaymentErrors] = useState<Partial<Record<keyof PaymentData, string>>>({});

  const handleShippingChange = useCallback((field: keyof ShippingData, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
    setShippingErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handlePaymentChange = useCallback((field: keyof PaymentData, value: string) => {
    setPayment((prev) => ({ ...prev, [field]: value }));
    setPaymentErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const validateShipping = (): boolean => {
    const errs: Partial<Record<keyof ShippingData, string>> = {};
    if (!shipping.firstName.trim()) errs.firstName = "First name is required";
    if (!shipping.lastName.trim()) errs.lastName = "Last name is required";
    if (!shipping.email.trim()) errs.email = "Email is required";
    else if (!validateEmail(shipping.email)) errs.email = "Invalid email address";
    if (!shipping.phone.trim()) errs.phone = "Phone is required";
    if (!shipping.address.trim()) errs.address = "Address is required";
    if (!shipping.city.trim()) errs.city = "City is required";
    if (!shipping.state) errs.state = "State is required";
    if (!shipping.zip.trim()) errs.zip = "ZIP code is required";
    if (!shipping.country) errs.country = "Country is required";
    setShippingErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePayment = (): boolean => {
    if (paymentMethod !== "card") return true;
    const errs: Partial<Record<keyof PaymentData, string>> = {};
    const digits = payment.cardNumber.replace(/\s/g, "");
    if (!digits) errs.cardNumber = "Card number is required";
    else if (digits.length < 15) errs.cardNumber = "Invalid card number";
    if (!payment.cardName.trim()) errs.cardName = "Cardholder name is required";
    if (!payment.expiry.trim()) errs.expiry = "Expiry is required";
    else if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) errs.expiry = "Use MM/YY format";
    if (!payment.cvc.trim()) errs.cvc = "CVC is required";
    else if (payment.cvc.length < 3) errs.cvc = "Invalid CVC";
    setPaymentErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goNext = (currentStep: number) => {
    if (currentStep === 1 && !validateShipping()) return;
    if (currentStep === 3 && !validatePayment()) return;
    setStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    clearCart();
    router.push("/checkout/success");
  };

  if (items.length === 0 && step < 5) {
    return (
      <main>
        <Navbar />
        <section className="flex min-h-[60vh] items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="mb-3 text-2xl font-bold text-luxury-dark">Your cart is empty</h1>
            <p className="mb-6 text-sm text-luxury-muted">Add some items before checking out.</p>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 rounded-lg bg-luxury-dark px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-luxury-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              Browse Collections
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <ScrollProgress />
      <Navbar />

      <section className="pb-16 pt-28 lg:pb-24 lg:pt-32">
        <Container>
          <div className="mb-6">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-luxury-muted transition-colors hover:text-luxury-dark"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          <div className="mx-auto max-w-3xl lg:max-w-none">
            <div className="mb-8 lg:hidden">
              <CheckoutStepper currentStep={step} />
            </div>

            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="hidden lg:block">
                  <CheckoutStepper currentStep={step} />
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <ShippingStep
                      key="shipping"
                      data={shipping}
                      errors={shippingErrors}
                      onChange={handleShippingChange}
                      onNext={() => goNext(1)}
                    />
                  )}
                  {step === 2 && (
                    <DeliveryStep
                      key="delivery"
                      selected={delivery}
                      onChange={setDelivery}
                      onNext={() => goNext(2)}
                      onBack={goBack}
                    />
                  )}
                  {step === 3 && (
                    <PaymentStep
                      key="payment"
                      method={paymentMethod}
                      onMethodChange={setPaymentMethod}
                      data={payment}
                      errors={paymentErrors}
                      onChange={handlePaymentChange}
                      onNext={() => goNext(3)}
                      onBack={goBack}
                    />
                  )}
                  {step === 4 && (
                    <ReviewStep
                      key="review"
                      shipping={shipping}
                      delivery={delivery}
                      payment={payment}
                      paymentMethod={paymentMethod}
                      onPlaceOrder={handlePlaceOrder}
                      onBack={goBack}
                      isSubmitting={isSubmitting}
                    />
                  )}
                </AnimatePresence>
              </div>

              <div className="lg:col-span-5 xl:col-span-4">
                <OrderSummary />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}
