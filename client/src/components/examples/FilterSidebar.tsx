import { useState } from "react";
import { FilterSidebar } from "../FilterSidebar";

export default function FilterSidebarExample() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Machine Learning"]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(["Active"]);

  const categories = ["Machine Learning", "Natural Language Processing", "Computer Vision", "Robotics"];
  const statuses = ["Active", "Completed", "In Progress", "Planned"];

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedStatuses([]);
  };

  return (
    <div className="p-6 max-w-xs">
      <FilterSidebar
        categories={categories}
        statuses={statuses}
        selectedCategories={selectedCategories}
        selectedStatuses={selectedStatuses}
        onCategoryToggle={toggleCategory}
        onStatusToggle={toggleStatus}
        onClearFilters={clearFilters}
      />
    </div>
  );
}
