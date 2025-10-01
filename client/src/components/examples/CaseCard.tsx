import { CaseCard } from "../CaseCard";

export default function CaseCardExample() {
  const mockCase = {
    id: "1",
    title: "Automated Customer Service with NLP",
    category: "Natural Language Processing",
    status: "Active",
    description: "Implementation of an AI-powered chatbot system that handles customer inquiries using advanced natural language processing techniques.",
    industry: "E-commerce",
    technology: "GPT-4, TensorFlow",
    impact: null,
    dateImplemented: null,
    organization: null,
    keyMetrics: null,
    challenges: null,
    solutions: null,
  };

  const handleViewDetails = (id: string) => {
    console.log("View details for case:", id);
  };

  return (
    <div className="p-6 max-w-sm">
      <CaseCard aiCase={mockCase} onViewDetails={handleViewDetails} />
    </div>
  );
}
