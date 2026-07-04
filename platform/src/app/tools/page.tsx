import Link from "next/link";
import type { Metadata } from "next";
import { store } from "@/lib/graph/store";
import { href } from "@/lib/graph/format";
import { DomainChip, Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Tools" };

export default function ToolsIndex() {
  const tools = [...store.tools()].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-6">
      <header>
        <Eyebrow>The means of engagement</Eyebrow>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Tools</h1>
        <p className="mt-2 max-w-reading text-sm text-ink-dim">
          Portable methods and techniques — tracked not as abstract
          capabilities but by the problems they engage and the patterns they
          fit.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => {
          const applies = store.edgesFrom(t.id, "applies_to").length;
          const good = store.edgesFrom(t.id, "good_for").length;
          const parent = store.edgesFrom(t.id, "variant_of")[0];
          return (
            <Link key={t.id} href={href("tool", t.id)} className="card card-hover p-4">
              <div className="mb-1.5 text-[0.66rem] uppercase tracking-wider text-rel-uses">Tool</div>
              <p className="text-sm font-medium leading-snug text-ink">{t.name}</p>
              {parent && (
                <p className="mt-1 text-[0.7rem] text-ink-faint">
                  variant of {store.tool(parent.to)?.name}
                </p>
              )}
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {t.domains.map((x) => {
                  const dm = store.domain(x);
                  return dm ? <DomainChip key={x} domain={dm} size="xs" /> : null;
                })}
              </div>
              <div className="mt-2 text-[0.7rem] text-ink-faint">
                {applies} problem{applies === 1 ? "" : "s"} · {good} pattern{good === 1 ? "" : "s"}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
