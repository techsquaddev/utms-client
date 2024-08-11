import { Skeleton } from "@/components/ui/skeleton";
import { Wrapper } from ".";

const TimetableSkeleton = () => {
  return (
    <div className="mt-10">
      <Wrapper>
        <div>
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="mt-5 h-[120px] w-full rounded-xl" />
          <Skeleton className="mt-10 h-[100px] w-full rounded-xl" />
          <Skeleton className="mt-2.5 h-[100px] w-full rounded-xl" />
          <Skeleton className="mt-2.5 h-[100px] w-full rounded-xl" />
        </div>
      </Wrapper>
    </div>
  );
};

export default TimetableSkeleton;
