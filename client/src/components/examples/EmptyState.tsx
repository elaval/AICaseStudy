import { EmptyState } from "../EmptyState";

export default function EmptyStateExample() {
  const handleClear = () => {
    console.log("Clear filters");
  };

  return (
    <div className="p-6">
      <EmptyState onClearFilters={handleClear} hasFilters={true} />
    </div>
  );
}
