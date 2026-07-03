import { ArticleSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="px-4 py-16 sm:px-6">
      <ArticleSkeleton />
    </div>
  );
}
