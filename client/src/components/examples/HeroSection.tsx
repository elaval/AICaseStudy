import { useState } from "react";
import { HeroSection } from "../HeroSection";

export default function HeroSectionExample() {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full">
      <HeroSection searchQuery={search} onSearchChange={setSearch} />
    </div>
  );
}
