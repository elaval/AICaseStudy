import { useState, useMemo } from "react";
import { HeroSection } from "@/components/HeroSection";
import { FilterSidebar } from "@/components/FilterSidebar";
import { CaseCard } from "@/components/CaseCard";
import { CaseDetail } from "@/components/CaseDetail";
import { EmptyState } from "@/components/EmptyState";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { AICase } from "@shared/schema";
import aiCasesData from "@/data/ai-cases.json";

const allAICases: AICase[] = aiCasesData as AICase[];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPrimaryModes, setSelectedPrimaryModes] = useState<string[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const categories = useMemo(() => {
    return Array.from(new Set(allAICases.map((c) => c.category))).sort();
  }, []);

  const statuses = useMemo(() => {
    return Array.from(new Set(allAICases.map((c) => c.status))).sort();
  }, []);

  const primaryModes = useMemo(() => {
    return Array.from(new Set(allAICases.map((c) => c.primaryMode).filter(Boolean) as string[])).sort();
  }, []);

  const filteredCases = useMemo(() => {
    return allAICases.filter((aiCase) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        aiCase.title.toLowerCase().includes(q) ||
        (aiCase.description ?? "").toLowerCase().includes(q) ||
        (aiCase.industry ?? "").toLowerCase().includes(q) ||
        (aiCase.primaryMode ?? "").toLowerCase().includes(q);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(aiCase.category);

      const matchesStatus =
        selectedStatuses.length === 0 || selectedStatuses.includes(aiCase.status);

      const matchesPrimaryMode =
        selectedPrimaryModes.length === 0 ||
        (aiCase.primaryMode && selectedPrimaryModes.includes(aiCase.primaryMode));

      return matchesSearch && matchesCategory && matchesStatus && matchesPrimaryMode;
    });
  }, [searchQuery, selectedCategories, selectedStatuses, selectedPrimaryModes]);

  const selectedCase = selectedCaseId
    ? allAICases.find((c) => c.id === selectedCaseId)
    : null;

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const togglePrimaryMode = (mode: string) => {
    setSelectedPrimaryModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setSelectedPrimaryModes([]);
    setSearchQuery("");
  };

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedStatuses.length > 0 ||
    selectedPrimaryModes.length > 0 ||
    searchQuery !== "";

  if (selectedCase) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <h2 className="text-xl font-semibold">AI Cases</h2>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <CaseDetail aiCase={selectedCase} onBack={() => setSelectedCaseId(null)} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h2 className="text-xl font-semibold">AI Cases</h2>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <FilterSidebar
              categories={categories}
              statuses={statuses}
              primaryModes={primaryModes}
              selectedCategories={selectedCategories}
              selectedStatuses={selectedStatuses}
              selectedPrimaryModes={selectedPrimaryModes}
              onCategoryToggle={toggleCategory}
              onStatusToggle={toggleStatus}
              onPrimaryModeToggle={togglePrimaryMode}
              onClearFilters={clearFilters}
            />
          </aside>

          <main className="flex-1 min-w-0">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground" data-testid="text-results-count">
                {filteredCases.length} {filteredCases.length === 1 ? "case" : "cases"} found
              </p>
            </div>

            {filteredCases.length === 0 ? (
              <EmptyState onClearFilters={clearFilters} hasFilters={hasFilters} />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {filteredCases.map((aiCase) => (
                  <CaseCard
                    key={aiCase.id}
                    aiCase={aiCase}
                    onViewDetails={setSelectedCaseId}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
