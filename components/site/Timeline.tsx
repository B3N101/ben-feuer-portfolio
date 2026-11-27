"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import type { TimelineEntry } from "@/lib/projects";
import { TimelineIcon } from "./icons";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "education", label: "Education" },
  { key: "project", label: "Projects & Teams" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

export function TimelineFilters({
  value,
  onChange,
}: {
  value: FilterKey;
  onChange: (k: FilterKey) => void;
}) {
  return (
    <div className="tl-filters" role="group" aria-label="Filter timeline">
      {FILTERS.map((f) => (
        <button
          key={f.key}
          type="button"
          className="tl-filter"
          aria-pressed={value === f.key}
          onClick={() => onChange(f.key)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export function TimelineSection({ entries }: { entries: TimelineEntry[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const shown = entries.filter((e) => filter === "all" || e.kind === filter);

  return (
    <section id="timeline" className="section section-alt">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <CalendarDays size={14} aria-hidden="true" /> Timeline
            </div>
            <h2>Education & Projects</h2>
            <p>The schools I&apos;ve studied at and the teams and projects I&apos;ve worked on, most recent first.</p>
          </div>
          <TimelineFilters value={filter} onChange={setFilter} />
        </div>

        <ol className="timeline">
          {shown.map((e) => (
            <li key={e.org + e.date} className="tl-item" data-kind={e.kind}>
              <div className="tl-date">{e.date}</div>
              <span className="tl-dot">
                <TimelineIcon kind={e.kind} size={14} />
              </span>
              <div className="tl-card">
                <span className="tl-kind">
                  {e.kind === "education" ? "Education" : "Project / Team"}
                </span>
                <h3>{e.org}</h3>
                <div className="tl-role">{e.title}</div>
                {e.place && (
                  <div className="tl-place">
                    <MapPin size={13} aria-hidden="true" /> {e.place}
                  </div>
                )}
                {e.points.length > 0 && (
                  <ul>
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
                {e.projectId && (
                  <Link href={`/projects/${e.projectId}`} className="tl-link">
                    View project <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
