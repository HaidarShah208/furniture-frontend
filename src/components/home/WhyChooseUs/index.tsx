"use client";

import { motion } from "framer-motion";
import { Gem, Paintbrush, Hammer, Truck, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";

const icons = [Gem, Paintbrush, Hammer, Truck, ShieldCheck];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function WhyChooseUs() {
  const { t, direction } = useLanguage();

  const items = [1, 2, 3, 4, 5].map((i, idx) => ({
    id: `why-${i}`,
    icon: icons[idx],
    title: t(`whyChooseUs.item${i}Title`),
    description: t(`whyChooseUs.item${i}Desc`),
  }));

  return (
    <section className="py-24 lg:py-32" dir={direction}>
      <Container>
        <SectionHeading
          subtitle={t("whyChooseUs.subtitle")}
          title={t("whyChooseUs.title")}
          description={t("whyChooseUs.description")}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-luxury-border bg-luxury-white p-7 text-center transition-all duration-500 hover:border-luxury-gold/30 luxury-shadow hover:luxury-shadow-hover"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-luxury-bg transition-colors duration-500 group-hover:bg-luxury-gold/10">
                  <Icon className="h-6 w-6 text-luxury-gold transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="mb-2.5 text-base font-bold tracking-tight text-luxury-dark">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-luxury-muted">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
