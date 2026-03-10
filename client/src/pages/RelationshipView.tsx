import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search } from "lucide-react";
import { MOCK_STUDENTS } from "../lib/mockData";
import { motion } from "framer-motion";
import KnowledgeGraph from "../components/ui/KnowledgeGraph";

export default function RelationshipView() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const studentId = parseInt(params.id || "1", 10);

  const student =
    MOCK_STUDENTS.find((s) => s.id === studentId) || MOCK_STUDENTS[0];

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-6xl mx-auto flex flex-col">
      <header className="flex justify-between items-center mb-12">
        <Button
          variant="ghost"
          className="text-white/60 hover:text-white hover:bg-white/10"
          onClick={() => setLocation("/")}
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Button
          variant="outline"
          className="border-white/10 text-white/80 hover:bg-white/5"
          onClick={() => setLocation("/")}
        >
          <Search className="w-4 h-4 mr-2" />
          Find similar students
        </Button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center relative min-h-[600px] w-full">

        {/* NETWORK GRAPH UI */}
        <div className="relative w-full max-w-4xl mx-auto h-[600px] flex items-center justify-center">

          {/* CENTRAL STUDENT NODE */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute z-10 w-64 p-6 glass-card rounded-2xl flex flex-col items-center text-center shadow-[0_0_50px_rgba(99,102,241,0.2)] border-primary/30"
          >
            <div className="w-24 h-24 mb-4 rounded-full p-1 bg-gradient-to-tr from-primary to-accent">
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="w-full h-full rounded-full bg-background"
              />
            </div>

            <h1 className="text-2xl font-bold text-white mb-1">
              {student.name}
            </h1>

            <p className="text-white/60 font-medium">
              {student.department} • {student.year}
            </p>
          </motion.div>

          {/* SKILL NODES */}
          {student.skills.map((skill, index) => {
            const angle =
              (Math.PI / (student.skills.length + 1)) * (index + 1) -
              Math.PI / 2;

            const radius = 220;

            const top = `calc(50% + ${Math.sin(angle) * radius}px)`;
            const left = `calc(50% + ${Math.cos(angle) * radius}px)`;

            return (
              <motion.div
                key={`skill-${skill}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="absolute z-20"
                style={{
                  top,
                  left,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* CONNECTION LINE */}
                <svg
                  className="absolute w-[200px] h-[2px] -z-10 text-primary/30 stroke-current -left-[100px] top-1/2 -translate-y-1/2 pointer-events-none origin-left"
                  style={{
                    transform: `rotate(${angle * (180 / Math.PI) + 180}deg)`,
                  }}
                >
                  <line
                    x1="0"
                    y1="1"
                    x2="200"
                    y2="1"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                </svg>

                <div className="glass-card px-6 py-3 rounded-full border-secondary/30 bg-secondary/10 shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                  <span className="font-semibold text-secondary-foreground">
                    {skill}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* PROJECT NODE */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-[5%] left-1/2 -translate-x-1/2 z-20"
          >
            <svg
              className="absolute h-[150px] w-[2px] -z-10 text-accent/30 stroke-current left-1/2 -top-[120px] -translate-x-1/2 pointer-events-none"
            >
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="150"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>

            <div className="glass-card p-6 rounded-xl border-accent/30 w-80 text-center bg-accent/5">
              <Badge className="mb-3 bg-accent/20 text-accent hover:bg-accent/30 border-none">
                {student.projects[0].domain}
              </Badge>

              <h3 className="text-xl font-bold text-white mb-2">
                {student.projects[0].title}
              </h3>

              <p className="text-sm text-white/50">
                Featured Project
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* KNOWLEDGE GRAPH SECTION */}

      <div className="mt-20 w-full">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Student Knowledge Graph
        </h2>

        <KnowledgeGraph student={student}/>
      </div>
    </div>
  );
}