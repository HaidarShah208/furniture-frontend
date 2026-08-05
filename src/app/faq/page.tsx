"use client";

import { motion } from "framer-motion";
import { HelpCircle, Mail } from "lucide-react";
import Link from "next/link";
import Container from "@/components/common/Container";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ScrollProgress from "@/components/common/ScrollProgress";
import BackToTop from "@/components/common/BackToTop";
import Accordion from "@/components/common/Accordion";
import Newsletter from "@/components/home/Newsletter";
import Breadcrumb from "@/components/product/Breadcrumb";
import type { AccordionItemData } from "@/types/common";

const faqSections: { title: string; icon: string; items: AccordionItemData[] }[] = [
  {
    title: "Orders & Shipping",
    icon: "📦",
    items: [
      {
        id: "os-1",
        title: "How long does delivery take?",
        content:
          "Standard collection pieces are delivered within 2–4 weeks via our complimentary white-glove delivery service. Custom and bespoke orders typically require 6–10 weeks. Our team handles delivery, assembly, and placement in your room of choice, removing all packaging materials.",
      },
      {
        id: "os-2",
        title: "Do you offer free shipping?",
        content:
          "Yes. All orders over $2,000 include free white-glove delivery within the continental United States. For orders under that threshold, a flat $150 delivery fee applies. International shipping is available — contact us for a custom quote.",
      },
      {
        id: "os-3",
        title: "Can I track my order?",
        content:
          "Absolutely. Once your order ships, you will receive an email with a tracking link. You can also track your order in real-time from your account dashboard under \"My Orders\". Our team will contact you to schedule a delivery window.",
      },
      {
        id: "os-4",
        title: "What if my item arrives damaged?",
        content:
          "Every item is inspected before dispatch and insured during transit. In the rare event of damage, contact us within 48 hours with photographs. We will arrange a replacement or full refund at no additional cost.",
      },
    ],
  },
  {
    title: "Products & Customization",
    icon: "🪑",
    items: [
      {
        id: "pc-1",
        title: "Can I customize my furniture?",
        content:
          "Absolutely. Our bespoke service allows you to choose from hundreds of materials, finishes, and dimensions. Schedule a consultation — either in our showroom or virtually — and our design team will guide you through the process from concept to delivery.",
      },
      {
        id: "pc-2",
        title: "What materials do you use?",
        content:
          "We use sustainably sourced solid hardwoods (walnut, oak, teak), premium Italian leather, natural marble, brass, and performance fabrics. Every material is selected for durability, beauty, and environmental responsibility.",
      },
      {
        id: "pc-3",
        title: "How do I care for my furniture?",
        content: [
          "Dust wooden surfaces weekly with a soft microfiber cloth",
          "Condition leather every 6 months with a pH-balanced cream",
          "Keep away from direct sunlight to preserve finishes",
          "Use coasters and trivets to protect surfaces",
          "Contact our care team for specific material guidance",
        ],
      },
    ],
  },
  {
    title: "Returns & Warranty",
    icon: "🛡️",
    items: [
      {
        id: "rw-1",
        title: "What is your return policy?",
        content:
          "We offer a 30-day satisfaction guarantee on all standard collection pieces. If you are not delighted, we will arrange a free return and issue a full refund. Items must be in original condition. Custom orders are non-returnable but are covered by our structural warranty.",
      },
      {
        id: "rw-2",
        title: "What does the warranty cover?",
        content:
          "All LUXE furniture comes with a lifetime structural warranty and a 5-year materials warranty. This covers manufacturing defects, joint failure, and frame integrity. Normal wear, misuse, and exposure to extreme conditions are not covered.",
      },
      {
        id: "rw-3",
        title: "Do you offer a repair service?",
        content:
          "Yes. Our in-house craftsmen provide a professional repair and refinishing service for all LUXE pieces, regardless of age. Contact our care team for an assessment and quote.",
      },
    ],
  },
  {
    title: "Design Services",
    icon: "✏️",
    items: [
      {
        id: "ds-1",
        title: "Do you offer interior design consultation?",
        content:
          "Yes. Our in-house design team offers complimentary space planning and consultation for orders over $5,000. For full interior projects — residential, hospitality, or commercial — we provide end-to-end design services including 3D visualization, material sourcing, and installation management.",
      },
      {
        id: "ds-2",
        title: "Can I visit your showroom?",
        content:
          "We have showrooms in New York, Los Angeles, and London. Walk-ins are welcome, but we recommend booking an appointment for a personalised experience with a dedicated design consultant.",
      },
      {
        id: "ds-3",
        title: "Do you work with trade professionals?",
        content:
          "Yes. Our Trade Programme offers exclusive pricing, dedicated account management, COM/COL options, and priority production timelines. Apply through our website or contact our trade team directly.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <section className="bg-luxury-muted-bg pt-28 pb-16 lg:pt-32 lg:pb-20">
        <Container>
          <Breadcrumb items={[{ label: "FAQ" }]} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 max-w-2xl"
          >
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
              Help Center
            </span>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-luxury-dark md:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="text-base leading-relaxed text-luxury-muted md:text-lg">
              Everything you need to know about ordering, delivery, customization, and caring for your LUXE furniture.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10">
            {faqSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.08 }}
              >
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-luxury-dark">
                  <span>{section.icon}</span>
                  {section.title}
                </h2>
                <Accordion items={section.items} />
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-16 max-w-xl rounded-2xl border border-luxury-border bg-white p-8 text-center luxury-shadow"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-luxury-gold/10">
              <HelpCircle className="h-6 w-6 text-luxury-gold" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-luxury-dark">Still have questions?</h3>
            <p className="mb-6 text-sm text-luxury-muted">
              Our team is here to help. Reach out and we&apos;ll get back to you within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-luxury-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-luxury-gold"
            >
              <Mail className="h-4 w-4" />
              Contact Us
            </Link>
          </motion.div>
        </Container>
      </section>

      <Newsletter />
      <Footer />
      <BackToTop />
    </main>
  );
}
