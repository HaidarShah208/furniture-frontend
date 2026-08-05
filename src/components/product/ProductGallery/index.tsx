"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
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

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") handleSwipe(1);
      if (e.key === "ArrowLeft") handleSwipe(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, images.length]);

  return (
    <>
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

            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-luxury-dark backdrop-blur-sm transition-all duration-300 hover:bg-luxury-gold hover:text-white"
              aria-label="Open fullscreen gallery"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
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

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-70 flex items-center justify-center bg-black/95"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={() => handleSwipe(-1)}
              className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => handleSwipe(1)}
              className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="relative h-[80vh] w-[85vw] max-w-5xl"
              >
                <Image
                  src={images[activeIndex].src}
                  alt={images[activeIndex].alt}
                  fill
                  className="object-contain"
                  sizes="85vw"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
              {images.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative h-14 w-14 overflow-hidden rounded-lg border-2 transition-all duration-300",
                    activeIndex === index
                      ? "border-luxury-gold opacity-100"
                      : "border-white/20 opacity-50 hover:opacity-80"
                  )}
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="56px" />
                </button>
              ))}
            </div>

            <p className="absolute top-6 left-1/2 -translate-x-1/2 text-sm text-white/60">
              {activeIndex + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
