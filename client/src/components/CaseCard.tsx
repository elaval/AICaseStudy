import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AICase } from "@shared/schema";

interface CaseCardProps {
  aiCase: AICase;
  onViewDetails: (id: string) => void;
}

export function CaseCard({ aiCase, onViewDetails }: CaseCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow" data-testid={`card-case-${aiCase.id}`}>
      <CardHeader className="space-y-2 pb-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold line-clamp-2">{aiCase.title}</h3>
          <Badge variant="secondary" className="shrink-0" data-testid={`badge-category-${aiCase.id}`}>
            {aiCase.category}
          </Badge>
        </div>
        <Badge
          variant={
            aiCase.status === "Active" || aiCase.status === "Completed"
              ? "default"
              : "outline"
          }
          className="w-fit"
          data-testid={`badge-status-${aiCase.id}`}
        >
          {aiCase.status}
        </Badge>
      </CardHeader>
      
      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {aiCase.description || "No description available"}
        </p>
        {aiCase.industry && (
          <p className="mt-3 text-sm">
            <span className="font-medium">Industry:</span>{" "}
            <span className="text-muted-foreground">{aiCase.industry}</span>
          </p>
        )}
        {aiCase.technology && (
          <p className="mt-1 text-sm">
            <span className="font-medium">Technology:</span>{" "}
            <span className="text-muted-foreground">{aiCase.technology}</span>
          </p>
        )}
      </CardContent>
      
      <CardFooter>
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={() => onViewDetails(aiCase.id)}
          data-testid={`button-view-details-${aiCase.id}`}
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
