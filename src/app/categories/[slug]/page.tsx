"use client";

import { useState, useMemo, useCallback, use } from "react";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/hooks/useLanguage";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Newsletter from "@/components/home/Newsletter";
import Breadcrumb from "@/components/product/Breadcrumb";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import StickyPurchaseCard from "@/components/product/StickyPurchaseCard";
import RelatedProducts from "@/components/product/RelatedProducts";
import Container from "@/components/common/Container";
import type { SelectedVariants } from "@/types/variant";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";

function ProductContent({ slug }: { slug: string }) {
  const product = getProductBySlug(slug) || products[0];

  if (!product) {
    notFound();
  }

  const initialVariants: SelectedVariants = {};
  product.variants.forEach((group) => {
    const firstAvailable = group.options.find((o) => o.available);
    if (firstAvailable) {
      initialVariants[group.id] = firstAvailable.id;
    }
  });

  const [selectedVariants, setSelectedVariants] =
    useState<SelectedVariants>(initialVariants);

  const handleVariantChange = useCallback(
    (groupId: string, optionId: string) => {
      setSelectedVariants((prev) => ({ ...prev, [groupId]: optionId }));
    },
    []
  );

  const currentCombination = useMemo(() => {
    const selectedIds = Object.values(selectedVariants);
    return product.variantCombinations.find((combo) =>
      combo.variantIds.every((id) => selectedIds.includes(id))
    );
  }, [selectedVariants, product.variantCombinations]);

  const currentPrice = currentCombination?.price || product.price;
  const currentOriginalPrice =
    currentCombination?.originalPrice || product.originalPrice;
  const currentSku = currentCombination?.sku || product.sku;
  const currentAvailability = currentCombination?.available === false
    ? "out-of-stock"
    : product.availability;

  const currentImages = useMemo(() => {
    if (currentCombination?.image) {
      const matchingImage = product.images.find(
        (img) => img.src === currentCombination.image
      );
      if (matchingImage) {
        return [
          matchingImage,
          ...product.images.filter((img) => img.id !== matchingImage.id),
        ];
      }
    }
    return product.images;
  }, [currentCombination, product.images]);

  const relatedProducts = getRelatedProducts(product.id);

  return (
    <main>
      <Navbar />
      <div className="pt-24">
        <Container>
          <Breadcrumb
            items={[
              { label: "Categories", href: "/categories" },
              { label: product.category, href: "/categories" },
              { label: product.name },
            ]}
          />

          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <ProductGallery
                images={currentImages}
                productName={product.name}
              />
            </div>

            <div className="lg:col-span-4">
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

            <div className="hidden lg:col-span-2 lg:block">
              <StickyPurchaseCard
                price={currentPrice}
                originalPrice={currentOriginalPrice}
                availability={currentAvailability}
                estimatedDelivery={product.estimatedDelivery}
              />
            </div>
          </div>

          <div className="mt-6 lg:hidden">
            <StickyPurchaseCard
              price={currentPrice}
              originalPrice={currentOriginalPrice}
              availability={currentAvailability}
              estimatedDelivery={product.estimatedDelivery}
            />
          </div>

          <div className="mt-16 border-t border-luxury-border pt-12 lg:mt-24">
            <ProductTabs product={product} />
          </div>
        </Container>

        <div className="mt-8 border-t border-luxury-border">
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>

      <Newsletter />
      <Footer />
    </main>
  );
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return (
    <LanguageProvider>
      <ProductContent slug={slug} />
    </LanguageProvider>
  );
}
