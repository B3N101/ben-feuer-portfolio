import {
  ArrowRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Wrench,
} from "lucide-react";
import { Nav, Footer } from "@/components/site/Nav";
import { ProjectCard } from "@/components/site/ProjectCard";
import { TimelineSection } from "@/components/site/Timeline";
import { MichiganBadge, SkillIcon } from "@/components/site/icons";
import { CONTACT, PROJECTS, SKILLS, TIMELINE } from "@/lib/projects";

export default function Home() {
  return (
    <div className="site">
      <Nav />

      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="hero-status">
                Seeking summer internships &amp; co-ops
              </span>
              <h1>
                Hi, I&apos;m Ben<span className="maize">.</span>
              </h1>
              <div className="hero-school">
                <MichiganBadge size={30} />
                <span>
                  Mechanical Engineering
                  <small>University of Michigan · College of Engineering</small>
                </span>
              </div>
              <p className="hero-lede">
                Mechanical Engineering sophomore. Working on MRacing Formula SAE&apos;s
                aerodynamics subteam, where I focus on carbon fiber composite structures. I&apos;ve been building competition robots since high
                school, first in FIRST Robotics and now in combat robotics.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="btn btn-maize">
                  View projects <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a href="#contact" className="btn btn-ghost">
                  <Mail size={16} aria-hidden="true" /> Contact
                </a>
                <a href="/resume.pdf" target="_blank" rel="noopener" className="btn btn-ghost">
                  <FileText size={16} aria-hidden="true" /> Resume
                </a>
              </div>
            </div>
            <div className="hero-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/blog-images/headshot-web.jpg" alt="Ben Feuer" />
              <div className="hero-photo-tag">
                <MichiganBadge size={22} />
                Michigan Engineering
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">
                  <Wrench size={14} aria-hidden="true" /> Portfolio
                </div>
                <h2>Featured Projects</h2>
                <p>Click a project for the problem, my role, the design and the results.</p>
              </div>
            </div>
            <div className="project-grid">
              {PROJECTS.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>

        <TimelineSection entries={TIMELINE} />

        <section id="about" className="section">
          <div className="wrap about-grid">
            <div>
              <div className="eyebrow">About</div>
              <h2 className="about-title">About me</h2>
              <p>
                My first entrance into Engineering was in high school, where I founded my high school's FTC
                Robotics Team and also co-founded a physics club that built
                model rockets, a pneumatic t-shirt cannon, and more.
              </p>
              <p>
                At Purdue I got into combat robots and built some antwieght and beetleweight robots (1lb and 3lb), highlighted by a 3rd place finish at UIUC Robobrawl.
                After transferring to Michigan I founded the Michigan Combat
                Robotics Club where I'm buiding 12lb combat robots, and I also joined MRacing as an aerodynamics and
                composites engineer.
              </p>
              <p>
                Outside engineering: I play club ultimate frisbee, chess, and I have interests in stand-up comedy, Formula 1, Arsenal and the Knicks.
              </p>
              <div className="about-loc">
                <MapPin size={16} aria-hidden="true" /> {CONTACT.location}
              </div>
            </div>
            <div className="skills">
              {SKILLS.map((s) => (
                <div key={s.group} className="skill-group">
                  <h3>
                    <span className="skill-icon">
                      <SkillIcon kind={s.icon} size={16} />
                    </span>
                    {s.group}
                  </h3>
                  <div className="chips">
                    {s.items.map((i) => (
                      <span key={i} className="chip">
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="wrap">
            <div className="eyebrow">Contact</div>
            <h2>
              Let&apos;s build something<span className="maize">.</span>
            </h2>
            <p>
              I&apos;m looking for mechanical engineering summer internships and
              co-ops. The best way to reach me is by email or linkedin.
            </p>
            <div className="contact-links">
              <a className="contact-link" href={`mailto:${CONTACT.email}`}>
                <Mail size={20} aria-hidden="true" />
                <span>
                  <small>Email</small>
                  {CONTACT.email}
                </span>
              </a>
              <a className="contact-link" href={`https://${CONTACT.linkedin}`} target="_blank" rel="noopener">
                <Linkedin size={20} aria-hidden="true" />
                <span>
                  <small>LinkedIn</small>
                  {CONTACT.linkedin}
                </span>
              </a>
              <a className="contact-link" href={`https://${CONTACT.github}`} target="_blank" rel="noopener">
                <Github size={20} aria-hidden="true" />
                <span>
                  <small>GitHub</small>
                  {CONTACT.github}
                </span>
              </a>
              <a className="contact-link" href="/resume.pdf" target="_blank" rel="noopener">
                <FileText size={20} aria-hidden="true" />
                <span>
                  <small>Resume</small>
                  Download PDF
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
