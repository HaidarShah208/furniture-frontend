"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/common/Container";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ScrollProgress from "@/components/common/ScrollProgress";
import BackToTop from "@/components/common/BackToTop";
import DashboardSidebar, { MobileTrigger, type DashboardTab } from "@/components/account/DashboardSidebar";
import ProfileTab from "@/components/account/ProfileTab";
import OrdersTab from "@/components/account/OrdersTab";
import WishlistTab from "@/components/account/WishlistTab";
import AddressesTab from "@/components/account/AddressesTab";
import SettingsTab from "@/components/account/SettingsTab";
import Breadcrumb from "@/components/product/Breadcrumb";
import { mockProfile, mockOrders, mockAddresses } from "@/data/account";

const tabTitles: Record<DashboardTab, string> = {
  profile: "My Profile",
  orders: "My Orders",
  wishlist: "Wishlist",
  addresses: "Addresses",
  settings: "Settings",
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("profile");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main>
      <ScrollProgress />
      <Navbar />

      <section className="pb-16 pt-28 lg:pb-24 lg:pt-32">
        <Container>
          <Breadcrumb
            items={[
              { label: "Account", href: "/account" },
              { label: tabTitles[activeTab] },
            ]}
          />

          <div className="mt-4 mb-6 flex items-center justify-between lg:hidden">
            <h1 className="text-xl font-bold text-luxury-dark">{tabTitles[activeTab]}</h1>
            <MobileTrigger onClick={() => setMobileOpen(true)} />
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <DashboardSidebar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                profile={mockProfile}
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
              />
            </div>

            <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "profile" && <ProfileTab profile={mockProfile} />}
                  {activeTab === "orders" && <OrdersTab orders={mockOrders} />}
                  {activeTab === "wishlist" && <WishlistTab />}
                  {activeTab === "addresses" && <AddressesTab initialAddresses={mockAddresses} />}
                  {activeTab === "settings" && <SettingsTab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}
