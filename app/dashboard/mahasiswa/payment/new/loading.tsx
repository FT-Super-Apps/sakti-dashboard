import { Skeleton } from "@/utilitas/ui/skeleton"

export default function NewPaymentLoading() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-5 w-[350px] mt-2" />
      </div>

      <Skeleton className="h-[400px] rounded-xl" />
    </div>
  )
}

