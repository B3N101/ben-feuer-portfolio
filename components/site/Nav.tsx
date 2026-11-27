import Link from "next/link";
import { FileText } from "lucide-react";

export function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="nav-brand">
          Ben Feuer
        </Link>
        <nav className="nav-links" aria-label="Main">
          <Link href="/#projects">Projects</Link>
          <Link href="/#timeline" className="nav-hide-sm">
            Timeline
          </Link>
          <Link href="/#about" className="nav-hide-sm">
            About
          </Link>
          <Link href="/#contact" className="nav-hide-sm">
            Contact
          </Link>
          <a href="/resume.pdf" target="_blank" rel="noopener" className="nav-cta">
            <FileText size={15} aria-hidden="true" /> Resume
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span>© {new Date().getFullYear()} Ben Feuer · Ann Arbor, MI</span>
        <span>
          <Link href="/#projects">Projects</Link>
          {/* Blog is disabled. To re-enable, rename app/_blog -> app/blog and
              app/api/_upload -> app/api/upload, then restore this link:
          <Link href="/blog">Blog</Link> */}
          <a href="/resume.pdf" target="_blank" rel="noopener">
            Resume
          </a>
        </span>
      </div>
    </footer>
  );
}
