import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTransctionTableTopbar = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
      <div className="w-full sm:flex-1 flex items-center gap-4">
        <Skeleton className="h-10 w-10 aspect-square" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="w-full sm:w-[300px] md:w-[350px] flex items-center gap-4">
        <Skeleton className="h-10 sm:max-w-[200px] w-full" />
        <Skeleton className="h-10 sm:max-w-[200px] w-full" />
      </div>
    </div>
  );
};

export default SkeletonTransctionTableTopbar;
