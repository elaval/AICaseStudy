import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import heroImage from "@assets/generated_images/AI_neural_network_hero_6e8f3af8.png";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  return (
    <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          AI Cases Dataset
        </h1>
        <p className="mb-8 max-w-2xl text-center text-lg text-foreground/90 sm:text-xl">
          Explore comprehensive AI implementations and case studies
        </p>
        
        <div className="w-full max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search AI cases..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-12 bg-background/95 backdrop-blur-sm text-base"
              data-testid="input-search"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
