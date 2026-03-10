import { useState } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MOCK_STUDENTS, interpretSearchQuery } from "../lib/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Code, Library, ArrowRight, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(MOCK_STUDENTS);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setResults(interpretSearchQuery(query));
  };

  const stats = [
    { label: "Total Students", value: MOCK_STUDENTS.length, icon: Users, color: "text-primary" },
    { label: "Total Skills", value: Array.from(new Set(MOCK_STUDENTS.flatMap(s => s.skills))).length, icon: Code, color: "text-secondary" },
    { label: "Total Projects", value: MOCK_STUDENTS.length, icon: Library, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto space-y-12">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold">
            IQ
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">CampusIQ</h1>
        </div>
        <Button 
          onClick={() => setLocation('/add')}
          className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]"
          data-testid="button-add-data"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Data
        </Button>
      </header>

      <section className="text-center space-y-6 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight"
        >
          Discover <span className="text-gradient">Talent,</span><br />
          Skills & Projects
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-white/60 max-w-2xl mx-auto"
        >
          AI-powered institutional knowledge engine. Find the exact team you need using natural language.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto relative mt-8"
        >
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-white/40" />
          </div>
          <Input 
            value={searchQuery}
            onChange={handleSearch}
            placeholder='Try "Find React + AI students" or "Blockchain projects"'
            className="w-full pl-12 pr-4 py-6 text-lg rounded-2xl glass-input shadow-2xl transition-all duration-300 focus:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
            data-testid="input-search"
          />
        </motion.div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (i * 0.1) }}
          >
            <Card className="glass-card p-6 flex items-center gap-4 hover:bg-white/10 transition-colors">
              <div className={`p-4 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/60">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white/90">
          {searchQuery ? `Search Results (${results.length})` : 'Featured Talent'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.slice(0, searchQuery ? results.length : 3).map((student, i) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="glass-card overflow-hidden group hover:border-primary/50 transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={student.avatarUrl} 
                      alt={student.name}
                      className="w-16 h-16 rounded-full bg-white/10 p-1 border-2 border-transparent group-hover:border-primary transition-colors"
                      data-testid={`img-avatar-${student.id}`}
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white" data-testid={`text-student-name-${student.id}`}>
                        {student.name}
                      </h3>
                      <p className="text-sm text-white/60">
                        {student.department} • {student.year} Year
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {student.skills.map(skill => (
                      <Badge 
                        key={skill} 
                        variant="secondary"
                        className="bg-primary/20 text-primary hover:bg-primary/30 border-none"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-white/50 font-medium uppercase tracking-wider">Featured Project</p>
                      <Badge variant="outline" className="text-xs text-accent border-accent/30 bg-accent/10">
                        {student.projects[0].domain}
                      </Badge>
                    </div>
                    <p className="font-medium text-white/90">{student.projects[0].title}</p>
                  </div>
                </div>
                
                <Button 
                  className="w-full rounded-none h-12 bg-white/5 hover:bg-primary text-white/80 hover:text-white transition-colors border-t border-white/10 group-hover:border-transparent"
                  onClick={() => setLocation(`/student/${student.id}`)}
                  data-testid={`button-view-network-${student.id}`}
                >
                  View Network
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </motion.div>
          ))}
          
          {results.length === 0 && (
            <div className="col-span-full py-12 text-center text-white/50">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No students found matching your query.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}