import Link from "next/link";
import { ArrowRight, Box, TriangleAlert } from "lucide-react";
import type { Project } from "@/lib/projects";
import { ModelViewer } from "./ModelViewer";
import { TagIcon } from "./icons";

export function ProjectMedia({ project }: { project: Project }) {
  if (project.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.image}
        alt={project.name}
        loading="lazy"
        className={project.imageFit === "contain" ? "img-contain" : undefined}
      />
    );
  }
  if (project.modelUrl) {
    return <ModelViewer url={project.modelUrl} interactive={false} zoom={false} caption={false} />;
  }
  return null;
}

export function ProjectCard({ project }: { project: Project }) {
  const isCad = !project.image && !!project.modelUrl;
  return (
    <Link href={`/projects/${project.id}`} className="card">
      <div className="card-media">
        <ProjectMedia project={project} />
        <span className="card-tag">
          <TagIcon tag={project.tag} size={13} />
          {project.tag}
        </span>
        {isCad && (
          <span className="card-3d">
            <Box size={12} aria-hidden="true" />
            CAD
          </span>
        )}
        {project.inProgress && <CautionTape />}
        {project.imageCredit && <span className="credit">Photo: {project.imageCredit}</span>}
      </div>
      <div className="card-body">
        <h3>{project.name}</h3>
        <div className="card-meta">
          {project.subtitle} · {project.date}
        </div>
        {project.status && <div className="card-status">{project.status}</div>}
        <p>{project.summary}</p>
        <span className="card-more">
          View project <ArrowRight size={15} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

function CautionTape() {
  return (
    <div className="caution" role="note" aria-label="In progress">
      <div className="caution-text" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i}>
            <TriangleAlert size={14} strokeWidth={2.5} />
            In progress
          </span>
        ))}
      </div>
    </div>
  );
}
