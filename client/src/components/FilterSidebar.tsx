import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilterSidebarProps {
  categories: string[];
  statuses: string[];
  selectedCategories: string[];
  selectedStatuses: string[];
  onCategoryToggle: (category: string) => void;
  onStatusToggle: (status: string) => void;
  onClearFilters: () => void;
}

export function FilterSidebar({
  categories,
  statuses,
  selectedCategories,
  selectedStatuses,
  onCategoryToggle,
  onStatusToggle,
  onClearFilters,
}: FilterSidebarProps) {
  const hasFilters = selectedCategories.length > 0 || selectedStatuses.length > 0;

  return (
    <div className="w-full lg:w-64 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            data-testid="button-clear-filters"
          >
            Clear all
          </Button>
        )}
      </div>

      {hasFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((cat) => (
            <Badge
              key={cat}
              variant="secondary"
              className="gap-1"
              data-testid={`badge-filter-${cat}`}
            >
              {cat}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onCategoryToggle(cat)}
              />
            </Badge>
          ))}
          {selectedStatuses.map((status) => (
            <Badge
              key={status}
              variant="secondary"
              className="gap-1"
              data-testid={`badge-filter-${status}`}
            >
              {status}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onStatusToggle(status)}
              />
            </Badge>
          ))}
        </div>
      )}

      <ScrollArea className="h-[calc(100vh-400px)]">
        <div className="space-y-6">
          <div>
            <h4 className="mb-3 text-sm font-medium">Category</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => onCategoryToggle(category)}
                    data-testid={`checkbox-category-${category}`}
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-medium">Status</h4>
            <div className="space-y-2">
              {statuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={selectedStatuses.includes(status)}
                    onCheckedChange={() => onStatusToggle(status)}
                    data-testid={`checkbox-status-${status}`}
                  />
                  <Label
                    htmlFor={`status-${status}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {status}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
