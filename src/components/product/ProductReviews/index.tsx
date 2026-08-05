"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ThumbsUp, ChevronDown } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
  verified: boolean;
}

const mockReviews: Review[] = [
  {
    id: "r-1",
    author: "Sarah Mitchell",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    date: "Jul 18, 2026",
    title: "Absolutely stunning craftsmanship",
    content: "The quality exceeded my expectations. The wood grain is beautiful and the leather is incredibly soft. It's become the centerpiece of our living room. The delivery team was professional and handled everything with care.",
    helpful: 24,
    verified: true,
  },
  {
    id: "r-2",
    author: "James Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
    date: "Jul 3, 2026",
    title: "Worth every penny",
    content: "I spent weeks researching before purchasing and I'm so glad I chose LUXE. The attention to detail is remarkable — from the hand-stitched seams to the perfectly balanced proportions. This is furniture that will last a lifetime.",
    helpful: 18,
    verified: true,
  },
  {
    id: "r-3",
    author: "Elena Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 4,
    date: "Jun 22, 2026",
    title: "Beautiful piece, delivery took a while",
    content: "The furniture itself is gorgeous and well-made. My only minor complaint is that delivery took 4 weeks instead of the quoted 2-3. However, the white-glove service was excellent and the end result was worth the wait.",
    helpful: 9,
    verified: true,
  },
];

interface ProductReviewsProps {
  productRating: number;
  reviewCount: number;
}

export default function ProductReviews({ productRating, reviewCount }: ProductReviewsProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleReviews = showAll ? mockReviews : mockReviews.slice(0, 2);

  const ratingDistribution = [
    { stars: 5, count: Math.round(reviewCount * 0.72) },
    { stars: 4, count: Math.round(reviewCount * 0.18) },
    { stars: 3, count: Math.round(reviewCount * 0.06) },
    { stars: 2, count: Math.round(reviewCount * 0.03) },
    { stars: 1, count: Math.round(reviewCount * 0.01) },
  ];

  return (
    <section className="border-t border-luxury-border py-20 lg:py-28">
      <Container>
        <SectionHeading
          subtitle="Customer Feedback"
          title="Reviews"
          description={`Rated ${productRating} out of 5 based on ${reviewCount} reviews.`}
        />

        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 grid gap-8 rounded-2xl border border-luxury-border bg-white p-6 sm:grid-cols-2 sm:p-8"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-5xl font-bold text-luxury-dark">{productRating}</p>
              <div className="mt-2 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(productRating)
                        ? "fill-luxury-gold text-luxury-gold"
                        : "fill-luxury-border text-luxury-border"
                    )}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-luxury-muted">
                {reviewCount} reviews
              </p>
            </div>
            <div className="space-y-2.5">
              {ratingDistribution.map((row) => (
                <div key={row.stars} className="flex items-center gap-3">
                  <span className="w-14 text-right text-sm font-medium text-luxury-dark">
                    {row.stars} star
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-luxury-muted-bg">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(row.count / reviewCount) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: (5 - row.stars) * 0.1 }}
                      className="h-full rounded-full bg-luxury-gold"
                    />
                  </div>
                  <span className="w-8 text-sm text-luxury-muted">{row.count}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-6">
            <AnimatePresence>
              {visibleReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="rounded-2xl border border-luxury-border bg-white p-6"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={review.avatar}
                          alt={review.author}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-luxury-dark">
                            {review.author}
                          </span>
                          {review.verified && (
                            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600">
                              Verified
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-luxury-muted">{review.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3.5 w-3.5",
                            i < review.rating
                              ? "fill-luxury-gold text-luxury-gold"
                              : "fill-luxury-border text-luxury-border"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <h4 className="mb-2 text-sm font-bold text-luxury-dark">
                    {review.title}
                  </h4>
                  <p className="mb-4 text-sm leading-relaxed text-luxury-secondary">
                    {review.content}
                  </p>
                  <button className="flex items-center gap-1.5 text-xs text-luxury-muted transition-colors hover:text-luxury-gold">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    Helpful ({review.helpful})
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {mockReviews.length > 2 && (
              <div className="text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-luxury-gold transition-colors hover:text-luxury-gold-hover"
                >
                  {showAll ? "Show Less" : `View All ${reviewCount} Reviews`}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", showAll && "rotate-180")} />
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
