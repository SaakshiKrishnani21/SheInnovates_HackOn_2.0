import ForceGraph2D from "react-force-graph-2d";

type Props = {
  student?: any;
};

export default function KnowledgeGraph({ student }: Props) {

  if (!student) {
    return (
      <div className="flex items-center justify-center h-[600px] text-white">
        Loading graph...
      </div>
    );
  }

  const studentName = student.name || "Student";

  const skills = student.skills || [];
  const projects = student.projects || [];
  const research = student.research || [];

  const nodes: any[] = [
    { id: studentName, type: "student" },

    { id: "Skills", type: "category" },
    { id: "Projects", type: "category" },
    { id: "Research", type: "category" }
  ];

  const links: any[] = [
    { source: studentName, target: "Skills" },
    { source: studentName, target: "Projects" },
    { source: studentName, target: "Research" }
  ];

  skills.forEach((skill: string) => {
    nodes.push({ id: skill, type: "skill" });
    links.push({ source: "Skills", target: skill });
  });

  projects.forEach((project: any) => {
    const title = project.title || project;
    nodes.push({ id: title, type: "project" });
    links.push({ source: "Projects", target: title });
  });

  research.forEach((paper: any) => {
    const title = paper.title || paper;
    nodes.push({ id: title, type: "research" });
    links.push({ source: "Research", target: title });
  });

  const getColor = (type: string) => {
    if (type === "student") return "#6366f1";
    if (type === "category") return "#06b6d4";
    if (type === "skill") return "#22c55e";
    if (type === "project") return "#f59e0b";
    if (type === "research") return "#ef4444";
    return "#38bdf8";
  };

  return (
    <div className="flex justify-center items-center w-full h-[650px] bg-[#020617] rounded-xl">

      <ForceGraph2D
        graphData={{ nodes, links }}

        nodeCanvasObject={(node: any, ctx, globalScale) => {

          const label = node.id;
          const fontSize = 14/globalScale;

          ctx.beginPath();
          ctx.arc(node.x!, node.y!, node.type === "student" ? 14 : 10, 0, 2*Math.PI);

          ctx.fillStyle = getColor(node.type);
          ctx.shadowBlur = 15;
          ctx.shadowColor = getColor(node.type);
          ctx.fill();

          ctx.shadowBlur = 0;

          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = "white";
          ctx.fillText(label, node.x! + 12, node.y! + 4);

        }}

        linkColor={() => "rgba(255,255,255,0.3)"}

        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}

        nodeRelSize={8}

      />

    </div>
  );
}