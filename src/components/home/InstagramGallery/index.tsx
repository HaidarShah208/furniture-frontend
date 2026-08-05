"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Camera, Heart, MessageCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";

const posts = [
  {
    id: "ig-1",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80",
    likes: 2341,
    comments: 89,
  },
  {
    id: "ig-2",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
    likes: 1892,
    comments: 67,
  },
  {
    id: "ig-3",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&q=80",
    likes: 3102,
    comments: 124,
  },
  {
    id: "ig-4",
    image: "https://images.unsplash.com/photo-1618219740975-d40978bb7378?w=600&q=80",
    likes: 1567,
    comments: 45,
  },
  {
    id: "ig-5",
    image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80",
    likes: 2890,
    comments: 102,
  },
  {
    id: "ig-6",
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80",
    likes: 1234,
    comments: 56,
  },
];

export default function InstagramGallery() {
  const { t, direction } = useLanguage();

  return (
    <section className="bg-luxury-white py-24 lg:py-32" dir={direction}>
      <Container>
        <SectionHeading
          subtitle={t("instagram.subtitle")}
          title={t("instagram.title")}
          description={t("instagram.description")}
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={post.image}
                  alt="Instagram post"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-luxury-dark/0 transition-all duration-500 group-hover:bg-luxury-dark/50">
                  <div className="flex items-center gap-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-1 text-sm font-medium text-white">
                      <Heart className="h-4 w-4 fill-white" />
                      {(post.likes / 1000).toFixed(1)}k
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-white">
                      <MessageCircle className="h-4 w-4 fill-white" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-luxury-gold transition-colors duration-300 hover:text-luxury-gold-hover"
          >
            <Camera className="h-5 w-5" />
            {t("instagram.followUs")}
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
