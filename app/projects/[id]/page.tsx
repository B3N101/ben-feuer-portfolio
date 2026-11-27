import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Camera, Cog, History, Layers, Ruler, Target, Trophy, User } from "lucide-react";
import { Nav, Footer } from "@/components/site/Nav";
import { ProjectCard, ProjectMedia } from "@/components/site/ProjectCard";
import { ModelViewer } from "@/components/site/ModelViewer";
import { TagIcon } from "@/components/site/icons";
import { PROJECTS } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  return project ? { title: `${project.name} · Ben Feuer` } : {};
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idx = PROJECTS.findIndex((p) => p.id === id);
  if (idx === -1) notFound();
  const project = PROJECTS[idx];
  const next = [1, 2]
    .map((o) => PROJECTS[(idx + o) % PROJECTS.length])
    .filter((p) => p.id !== project.id);

  return (
    <div className="site">
      <Nav />
      <main>
        <div className="wrap">
          <Link href="/#projects" className="pd-back">
            <ArrowLeft size={15} aria-hidden="true" /> All projects
          </Link>

          <header className="pd-head">
            <div className="eyebrow">
              <TagIcon tag={project.tag} size={14} /> {project.tag} · {project.date}
            </div>
            {project.logo ? (
              <h1>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.logo} alt={project.name} className="pd-logo" />
              </h1>
            ) : (
              <h1>{project.name}</h1>
            )}
            <p className="pd-sub">{project.subtitle}</p>
            <div className="pd-meta">
              <span>
                <User size={15} aria-hidden="true" /> <strong>{project.role}</strong>
              </span>
              {project.status && (
                <span>
                  <Trophy size={15} aria-hidden="true" /> <strong>{project.status}</strong>
                </span>
              )}
            </div>
          </header>

          <div className="pd-media">
            {project.video ? (
              <video
                src={project.video}
                poster={project.image}
                controls
                playsInline
                preload="metadata"
              />
            ) : project.modelUrl ? (
              <ModelViewer url={project.modelUrl} label="Interactive CAD model" />
            ) : project.heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.heroImage} alt={project.name} className="img-top" />
            ) : (
              <ProjectMedia project={project} />
            )}
            {project.imageCredit && !project.video && !project.modelUrl && (
              <span className="credit">Photo: {project.imageCredit}</span>
            )}
          </div>

          <div className="pd-body">
            <div>
              <section>
                <h2>Overview</h2>
                <p>{project.summary}</p>
              </section>
              {project.problem && (
                <section>
                  <h2>
                  <Target size={20} aria-hidden="true" /> The problem
                </h2>
                  <p>{project.problem}</p>
                </section>
              )}
              <section>
                <h2>Highlights</h2>
                <ul>
                  {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </section>
              {project.iterations && project.iterations.length > 0 && (
                <section>
                  <h2>
                    <History size={20} aria-hidden="true" /> Design iterations
                  </h2>
                  {project.iterationsNote && <p>{project.iterationsNote}</p>}
                  <ol className={`iter${project.iterations.some((s) => s.portrait) ? " iter-portrait" : ""}`}>
                    {project.iterations.map((step) => (
                      <li key={step.label} className="iter-step">
                        <div className="iter-media">
                          {step.video ? (
                            <video
                              src={step.video}
                              poster={step.image}
                              controls
                              playsInline
                              preload="none"
                            />
                          ) : (
                            step.image && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={step.image} alt={`${project.name} ${step.label}`} loading="lazy" />
                            )
                          )}
                          <span className="iter-label">{step.label}</span>
                        </div>
                        <h3>{step.title}</h3>
                        <p>{step.caption}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              )}
              {project.gallery && project.gallery.length > 0 && (
                <section>
                  <h2>
                    <Camera size={20} aria-hidden="true" /> Gallery
                  </h2>
                  <div className="gallery">
                    {project.gallery.map((g) => (
                      <figure key={g.src}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={g.src} alt={g.caption} loading="lazy" />
                        <figcaption>
                          {g.caption}
                          {g.credit && <span> · Photo: {g.credit}</span>}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="pd-side">
              {project.specs && (
                <div className="pd-box">
                  <h3>
                    <Ruler size={14} aria-hidden="true" /> Specs
                  </h3>
                  {project.specs.map((s) => (
                    <div key={s.k} className="kv">
                      <span>{s.k}</span>
                      <span>{s.v}</span>
                    </div>
                  ))}
                </div>
              )}
              {project.materials && (
                <div className="pd-box">
                  <h3>
                    <Layers size={14} aria-hidden="true" /> Materials
                  </h3>
                  {project.materials.map((m) => (
                    <div key={m.label} className="kv">
                      <span>{m.label}</span>
                      <span>{m.value}</span>
                    </div>
                  ))}
                </div>
              )}
              {project.tools.length > 0 && (
                <div className="pd-box">
                  <h3>
                    <Cog size={14} aria-hidden="true" /> Tools
                  </h3>
                  <div className="chips">
                    {project.tools.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>

        <section className="pd-next">
          <div className="wrap">
            <div className="section-head" style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 24 }}>More projects</h2>
            </div>
            <div className="project-grid">
              {next.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
