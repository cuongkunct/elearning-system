"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

import { EyeIcon, UserIcon } from "@/components/icons";

export default function SortButtons() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeSort, setActiveSort] = useState<string>("");

  useEffect(() => {
    const sort = searchParams.get("sort") || "";
    setActiveSort(sort);
  }, [searchParams]);

  const handleSort = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    setActiveSort(sort);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 py-4 lg:py-0 items-center">
      <p className="font-semibold flex items-center justify-center">Sort by:</p>
      <Button
        variant={activeSort === "viewed" ? "solid" : "bordered"}
        color="primary"
        endContent={<EyeIcon />}
        onPress={() => handleSort("viewed")}
      >
        Top viewed
      </Button>

      <Button
        variant={activeSort === "joined" ? "solid" : "bordered"}
        color="primary"
        startContent={<UserIcon />}
        onPress={() => handleSort("joined")}
      >        Top joined
      </Button>
    </div>
  );
}
