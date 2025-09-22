import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, DollarSign, Briefcase } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Job {
  id: string;
  title: string;
  company: string;
  description: string | null;
  location: string | null;
  salary_range: string | null;
  job_type: string | null;
  experience_level: string | null;
  skills: string[] | null;
  posted_date: string;
  is_active: boolean;
}

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">{job.title}</CardTitle>
            <p className="text-sm text-muted-foreground font-medium">{job.company}</p>
          </div>
          {!job.is_active && (
            <Badge variant="secondary" className="text-xs">
              Inactive
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {job.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {job.description}
          </p>
        )}

        <div className="space-y-2">
          {job.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
          )}

          {job.salary_range && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>{job.salary_range}</span>
            </div>
          )}

          {job.job_type && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              <span className="capitalize">{job.job_type.replace('-', ' ')}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Posted {formatDistanceToNow(new Date(job.posted_date))} ago</span>
          </div>
        </div>

        {job.skills && job.skills.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Skills:</p>
            <div className="flex flex-wrap gap-1">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2">
          <Button className="w-full" disabled={!job.is_active}>
            {job.is_active ? 'Apply Now' : 'Position Closed'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};