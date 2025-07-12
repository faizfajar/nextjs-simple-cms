"use client";

import Navbar from "@/components/Navbar";
import MenuSection from "@/components/MenuSection";

export default function MenuPage() {
  return (
    <Navbar>
      <div className="max-w-3xl mx-auto py-8">
        <MenuSection />
      </div>
    </Navbar>
  );
}
