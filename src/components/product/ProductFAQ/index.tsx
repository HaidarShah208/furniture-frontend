"use client";

import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import Accordion from "@/components/common/Accordion";
import type { AccordionItemData } from "@/types/common";

const productFaqItems: AccordionItemData[] = [
  {
    id: "pfaq-1",
    title: "What is the estimated delivery time?",
    content: "Standard delivery takes 2–4 weeks depending on your location. Custom and bespoke orders require 6–10 weeks. All deliveries include complimentary white-glove service with assembly and placement.",
  },
  {
    id: "pfaq-2",
    title: "Can I see this product in person before purchasing?",
    content: "Yes. Visit any of our showrooms to experience our furniture first-hand. You can also schedule a private appointment with one of our design consultants for a personalized viewing.",
  },
  {
    id: "pfaq-3",
    title: "What if I'm not satisfied with my purchase?",
    content: "We offer a 30-day satisfaction guarantee. If you're not completely delighted, we'll arrange a full-service return with complete refund. Custom orders are covered by our structural warranty.",
  },
  {
    id: "pfaq-4",
    title: "Are there any customization options available?",
    content: "Most pieces can be customized in terms of material, finish, size, and upholstery. Contact our design team to discuss your specific requirements and receive a custom quote.",
  },
  {
    id: "pfaq-5",
    title: "How do I care for this product?",
    content: "Specific care instructions are included in the Details tab above. Generally, dust regularly with a microfiber cloth, keep away from direct sunlight, and use appropriate conditioners for leather or wood as recommended.",
  },
];

export default function ProductFAQ() {
  return (
    <section className="bg-luxury-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          subtitle="Have Questions?"
          title="Product FAQ"
          description="Common questions about this product, ordering, and delivery."
        />
        <div className="mx-auto max-w-3xl">
          <Accordion items={productFaqItems} defaultOpenId="pfaq-1" />
        </div>
      </Container>
    </section>
  );
}
