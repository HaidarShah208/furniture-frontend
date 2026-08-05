"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Check,
  MessageSquare,
} from "lucide-react";
import Container from "@/components/common/Container";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ScrollProgress from "@/components/common/ScrollProgress";
import BackToTop from "@/components/common/BackToTop";
import Newsletter from "@/components/home/Newsletter";
import Breadcrumb from "@/components/product/Breadcrumb";
import LuxuryInput from "@/components/common/Input";
import LuxuryTextarea from "@/components/common/Textarea";
import LuxurySelect from "@/components/common/Select";

const showrooms = [
  {
    city: "New York",
    address: "350 Fifth Avenue, Suite 4200",
    area: "Manhattan, NY 10118",
    phone: "+1 (212) 555-0100",
    hours: "Mon – Sat: 10am – 7pm",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1838!2d-73.9857!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMDguNSJX!5e0!3m2!1sen!2sus!4v1",
  },
  {
    city: "Los Angeles",
    address: "8500 Beverly Boulevard",
    area: "West Hollywood, CA 90048",
    phone: "+1 (310) 555-0200",
    hours: "Mon – Sat: 10am – 8pm",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7!2d-118.3695!3d34.0762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA0JzM0LjMiTiAxMTjCsDIyJzEwLjIiVw!5e0!3m2!1sen!2sus!4v1",
  },
  {
    city: "London",
    address: "158–162 New Bond Street",
    area: "Mayfair, London W1S 2UB",
    phone: "+44 (20) 7946 0300",
    hours: "Mon – Sat: 10am – 6pm",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.0!2d-0.1465!3d51.5128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzQ2LjEiTiAwwrAwOCc0Ny40Ilc!5e0!3m2!1sen!2suk!4v1",
  },
];

const subjectOptions = [
  { value: "general", label: "General Inquiry" },
  { value: "order", label: "Order Support" },
  { value: "custom", label: "Custom Design" },
  { value: "trade", label: "Trade Programme" },
  { value: "press", label: "Press & Media" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email required";
    if (!form.subject) errs.subject = "Please select a subject";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
      }, 4000);
    }
  };

  const update = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  return (
    <main>
      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <section className="bg-luxury-muted-bg pt-28 pb-16 lg:pt-32 lg:pb-20">
        <Container>
          <Breadcrumb items={[{ label: "Contact" }]} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 max-w-2xl"
          >
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
              Get In Touch
            </span>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-luxury-dark md:text-4xl lg:text-5xl">
              We&apos;d Love to Hear From You
            </h1>
            <p className="text-base leading-relaxed text-luxury-muted md:text-lg">
              Whether you have a question, need design advice, or want to explore our collections — our team is here to help.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl border border-luxury-border bg-white p-6 lg:p-8 luxury-shadow">
                <div className="mb-6 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-luxury-gold" />
                  <h2 className="text-lg font-bold text-luxury-dark">Send a Message</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <LuxuryInput
                      label="First Name"
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      error={errors.firstName}
                    />
                    <LuxuryInput
                      label="Last Name"
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      error={errors.lastName}
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <LuxuryInput
                      label="Email Address"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      error={errors.email}
                    />
                    <LuxuryInput
                      label="Phone (Optional)"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                  </div>
                  <LuxurySelect
                    label="Subject"
                    value={form.subject}
                    onChange={(val) => update("subject", val)}
                    error={errors.subject}
                    options={subjectOptions}
                    placeholder="Select a subject"
                  />
                  <LuxuryTextarea
                    label="Message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    error={errors.message}
                    rows={5}
                    placeholder="Tell us how we can help..."
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={submitted}
                    className="inline-flex items-center gap-2 rounded-lg bg-luxury-dark px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-luxury-gold disabled:opacity-70"
                  >
                    {submitted ? (
                      <>
                        <Check className="h-4 w-4" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6 lg:col-span-2"
            >
              <div className="rounded-2xl border border-luxury-border bg-white p-6 luxury-shadow">
                <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-luxury-dark">Contact Information</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-luxury-gold/10">
                      <Phone className="h-4 w-4 text-luxury-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-luxury-dark">Phone</p>
                      <p className="text-sm text-luxury-secondary">+1 (800) LUXE-000</p>
                      <p className="text-[10px] text-luxury-muted">Mon – Sat, 9am – 6pm EST</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-luxury-gold/10">
                      <Mail className="h-4 w-4 text-luxury-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-luxury-dark">Email</p>
                      <p className="text-sm text-luxury-secondary">hello@luxe-furniture.com</p>
                      <p className="text-[10px] text-luxury-muted">We reply within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-luxury-gold/10">
                      <Clock className="h-4 w-4 text-luxury-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-luxury-dark">Business Hours</p>
                      <p className="text-sm text-luxury-secondary">Monday – Saturday</p>
                      <p className="text-[10px] text-luxury-muted">9:00 AM – 6:00 PM EST</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-luxury-border bg-luxury-dark p-6">
                <h3 className="mb-2 text-sm font-bold text-white">Trade Programme</h3>
                <p className="mb-4 text-xs leading-relaxed text-white/60">
                  Interior designers, architects, and hospitality professionals — access exclusive pricing and priority production.
                </p>
                <a
                  href="mailto:trade@luxe-furniture.com"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-luxury-gold transition-colors hover:text-luxury-gold-hover"
                >
                  trade@luxe-furniture.com
                </a>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Showrooms */}
      <section className="border-t border-luxury-border py-16 lg:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 max-w-2xl"
          >
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
              Visit Us
            </span>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-luxury-dark md:text-3xl">
              Our Showrooms
            </h2>
            <p className="text-base leading-relaxed text-luxury-muted">
              Experience our collections in person. Book an appointment for a personalised tour with a design consultant.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {showrooms.map((showroom, index) => (
              <motion.div
                key={showroom.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden rounded-2xl border border-luxury-border bg-white luxury-shadow"
              >
                <div className="aspect-video w-full">
                  <iframe
                    src={showroom.mapUrl}
                    className="h-full w-full border-0 grayscale"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${showroom.city} showroom map`}
                  />
                </div>
                <div className="p-5">
                  <h3 className="mb-3 text-base font-bold text-luxury-dark">{showroom.city}</h3>
                  <div className="space-y-2 text-sm text-luxury-secondary">
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-luxury-gold" />
                      <div>
                        <p>{showroom.address}</p>
                        <p>{showroom.area}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-luxury-gold" />
                      <p>{showroom.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-luxury-gold" />
                      <p>{showroom.hours}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <Newsletter />
      <Footer />
      <BackToTop />
    </main>
  );
}
