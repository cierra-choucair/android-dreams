import type { Metadata } from "next";
import {
  type ArchiveSearchParams,
  FormatArchive,
  parseArchiveParams,
} from "@/components/FormatArchive";
import { FORMATS } from "@/lib/formats";

export const revalidate = 300;

const meta = FORMATS["deep-read"];

export const metadata: Metadata = {
  title: meta.name,
  description: meta.description,
  alternates: {
    canonical: "/deep-read",
    types: {
      "application/rss+xml": [
        { url: "/deep-read/rss.xml", title: "The Deep Read · Android Dreams" },
      ],
    },
  },
};

export default function DeepReadPage({
  searchParams,
}: {
  searchParams: ArchiveSearchParams;
}) {
  const { page, sort } = parseArchiveParams(searchParams);
  return <FormatArchive format="deep-read" page={page} sort={sort} />;
}
