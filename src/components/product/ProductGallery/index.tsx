"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/image";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const mainImageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!mainImageRef.current) return;
      const rect = mainImageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPosition({ x, y });
    },
    []
  );

  const handleSwipe = (direction: number) => {
    setActiveIndex((prev) => {
      const next = prev + direction;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-4">
      <div className="order-2 flex gap-2 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-y-auto">
        {images.map((img, index) => (
          <button
            key={img.id}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 lg:h-20 lg:w-20",
              activeIndex === index
                ? "border-luxury-gold shadow-sm"
                : "border-luxury-border hover:border-luxury-gold/50 opacity-60 hover:opacity-100"
            )}
            aria-label={`View ${productName} image ${index + 1}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      <div className="relative order-1 flex-1 lg:order-2">
        <div
          ref={mainImageRef}
          className="relative aspect-4/5 cursor-crosshair overflow-hidden rounded-2xl border border-luxury-border bg-white lg:aspect-square"
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
          onMouseMove={handleMouseMove}
          role="img"
          aria-label={images[activeIndex]?.alt}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                fill
                className={cn(
                  "object-cover transition-transform duration-300 ease-out",
                  isZooming && "scale-[2]"
                )}
                style={
                  isZooming
                    ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                    : undefined
                }
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 lg:hidden">
          <button
            onClick={() => handleSwipe(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-luxury-dark shadow-sm backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleSwipe(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-luxury-dark shadow-sm backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-3 flex justify-center gap-1.5 lg:hidden">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeIndex === index
                  ? "w-6 bg-luxury-gold"
                  : "w-1.5 bg-luxury-border"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
