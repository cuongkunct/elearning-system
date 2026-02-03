"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

import { FilterIcon, ResetFilter } from "@/components/icons";
import { Category } from "@/types/user/category/category.type";
type Props = {
  categories: Category[];
};

export default function CategoriesFilter({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const selectedCategory = searchParams.get("id") || "";

  const handleSelectCategory = (maDanhMuc: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (selectedCategory === maDanhMuc) {
        params.delete("id");
      } else {
        params.set("id", maDanhMuc);
      }

      params.delete("page");
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  const renderCategory = () => {
    return categories.map((category: Category) => {
      const isActive = selectedCategory === category.maDanhMuc;

      return (
        <Button
          key={category.maDanhMuc}
          isLoading={isPending}
          className="hidden sm:hidden md:hidden lg:block xl:block"
          color={isActive ? "primary" : "default"}
          onPress={() => {
            handleSelectCategory(category.maDanhMuc);
          }}
        >
          {category.tenDanhMuc}
        </Button>
      );
    });
  };

  const renderCategoryMobile = (onClose: () => void) => {
    return categories.map((category: Category) => {
      const isActive = selectedCategory === category.maDanhMuc;

      return (
        <Button
          key={category.maDanhMuc}

          fullWidth
          color={isActive ? "primary" : "default"}
          onPress={() => {
            handleSelectCategory(category.maDanhMuc);
            onClose();
          }}
        >
          {category.tenDanhMuc}
        </Button>
      );
    });
  };

  return (
    <>
      <div className="flex-[1.5] flex flex-col gap-3">
        <h1 className="text-xl font-semibold pb-9">Categories</h1>
        <Button
          className="flex gap-2 lg:hidden"
          color="success"
          endContent={<FilterIcon />}
          onPress={onOpen}
        >
          Filter by Category
        </Button>
        <Button
          color="danger"
          endContent={<ResetFilter />}
          onPress={() => {
            const params = new URLSearchParams(searchParams.toString());

            params.delete("id");
            params.delete("page");
            router.push(`?${params.toString()}`, { scroll: false });
          }}
        >
          Reset Filter
        </Button>
        <div className="hidden lg:flex items-center justify-center">
          <hr className="w-[70%] text-gray-300" />
        </div>
        {renderCategory()}
      </div>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Filter by Category
              </DrawerHeader>

              <DrawerBody>{renderCategoryMobile(onClose)}</DrawerBody>

              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
