import type { Metadata } from "next";
import {
  type ArchiveSearchParams,
  FormatArchive,
  parseArchiveParams,
} from "@/components/FormatArchive";
import { FORMATS } from "@/lib/formats";

export const revalidate = 300;

const meta = FORMATS["sci-fi-lens"];

export const metadata: Metadata = {
  title: meta.name,
  description: meta.description,
  alternates: {
    canonical: "/sci-fi-lens",
    types: {
      "application/rss+xml": [
        { url: "/sci-fi-lens/rss.xml", title: "The Sci-Fi Lens · Android Dreams" },
      ],
    },
  },
};

export default function SciFiLensPage({
  searchParams,
}: {
  searchParams: ArchiveSearchParams;
}) {
  const { page, sort } = parseArchiveParams(searchParams);
  return <FormatArchive format="sci-fi-lens" page={page} sort={sort} />;
}
