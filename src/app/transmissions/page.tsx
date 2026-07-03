import type { Metadata } from "next";
import {
  type ArchiveSearchParams,
  FormatArchive,
  parseArchiveParams,
} from "@/components/FormatArchive";
import { FORMATS } from "@/lib/formats";

export const revalidate = 300;

const meta = FORMATS.transmissions;

export const metadata: Metadata = {
  title: meta.name,
  description: meta.description,
  alternates: {
    canonical: "/transmissions",
    types: {
      "application/rss+xml": [
        { url: "/transmissions/rss.xml", title: "Transmissions · Android Dreams" },
      ],
    },
  },
};

export default function TransmissionsPage({
  searchParams,
}: {
  searchParams: ArchiveSearchParams;
}) {
  const { page, sort } = parseArchiveParams(searchParams);
  return <FormatArchive format="transmissions" page={page} sort={sort} />;
}
