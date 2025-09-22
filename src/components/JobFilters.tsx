import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";

interface JobFiltersProps {
  searchTerm: string;
  onSearchChange: (search: string) => void;
  selectedJobType: string;
  onJobTypeChange: (type: string) => void;
  selectedExperienceLevel: string;
  onExperienceLevelChange: (level: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  activeFilters: string[];
  onClearFilters: () => void;
}

export const JobFilters = ({
  searchTerm,
  onSearchChange,
  selectedJobType,
  onJobTypeChange,
  selectedExperienceLevel,
  onExperienceLevelChange,
  selectedLocation,
  onLocationChange,
  activeFilters,
  onClearFilters,
}: JobFiltersProps) => {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search jobs, companies, or skills..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-48">
          <Label htmlFor="job-type">Job Type</Label>
          <Select value={selectedJobType} onValueChange={onJobTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full Time</SelectItem>
              <SelectItem value="part-time">Part Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-48">
          <Label htmlFor="experience">Experience Level</Label>
          <Select value={selectedExperienceLevel} onValueChange={onExperienceLevelChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="entry">Entry Level</SelectItem>
              <SelectItem value="mid">Mid Level</SelectItem>
              <SelectItem value="senior">Senior Level</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-48">
          <Label htmlFor="location">Location</Label>
          <Input
            placeholder="Enter location..."
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
          />
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="gap-1">
              {filter}
              <X className="h-3 w-3 cursor-pointer" />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};