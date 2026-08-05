"use client";

import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/hooks/useLanguage";
import ScrollProgress from "@/components/common/ScrollProgress";
import BackToTop from "@/components/common/BackToTop";
import Navbar from "@/components/common/Navbar";
import Hero from "@/components/home/Hero";
import BrandPhilosophy from "@/components/home/BrandPhilosophy";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import ShopByRoom from "@/components/home/ShopByRoom";
import Categories from "@/components/home/Categories";
import BestSellers from "@/components/home/BestSellers";  
import NewArrivals from "@/components/home/NewArrivals";
import Craftsmanship from "@/components/home/Craftsmanship";
import Materials from "@/components/home/Materials";
import Customization from "@/components/home/Customization";
import InteriorProjects from "@/components/home/InteriorProjects";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import InstagramGallery from "@/components/home/InstagramGallery";
import Blogs from "@/components/home/Blogs";
import FAQ from "@/components/home/FAQ";
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
      <ScrollProgress />
      <Navbar />
      <Hero />
      <BrandPhilosophy />
      <FeaturedCollections />
      <ShopByRoom />
      <Categories />
      <BestSellers />
      <NewArrivals />
      <Craftsmanship />
      <Materials />
      <Customization />
      <InteriorProjects />
      <WhyChooseUs />
      <Testimonials />
      <InstagramGallery />
      <Blogs />
      <FAQ />
      <Newsletter />
      <Footer />
      <BackToTop />
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
