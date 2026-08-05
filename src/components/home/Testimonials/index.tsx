"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";

const avatarImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
];

const ratings = [5, 5, 5];

export default function Testimonials() {
  const { t, direction } = useLanguage();
  const [current, setCurrent] = useState(0);

  const testimonials = [1, 2, 3].map((i, idx) => ({
    id: `testimonial-${i}`,
    content: t(`testimonials.testimonial${i}`),
    name: t(`testimonials.testimonial${i}Name`),
    role: t(`testimonials.testimonial${i}Role`),
    location: t(`testimonials.testimonial${i}Location`),
    avatar: avatarImages[idx],
    rating: ratings[idx],
  }));

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 lg:py-32" dir={direction}>
      <Container>
        <SectionHeading
          subtitle={t("testimonials.subtitle")}
          title={t("testimonials.title")}
          description={t("testimonials.description")}
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-3xl border border-luxury-border bg-luxury-white p-8 luxury-shadow-lg md:p-12 lg:p-16">
            <Quote className="mx-auto mb-8 h-10 w-10 text-luxury-gold/30" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center"
              >
                <div className="mb-6 flex items-center justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonials[current].rating
                          ? "fill-luxury-gold text-luxury-gold"
                          : "fill-luxury-border text-luxury-border"
                      }`}
                    />
                  ))}
                </div>

                <p className="mb-8 text-lg leading-relaxed text-luxury-text md:text-xl lg:text-2xl">
                  &ldquo;{testimonials[current].content}&rdquo;
                </p>

                <div className="flex flex-col items-center gap-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-luxury-gold/20 ring-offset-4 ring-offset-luxury-white">
                    <Image
                      src={testimonials[current].avatar}
                      alt={testimonials[current].name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-base font-bold text-luxury-dark">
                      {testimonials[current].name}
                    </p>
                    <p className="text-sm text-luxury-muted">
                      {testimonials[current].role} &mdash;{" "}
                      {testimonials[current].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-luxury-border bg-luxury-white text-luxury-text transition-all duration-300 hover:border-luxury-gold hover:text-luxury-gold luxury-shadow"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-luxury-gold"
                      : "w-2 bg-luxury-border hover:bg-luxury-muted"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-luxury-border bg-luxury-white text-luxury-text transition-all duration-300 hover:border-luxury-gold hover:text-luxury-gold luxury-shadow"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </Container>
    </section>
  );
}
