-- Create jobs table for the job board
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT,
  location TEXT,
  salary_range TEXT,
  job_type TEXT CHECK (job_type IN ('full-time', 'part-time', 'contract', 'internship')),
  experience_level TEXT CHECK (experience_level IN ('entry', 'mid', 'senior', 'executive')),
  skills TEXT[],
  posted_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  application_deadline TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add some sample job data
INSERT INTO public.jobs (title, company, description, location, salary_range, job_type, experience_level, skills) VALUES
('Frontend Developer', 'TechCorp', 'Build amazing user interfaces with React and TypeScript', 'San Francisco, CA', '$80k - $120k', 'full-time', 'mid', ARRAY['React', 'TypeScript', 'CSS']),
('Backend Engineer', 'DataFlow Inc', 'Design and implement scalable backend systems', 'Remote', '$90k - $140k', 'full-time', 'senior', ARRAY['Node.js', 'PostgreSQL', 'AWS']),
('UI/UX Designer', 'Creative Studio', 'Create beautiful and intuitive user experiences', 'New York, NY', '$70k - $100k', 'full-time', 'mid', ARRAY['Figma', 'Adobe XD', 'Prototyping']),
('Data Scientist', 'AI Solutions', 'Analyze data and build machine learning models', 'Austin, TX', '$100k - $150k', 'full-time', 'senior', ARRAY['Python', 'ML', 'Statistics']),
('DevOps Engineer', 'CloudTech', 'Manage infrastructure and deployment pipelines', 'Seattle, WA', '$85k - $130k', 'full-time', 'mid', ARRAY['Docker', 'Kubernetes', 'AWS']);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();