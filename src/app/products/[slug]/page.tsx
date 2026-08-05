"use client";

import { use, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ScrollProgress from "@/components/common/ScrollProgress";
import BackToTop from "@/components/common/BackToTop";
import Breadcrumb from "@/components/product/Breadcrumb";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import StickyPurchaseCard from "@/components/product/StickyPurchaseCard";
import ProductTabs from "@/components/product/ProductTabs";
import ProductReviews from "@/components/product/ProductReviews";
import ProductFAQ from "@/components/product/ProductFAQ";
import RelatedProducts from "@/components/product/RelatedProducts";
import RecentlyViewed from "@/components/collection-details/RecentlyViewed";
import Newsletter from "@/components/home/Newsletter";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import type { SelectedVariants } from "@/types/variant";

function ProductDetailContent({ slug }: { slug: string }) {
  const product = getProductBySlug(slug);

  const [selectedVariants, setSelectedVariants] = useState<SelectedVariants>(() => {
    if (!product) return {};
    const defaults: SelectedVariants = {};
    product.variants.forEach((group) => {
      const first = group.options.find((o) => o.available);
      if (first) defaults[group.id] = first.id;
    });
    return defaults;
  });

  const handleVariantChange = useCallback((groupId: string, optionId: string) => {
    setSelectedVariants((prev) => ({ ...prev, [groupId]: optionId }));
  }, []);

  const activeCombo = useMemo(() => {
    if (!product) return null;
    const selectedIds = Object.values(selectedVariants);
    return product.variantCombinations.find((combo) =>
      combo.variantIds.every((id) => selectedIds.includes(id))
    );
  }, [product, selectedVariants]);

  const currentPrice = activeCombo?.price ?? product?.price ?? 0;
  const currentOriginalPrice = activeCombo?.originalPrice ?? product?.originalPrice;
  const currentSku = activeCombo?.sku ?? product?.sku ?? "";
  const currentAvailability = activeCombo
    ? activeCombo.available
      ? "in-stock"
      : "out-of-stock"
    : product?.availability ?? "in-stock";

  const relatedProducts = useMemo(
    () => (product ? getRelatedProducts(product.id, 6) : []),
    [product]
  );

  const recentlyViewedProducts = useMemo(
    () => products.filter((p) => p.slug !== slug).slice(0, 8),
    [slug]
  );

  if (!product) {
    return (
      <main>
        <Navbar />
        <section className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="mb-3 text-3xl font-bold text-luxury-dark">Product Not Found</h1>
            <p className="text-luxury-muted">The product you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <ScrollProgress />
      <Navbar />

      <section className="pb-10 pt-4 lg:pb-16 lg:pt-6">
        <Container>
          <Breadcrumb
            items={[
              { label: "Collections", href: "/collections" },
              { label: product.collection, href: `/collections/${product.collection.toLowerCase().replace(/\s+/g, "-")}` },
              { label: product.name },
            ]}
          />

          <div className="mt-6 grid gap-10 lg:mt-8 lg:grid-cols-12 lg:gap-8">
            {/* Gallery — left side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-6"
            >
              <ProductGallery images={product.images} productName={product.name} />
            </motion.div>

            {/* Info + Purchase — right side */}
            <div className="lg:col-span-6">
              <div className="grid gap-8 xl:grid-cols-5">
                {/* Product Info */}
                <div className="xl:col-span-3">
                  <ProductInfo
                    product={product}
                    selectedVariants={selectedVariants}
                    onVariantChange={handleVariantChange}
                    currentPrice={currentPrice}
                    currentOriginalPrice={currentOriginalPrice}
                    currentSku={currentSku}
                    currentAvailability={currentAvailability}
                  />
                </div>

                {/* Sticky Purchase Card — desktop only */}
                <div className="hidden xl:col-span-2 xl:block">
                  <StickyPurchaseCard
                    product={product}
                    price={currentPrice}
                    originalPrice={currentOriginalPrice}
                    availability={currentAvailability}
                    estimatedDelivery={product.estimatedDelivery}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Purchase Card */}
          <div className="mt-8 xl:hidden">
            <StickyPurchaseCard
              product={product}
              price={currentPrice}
              originalPrice={currentOriginalPrice}
              availability={currentAvailability}
              estimatedDelivery={product.estimatedDelivery}
            />
          </div>
        </Container>
      </section>

      {/* Tabs: Description, Specifications, Details */}
      <section className="border-t border-luxury-border py-16 lg:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl"
          >
            <ProductTabs product={product} />
          </motion.div>
        </Container>
      </section>

      {/* Reviews */}
      <ProductReviews productRating={product.rating} reviewCount={product.reviews} />

      {/* FAQ */}
      <ProductFAQ />

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />

      {/* Recently Viewed */}
      <RecentlyViewed products={recentlyViewedProducts} />

      {/* Newsletter */}
      <Newsletter />

      <Footer />
      <BackToTop />
    </main>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <ProductDetailContent slug={slug} />;
}
