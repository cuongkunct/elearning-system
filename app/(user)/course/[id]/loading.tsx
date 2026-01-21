import SkeletonCard from "@/components/user/shared/SkeletonCard";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SkeletonCard numberCard={4} />
    </div>
  );
}