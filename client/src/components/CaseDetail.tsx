import { ArrowLeft, Calendar, Building2, Cpu, TrendingUp, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { AICase } from "@shared/schema";

interface CaseDetailProps {
  aiCase: AICase;
  onBack: () => void;
}

function parseCategory(category: string): string {
  if (!category) return "";
  if (category.startsWith("[")) {
    try {
      const parsed = JSON.parse(category);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : category;
    } catch {
      return category;
    }
  }
  return category;
}

function parseCategoryArray(category: string): string[] {
  if (!category) return [];
  if (category.startsWith("[")) {
    try {
      const parsed = JSON.parse(category);
      return Array.isArray(parsed) ? parsed : [category];
    } catch {
      return [category];
    }
  }
  return [category];
}

export function CaseDetail({ aiCase, onBack }: CaseDetailProps) {
  const categories = parseCategoryArray(aiCase.category);
  
  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 gap-2"
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all cases
        </Button>
        
        <div className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                {aiCase.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, idx) => (
                  <Badge key={idx} variant="secondary" data-testid={`text-category-${idx}`}>
                    {cat}
                  </Badge>
                ))}
                <Badge
                  variant={
                    aiCase.status === "Active" || aiCase.status === "Completed"
                      ? "default"
                      : "outline"
                  }
                  data-testid="text-status"
                >
                  {aiCase.status}
                </Badge>
              </div>
            </div>
          </div>
          
          {aiCase.description && (
            <p className="text-lg text-muted-foreground max-w-4xl">
              {aiCase.description}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {aiCase.impact && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground" data-testid="text-impact">
                  {aiCase.impact}
                </p>
              </CardContent>
            </Card>
          )}

          {aiCase.challenges && (
            <Card>
              <CardHeader>
                <CardTitle>Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground" data-testid="text-challenges">
                  {aiCase.challenges}
                </p>
              </CardContent>
            </Card>
          )}

          {aiCase.solutions && (
            <Card>
              <CardHeader>
                <CardTitle>Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground" data-testid="text-solutions">
                  {aiCase.solutions}
                </p>
              </CardContent>
            </Card>
          )}

          {aiCase.keyMetrics && (
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground" data-testid="text-metrics">
                  {aiCase.keyMetrics}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiCase.organization && (
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Organization</p>
                    <p className="text-sm text-muted-foreground" data-testid="text-organization">
                      {aiCase.organization}
                    </p>
                  </div>
                </div>
              )}
              
              {aiCase.industry && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium">Industry</p>
                    <p className="text-sm text-muted-foreground" data-testid="text-industry">
                      {aiCase.industry}
                    </p>
                  </div>
                </>
              )}

              {aiCase.technology && (
                <>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Cpu className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Technology</p>
                      <p className="text-sm text-muted-foreground" data-testid="text-technology">
                        {aiCase.technology}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {aiCase.dateImplemented && (
                <>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Date Implemented</p>
                      <p className="text-sm text-muted-foreground" data-testid="text-date">
                        {aiCase.dateImplemented}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {aiCase.primaryMode && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium">Primary Mode</p>
                    <p className="text-sm text-muted-foreground" data-testid="text-primary-mode">
                      {aiCase.primaryMode}
                    </p>
                  </div>
                </>
              )}

              {aiCase.originalUrl && (
                <>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <ExternalLink className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Original Source</p>
                      <a
                        href={aiCase.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline break-all"
                        data-testid="link-original-url"
                      >
                        View source
                      </a>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
