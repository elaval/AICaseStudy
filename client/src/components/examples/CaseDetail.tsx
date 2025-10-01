import { CaseDetail } from "../CaseDetail";

export default function CaseDetailExample() {
  const mockCase = {
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
  };

  const handleBack = () => {
    console.log("Navigate back to list");
  };

  return (
    <div className="p-6 max-w-6xl">
      <CaseDetail aiCase={mockCase} onBack={handleBack} />
    </div>
  );
}
