-- Enable Row Level Security on jobs table
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view active jobs (public job board)
CREATE POLICY "Anyone can view active jobs" 
ON public.jobs 
FOR SELECT 
USING (is_active = true);

-- Enable Row Level Security on employees table  
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view employees (if needed for company profiles)
CREATE POLICY "Anyone can view employees" 
ON public.employees 
FOR SELECT 
USING (true);