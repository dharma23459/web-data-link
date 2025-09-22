import { JobBoard } from "@/components/JobBoard";
import { Search, Briefcase, Users, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Millet Job Hub</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Jobs</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Companies</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
              <Button variant="outline">Sign In</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Find Your Dream Job Today
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover thousands of job opportunities from top companies. Your next career move starts here.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search jobs, companies, or keywords..." 
                className="pl-10"
              />
            </div>
            <Button className="px-8">Search</Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Briefcase className="h-6 w-6 text-primary mr-2" />
                <span className="text-2xl font-bold text-foreground">500+</span>
              </div>
              <p className="text-muted-foreground">Active Jobs</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-primary mr-2" />
                <span className="text-2xl font-bold text-foreground">100+</span>
              </div>
              <p className="text-muted-foreground">Companies</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-primary mr-2" />
                <span className="text-2xl font-bold text-foreground">95%</span>
              </div>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-2">Latest Job Opportunities</h3>
            <p className="text-muted-foreground">Explore our newest job postings from leading companies</p>
          </div>
          
          <JobBoard />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Millet Job Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
