import { useState, useMemo } from "react";
import { HeroSection } from "@/components/HeroSection";
import { FilterSidebar } from "@/components/FilterSidebar";
import { CaseCard } from "@/components/CaseCard";
import { CaseDetail } from "@/components/CaseDetail";
import { EmptyState } from "@/components/EmptyState";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { AICase } from "@shared/schema";

// TODO: Remove mock data when backend is implemented
const mockAICases: AICase[] = [
  {
    id: "1",
    title: "Automated Customer Service with NLP",
    category: "Natural Language Processing",
    status: "Active",
    description: "Implementation of an AI-powered chatbot system that handles customer inquiries using advanced natural language processing techniques, reducing response times and improving customer satisfaction.",
    industry: "E-commerce",
    technology: "GPT-4, TensorFlow, Python",
    impact: "Reduced customer service costs by 40% while increasing customer satisfaction scores by 25%. The system now handles over 10,000 inquiries per day with 95% accuracy.",
    dateImplemented: "January 2024",
    organization: "TechCorp Solutions",
    keyMetrics: "95% accuracy rate, 40% cost reduction, 10,000+ daily queries handled, 25% increase in customer satisfaction",
    challenges: "Initial training data quality issues, integration with legacy systems, handling multilingual support",
    solutions: "Implemented comprehensive data cleaning pipeline, developed custom API adapters for legacy systems, trained separate models for each supported language",
  },
  {
    id: "2",
    title: "Predictive Maintenance for Manufacturing",
    category: "Machine Learning",
    status: "Completed",
    description: "Machine learning system predicting equipment failures before they occur, minimizing downtime and maintenance costs in manufacturing facilities.",
    industry: "Manufacturing",
    technology: "Random Forest, IoT Sensors, Apache Spark",
    impact: "Reduced unplanned downtime by 60%, saving $2M annually. Predictive accuracy reached 92% for critical equipment failures.",
    dateImplemented: "March 2023",
    organization: "Industrial Systems Inc",
    keyMetrics: "92% prediction accuracy, 60% downtime reduction, $2M annual savings, 500+ sensors integrated",
    challenges: "Limited historical failure data, sensor calibration issues, real-time processing requirements",
    solutions: "Augmented training data with synthetic examples, implemented automated sensor calibration, deployed edge computing for real-time analysis",
  },
  {
    id: "3",
    title: "Medical Image Analysis for Cancer Detection",
    category: "Computer Vision",
    status: "Active",
    description: "Deep learning model for automated detection and classification of cancerous tissues in medical imaging, assisting radiologists in early diagnosis.",
    industry: "Healthcare",
    technology: "Convolutional Neural Networks, PyTorch, DICOM",
    impact: "Improved early detection rates by 35%, reduced diagnosis time by 50%. System processes 5,000+ scans monthly with 97% sensitivity.",
    dateImplemented: "June 2023",
    organization: "HealthTech Medical",
    keyMetrics: "97% sensitivity, 35% better early detection, 50% faster diagnosis, 5,000+ monthly scans",
    challenges: "Data privacy compliance, model interpretability, integration with existing PACS systems",
    solutions: "Implemented federated learning for privacy, developed attention visualization for interpretability, created DICOM-compliant API",
  },
  {
    id: "4",
    title: "Autonomous Warehouse Robots",
    category: "Robotics",
    status: "In Progress",
    description: "Fleet of autonomous mobile robots for warehouse operations, including inventory management, picking, and sorting tasks.",
    industry: "Logistics",
    technology: "ROS, Computer Vision, Reinforcement Learning",
    impact: "Expected to increase warehouse efficiency by 70% and reduce labor costs by 45% upon full deployment.",
    dateImplemented: "September 2024",
    organization: "LogiBot Systems",
    keyMetrics: "70% efficiency increase (projected), 45% labor cost reduction (projected), 50 robots deployed",
    challenges: "Navigation in dynamic environments, human-robot collaboration safety, fleet coordination",
    solutions: "Implemented dynamic path planning, deployed safety sensors with redundancy, developed centralized fleet management system",
  },
  {
    id: "5",
    title: "Financial Fraud Detection System",
    category: "Machine Learning",
    status: "Active",
    description: "Real-time fraud detection system analyzing millions of transactions daily using ensemble machine learning methods.",
    industry: "Financial Services",
    technology: "XGBoost, Apache Kafka, Redis",
    impact: "Detected and prevented $50M in fraudulent transactions in first year. False positive rate reduced to 0.1%.",
    dateImplemented: "November 2023",
    organization: "SecureBank Financial",
    keyMetrics: "$50M fraud prevented, 0.1% false positive rate, 10M+ daily transactions analyzed, 99.9% uptime",
    challenges: "Real-time processing at scale, evolving fraud patterns, balancing security with user experience",
    solutions: "Implemented streaming architecture with Kafka, deployed continuous learning pipeline, developed adaptive thresholding system",
  },
  {
    id: "6",
    title: "Smart City Traffic Optimization",
    category: "Machine Learning",
    status: "Completed",
    description: "AI system optimizing traffic light patterns and flow management based on real-time traffic data from sensors and cameras.",
    industry: "Government",
    technology: "Deep Reinforcement Learning, Computer Vision, Edge Computing",
    impact: "Reduced average commute times by 28% and traffic congestion by 35% across the city.",
    dateImplemented: "February 2023",
    organization: "Metro City Council",
    keyMetrics: "28% shorter commutes, 35% less congestion, 1,500 intersections optimized, 20% emission reduction",
    challenges: "Coordinating thousands of intersections, handling emergency vehicle priority, weather adaptation",
    solutions: "Developed distributed coordination algorithm, implemented emergency override system, created weather-adaptive models",
  },
  {
    id: "7",
    title: "Personalized Learning Platform",
    category: "Natural Language Processing",
    status: "Active",
    description: "AI-powered educational platform that adapts content and pacing to individual student learning patterns and preferences.",
    industry: "Education",
    technology: "Transformers, Knowledge Graphs, Adaptive Learning",
    impact: "Students show 45% faster learning progression and 30% better retention rates compared to traditional methods.",
    dateImplemented: "August 2023",
    organization: "EduAI Learning",
    keyMetrics: "45% faster learning, 30% better retention, 100,000+ active students, 250+ courses",
    challenges: "Diverse learning styles, content quality assurance, measuring true understanding vs memorization",
    solutions: "Built multi-modal learning profiles, implemented peer review system, developed concept mastery assessments",
  },
  {
    id: "8",
    title: "Agricultural Yield Prediction",
    category: "Machine Learning",
    status: "Completed",
    description: "Predictive analytics system for crop yield forecasting using satellite imagery, weather data, and soil conditions.",
    industry: "Agriculture",
    technology: "Random Forest, Satellite Imaging, Time Series Analysis",
    impact: "Improved yield predictions to 88% accuracy, helping farmers optimize planting and resource allocation.",
    dateImplemented: "April 2023",
    organization: "AgriTech Innovations",
    keyMetrics: "88% prediction accuracy, 15% yield improvement, 10,000+ farms served, 50+ crop types",
    challenges: "Variable weather patterns, diverse soil types, limited ground truth data",
    solutions: "Integrated multi-source data fusion, deployed regional calibration models, established farmer feedback loop",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  // TODO: Replace with actual API call
  const allCases = mockAICases;

  const categories = useMemo(() => {
    return Array.from(new Set(allCases.map((c) => c.category))).sort();
  }, [allCases]);

  const statuses = useMemo(() => {
    return Array.from(new Set(allCases.map((c) => c.status))).sort();
  }, [allCases]);

  const filteredCases = useMemo(() => {
    return allCases.filter((aiCase) => {
      const matchesSearch =
        searchQuery === "" ||
        aiCase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        aiCase.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        aiCase.industry?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(aiCase.category);

      const matchesStatus =
        selectedStatuses.length === 0 || selectedStatuses.includes(aiCase.status);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [allCases, searchQuery, selectedCategories, selectedStatuses]);

  const selectedCase = selectedCaseId
    ? allCases.find((c) => c.id === selectedCaseId)
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

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setSearchQuery("");
  };

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedStatuses.length > 0 ||
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
              selectedCategories={selectedCategories}
              selectedStatuses={selectedStatuses}
              onCategoryToggle={toggleCategory}
              onStatusToggle={toggleStatus}
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
