// import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
// import { Link } from "react-router-dom";
import img from "@/assets/dashboard-image-preview.png";

export function MacbookScrollDemo() {
  return (
    <div className="overflow-hidden bg-[#0B0B0F] w-full">
      <MacbookScroll
        src={img}
        showGradient={false}
      />
    </div>
  );
}
