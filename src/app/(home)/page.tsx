"use client";

import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/hooks/useLanguage";
import Navbar from "@/components/common/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import Categories from "@/components/home/Categories";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import BestSellers from "@/components/home/BestSellers";
import LuxuryBanner from "@/components/home/LuxuryBanner";
import Testimonials from "@/components/home/Testimonials";
import InstagramGallery from "@/components/home/InstagramGallery";
import CTA from "@/components/home/CTA";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/common/Footer";

function HomeContent() {
  const { direction } = useLanguage();

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = direction === "rtl" ? "ur" : "en";
  }, [direction]);

  return (
    <main dir={direction}>
      <Navbar />
      <Hero />
      <FeaturedCollections />
      <Categories />
      <WhyChooseUs />
      <BestSellers />
      <LuxuryBanner />
      <Testimonials />
      <InstagramGallery />
      <CTA />
      <Newsletter />
      <Footer />
    </main>
  );
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
