"use client";

import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import Accordion from "@/components/common/Accordion";
import type { AccordionItemData } from "@/types/common";

const faqItems: AccordionItemData[] = [
  {
    id: "faq-1",
    title: "What makes LUXE furniture different from other brands?",
    content: "Every LUXE piece is handcrafted by master artisans using sustainably sourced, premium materials. We never mass-produce — each item undergoes a rigorous 47-point quality inspection. Our furniture is designed to last generations, not seasons, combining timeless European craftsmanship with modern comfort engineering.",
  },
  {
    id: "faq-2",
    title: "How long does delivery take?",
    content: "Standard collection pieces are delivered within 2–4 weeks via our complimentary white-glove delivery service. Custom and bespoke orders typically require 6–10 weeks. Our team handles delivery, assembly, and placement in your room of choice, removing all packaging materials.",
  },
  {
    id: "faq-3",
    title: "Can I customize my furniture?",
    content: "Absolutely. Our bespoke service allows you to choose from hundreds of materials, finishes, and dimensions. Schedule a consultation — either in our showroom or virtually — and our design team will guide you through the process from concept to delivery.",
  },
  {
    id: "faq-4",
    title: "What is your warranty and return policy?",
    content: "All LUXE furniture comes with a lifetime structural warranty and a 5-year materials warranty. We offer a 30-day satisfaction guarantee — if you're not completely delighted, we'll arrange a return with full refund. Custom orders are covered by the same structural warranty.",
  },
  {
    id: "faq-5",
    title: "Do you offer interior design consultation?",
    content: "Yes. Our in-house design team offers complimentary space planning and consultation for orders over $5,000. For full interior projects — residential, hospitality, or commercial — we provide end-to-end design services including 3D visualization, material sourcing, and installation management.",
  },
  {
    id: "faq-6",
    title: "How do I care for my furniture?",
    content: [
      "Dust wooden surfaces weekly with a soft microfiber cloth",
      "Condition leather every 6 months with a pH-balanced cream",
      "Keep away from direct sunlight to preserve finishes",
      "Use coasters and trivets to protect surfaces",
      "Contact our care team for specific material guidance",
    ],
  },
];

export default function FAQ() {
  return (
    <section className="bg-luxury-white py-24 lg:py-32">
      <Container>
        <SectionHeading
          subtitle="Questions & Answers"
          title="Frequently Asked"
          description="Everything you need to know about ordering, delivery, and caring for your LUXE furniture."
        />

        <div className="mx-auto max-w-3xl">
          <Accordion items={faqItems} defaultOpenId="faq-1" />
        </div>
      </Container>
    </section>
  );
}
