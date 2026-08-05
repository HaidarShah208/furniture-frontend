"use client";

import { useState, useMemo } from "react";
import { LanguageProvider } from "@/hooks/useLanguage";
import AnnouncementBar from "@/components/common/AnnouncementBar";
import ScrollProgress from "@/components/common/ScrollProgress";
import BackToTop from "@/components/common/BackToTop";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Newsletter from "@/components/home/Newsletter";
import CollectionsHero from "@/components/collections/Hero";
import CollectionStory from "@/components/collections/CollectionStory";
import CollectionNavigation from "@/components/collections/CollectionNavigation";
import CollectionGrid from "@/components/collections/CollectionGrid";
import FeaturedCollection from "@/components/collections/FeaturedCollection";
import CollectionBanner from "@/components/collections/CollectionBanner";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { collections } from "@/data/collections";

function CollectionsContent() {
  const [activeSlug, setActiveSlug] = useState("");

  const filteredCollections = useMemo(() => {
    if (!activeSlug) return collections;
    return collections.filter((c) => c.slug === activeSlug);
  }, [activeSlug]);

  const featuredCollections = collections.filter((c) => c.featured);

  return (
    <main>
      <AnnouncementBar />
      <ScrollProgress />
      <Navbar />
      <CollectionsHero />

      <CollectionStory />

      <CollectionNavigation
        collections={collections}
        activeSlug={activeSlug}
        onSelect={setActiveSlug}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading
            subtitle="Curated for You"
            title="Explore Collections"
            description="Each collection tells a story of exceptional design and craftsmanship, curated to transform your living spaces."
          />
          <CollectionGrid collections={filteredCollections} />
        </Container>
      </section>

      {!activeSlug && featuredCollections.length > 0 && (
        <>
          <div className="border-t border-luxury-border">
            <FeaturedCollection collection={featuredCollections[0]} />
          </div>

          <CollectionBanner />

          {featuredCollections.length > 1 && (
            <div className="border-t border-luxury-border">
              <FeaturedCollection collection={featuredCollections[1]} reversed />
            </div>
          )}
        </>
      )}

      <Newsletter />
      <Footer />
      <BackToTop />
    </main>
  );
}

export default function CollectionsPage() {
  return (
    <LanguageProvider>
      <CollectionsContent />
    </LanguageProvider>
  );
}
