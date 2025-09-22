import { useState, useMemo } from "react";
import { JobCard } from "@/components/JobCard";
import { JobFilters } from "@/components/JobFilters";
import { useJobs } from "@/hooks/useJobs";
import { Loader2, Briefcase } from "lucide-react";

const Index = () => {
  const { jobs, loading, error } = useJobs();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("all");
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesJobType = selectedJobType === "all" || job.job_type === selectedJobType;
      const matchesExperience = selectedExperienceLevel === "all" || job.experience_level === selectedExperienceLevel;
      const matchesLocation = !selectedLocation || job.location?.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesJobType && matchesExperience && matchesLocation;
    });
  }, [jobs, searchTerm, selectedJobType, selectedExperienceLevel, selectedLocation]);

  const activeFilters = useMemo(() => {
    const filters = [];
    if (selectedJobType !== "all") filters.push(`Type: ${selectedJobType}`);
    if (selectedExperienceLevel !== "all") filters.push(`Level: ${selectedExperienceLevel}`);
    if (selectedLocation) filters.push(`Location: ${selectedLocation}`);
    if (searchTerm) filters.push(`Search: ${searchTerm}`);
    return filters;
  }, [selectedJobType, selectedExperienceLevel, selectedLocation, searchTerm]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedJobType("all");
    setSelectedExperienceLevel("all");
    setSelectedLocation("");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <p className="text-muted-foreground">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Millet Job Hub</h1>
          </div>
          <p className="text-muted-foreground">
            Discover your next career opportunity with {jobs.length} active job listings
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8">
          <JobFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedJobType={selectedJobType}
            onJobTypeChange={setSelectedJobType}
            selectedExperienceLevel={selectedExperienceLevel}
            onExperienceLevelChange={setSelectedExperienceLevel}
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            activeFilters={activeFilters}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Job Listings */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or clearing filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;