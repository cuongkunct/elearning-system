"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@heroui/react";

import CourseCard from "./CourseList";

import { EyeIcon, FilterIcon, ResetFilter, UserIcon } from "@/components/icons";
import { Category } from "@/types/user/category/category.type";
import { Course } from "@/types/user/course/course.type";
import SkeletonCard from "@/components/user/shared/SkeletonCard";

interface Props {
  categories: Category[];
  courses: Course[];
  children?: React.ReactNode; // Dùng cho Pagination hoặc Intro nếu cần
}

export default function CourseListWithFilter({
  categories,
  courses,
  children,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeSort, setActiveSort] = useState<string>("");

  const selectedCategory = searchParams.get("id") || "";

  useEffect(() => {
    const sort = searchParams.get("sort") || "";

    setActiveSort(sort);
  }, [searchParams]);

  const handleSort = (sort: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("sort", sort);
      setActiveSort(sort);
      router.push(`?${params.toString()}`);
    });
  };
  // Hàm xử lý Filter
  const handleFilter = (id?: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (!id || selectedCategory === id) {
        params.delete("id");
      } else {
        params.set("id", id);
      }
      params.delete("page");
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="lg:flex w-full gap-6">
      <aside className="flex-[1.5] flex flex-col gap-3">
        <h1 className="text-xl font-semibold pb-4 flex items-center gap-2">
          Categories
        </h1>
        <Button
          className="lg:hidden"
          color="success"
          endContent={<FilterIcon />}
          onPress={onOpen}
        >
          Filter by Category
        </Button>
        <Button
          color="danger"
          endContent={<ResetFilter />}
          isDisabled={isPending}
          variant="flat"
          onPress={() => handleFilter()}
        >
          Reset Filter
        </Button>
        <div className="hidden lg:flex flex-col gap-2  border-t pt-4 border-gray-400">
          {categories.map((cat) => (
            <Button
              key={cat.maDanhMuc}
              className="justify-start font-medium"
              color={selectedCategory === cat.maDanhMuc ? "primary" : "default"}
              isDisabled={isPending}
              onPress={() => handleFilter(cat.maDanhMuc)}
            >
              {cat.tenDanhMuc}
            </Button>
          ))}
        </div>
      </aside>

      <main className="flex-[7] relative">
        <div className="flex gap-2 mb-4 lg:py-0 items-center py-6">
          <p className="font-semibold flex items-center justify-center">
            Sort by:
          </p>
          <Button
            color="primary"
            endContent={<EyeIcon />}
            variant={activeSort === "viewed" ? "solid" : "bordered"}
            onPress={() => handleSort("viewed")}
          >
            Top viewed
          </Button>

          <Button
            color="primary"
            startContent={<UserIcon />}
            variant={activeSort === "joined" ? "solid" : "bordered"}
            onPress={() => handleSort("joined")}
          >
            {" "}
            Top joined
          </Button>
        </div>
        {isPending ? (
          <SkeletonCard numberCard={4} />
        ) : (
          <CourseCard courses={courses} />
        )}
        <div className="mt-8">{children}</div>
      </main>

      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader>Categories</DrawerHeader>
              <DrawerBody className="gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.maDanhMuc}
                    fullWidth
                    color={
                      selectedCategory === cat.maDanhMuc ? "primary" : "default"
                    }
                    variant={
                      selectedCategory === cat.maDanhMuc ? "solid" : "flat"
                    }
                    onPress={() => {
                      handleFilter(cat.maDanhMuc);
                      onClose();
                    }}
                  >
                    {cat.tenDanhMuc}
                  </Button>
                ))}
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
