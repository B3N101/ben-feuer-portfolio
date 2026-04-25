"use client";

import { useEffect, useState } from "react";
import { Model } from "./Model";
import { Placeholder } from "./Placeholder";

export function ModelWithFallback({
  url,
  explode,
  color,
}: {
  url?: string;
  explode: number;
  color?: string;
}) {
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    if (!url) {
      setExists(false);
      return;
    }
    let cancelled = false;
    fetch(url, { method: "HEAD" })
      .then((r) => {
        if (!cancelled) setExists(r.ok);
      })
      .catch(() => !cancelled && setExists(false));
    return () => {
      cancelled = true;
    };
  }, [url]);

  if (exists === null || !url || !exists) {
    return <Placeholder explode={explode} color={color} />;
  }
  return <Model url={url} explode={explode} />;
}
