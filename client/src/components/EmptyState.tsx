import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onClearFilters?: () => void;
  hasFilters?: boolean;
}

export function EmptyState({ onClearFilters, hasFilters = false }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="rounded-full bg-muted p-6 mb-4">
        <SearchX className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No cases found</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        {hasFilters
          ? "Try adjusting your filters or search query to find more results."
          : "There are no AI cases available at the moment."}
      </p>
      {hasFilters && onClearFilters && (
        <Button variant="outline" onClick={onClearFilters} data-testid="button-clear-filters-empty">
          Clear all filters
        </Button>
      )}
    </div>
  );
}
