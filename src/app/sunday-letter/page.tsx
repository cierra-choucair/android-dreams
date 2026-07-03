import type { Metadata } from "next";
import {
  type ArchiveSearchParams,
  FormatArchive,
  parseArchiveParams,
} from "@/components/FormatArchive";
import { FORMATS } from "@/lib/formats";

export const revalidate = 300;

const meta = FORMATS["sunday-letter"];

export const metadata: Metadata = {
  title: meta.name,
  description: meta.description,
  alternates: {
    canonical: "/sunday-letter",
    types: {
      "application/rss+xml": [
        { url: "/sunday-letter/rss.xml", title: "The Sunday Letter · Android Dreams" },
      ],
    },
  },
};

export default function SundayLetterPage({
  searchParams,
}: {
  searchParams: ArchiveSearchParams;
}) {
  const { page, sort } = parseArchiveParams(searchParams);
  return <FormatArchive format="sunday-letter" page={page} sort={sort} />;
}
