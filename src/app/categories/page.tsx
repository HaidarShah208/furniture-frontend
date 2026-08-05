"use client";

import { LanguageProvider } from "@/hooks/useLanguage";
import AnnouncementBar from "@/components/common/AnnouncementBar";
import ScrollProgress from "@/components/common/ScrollProgress";
import BackToTop from "@/components/common/BackToTop";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Newsletter from "@/components/home/Newsletter";
import CategoriesHero from "@/components/categories/Hero";
import PopularCategories from "@/components/categories/PopularCategories";
import CategoryCard from "@/components/categories/CategoryCard";
import CategoryBanner from "@/components/categories/CategoryBanner";
import RecentlyAdded from "@/components/categories/RecentlyAdded";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { categories } from "@/data/categories";

function CategoriesContent() {
  return (
    <main>
      <AnnouncementBar />
      <ScrollProgress />
      <Navbar />
      <CategoriesHero />

      <PopularCategories categories={categories} />

      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading
            subtitle="All Categories"
            title="Browse Our Collection"
            description="Explore every category of handcrafted luxury furniture, designed to transform your living spaces."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <RecentlyAdded categories={categories} />

      <CategoryBanner />

      <Newsletter />
      <Footer />
      <BackToTop />
    </main>
  );
}

export default function CategoriesPage() {
  return (
    <LanguageProvider>
      <CategoriesContent />
    </LanguageProvider>
  );
}
