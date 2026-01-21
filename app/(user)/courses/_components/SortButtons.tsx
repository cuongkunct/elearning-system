"use client";

import { Button } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

import { EyeIcon, UserIcon } from "@/components/icons";

export default function SortButtons() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSort = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", sort);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 py-4 lg:py-0">
      <p className="font-semibold flex items-center justify-center">Sort by:</p>
      <Button
        color="success"
        endContent={<EyeIcon />}
        onPress={() => handleSort("viewed")}
      >
        Top viewed
      </Button>

      <Button
        color="success"
        startContent={<UserIcon />}
        variant="bordered"
        onPress={() => handleSort("joined")}
      >
        Top joined
      </Button>
    </div>
  );
}
