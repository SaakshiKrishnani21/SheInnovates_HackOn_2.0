import { useState } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, UserPlus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const DOMAINS = ["AI/ML", "Web", "Blockchain", "Mobile", "IoT", "DevOps", "Cybersecurity"];
const YEARS = ["1st", "2nd", "3rd", "4th"];

export default function AddData() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Success! 🎉",
        description: "Student profile has been added to CampusIQ.",
      });
      setLocation("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl relative">
        <Button 
          variant="ghost" 
          className="absolute -top-16 left-0 text-white/60 hover:text-white hover:bg-white/10"
          onClick={() => setLocation('/')}
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8 space-y-2">
            <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
              <UserPlus className="w-8 h-8 text-primary" />
              Add Student Profile
            </h1>
            <p className="text-white/60">Enrich the institutional knowledge graph.</p>
          </div>

          <Card className="glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Student Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4 text-primary">
                  <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-xs font-bold">1</div>
                  <h2 className="text-lg font-semibold">Basic Info</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white/80">Full Name</Label>
                    <Input id="name" required className="glass-input" placeholder="e.g. John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-white/80">Department</Label>
                    <Input id="department" required className="glass-input" placeholder="e.g. CSE" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Academic Year</Label>
                  <Select required>
                    <SelectTrigger className="glass-input">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E293B] border-white/10 text-white">
                      {YEARS.map(y => (
                        <SelectItem key={y} value={y} className="focus:bg-white/10 focus:text-white">{y} Year</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Skills */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4 text-secondary">
                  <div className="w-6 h-6 rounded bg-secondary/20 flex items-center justify-center text-xs font-bold">2</div>
                  <h2 className="text-lg font-semibold">Skills</h2>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-white/80">Technical Skills</Label>
                  <Input 
                    id="skills" 
                    required 
                    className="glass-input" 
                    placeholder="React, Node.js, Python, AWS (comma separated)" 
                  />
                  <p className="text-xs text-white/40">These will be automatically split and tagged in the network.</p>
                </div>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Project */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4 text-accent">
                  <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center text-xs font-bold">3</div>
                  <h2 className="text-lg font-semibold">Featured Project</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectTitle" className="text-white/80">Project Title</Label>
                    <Input id="projectTitle" required className="glass-input" placeholder="e.g. Smart Irrigation System" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/80">Domain</Label>
                    <Select required>
                      <SelectTrigger className="glass-input">
                        <SelectValue placeholder="Select domain" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1E293B] border-white/10 text-white">
                        {DOMAINS.map(d => (
                          <SelectItem key={d} value={d} className="focus:bg-white/10 focus:text-white">{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-6 text-lg bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-white font-semibold shadow-lg shadow-primary/20"
                data-testid="button-submit-data"
              >
                {isSubmitting ? (
                  "Processing..."
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Add to CampusIQ Graph
                  </>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}