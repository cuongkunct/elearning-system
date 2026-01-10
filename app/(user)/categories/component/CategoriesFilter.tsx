"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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

type Props = {
  categories: {
    maDanhMuc: string;
    tenDanhMuc: string;
  }[];
};

export default function CategoriesFilter({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // Update URL khi selectedCategory thay đổi
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategory) {
      params.set("id", selectedCategory);
    } else {
      params.delete("id");
    }
    if (selectedCategory) {
      params.delete("page");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [selectedCategory, router, searchParams]);

  const handleSelectCategory = (maDanhMuc: string) => {
    setSelectedCategory((prev) => (prev === maDanhMuc ? "" : maDanhMuc));
  };

  const renderCategory = () => {
    return categories.map((c) => {
      const isActive = selectedCategory === c.maDanhMuc;
      return (
        <Button
          key={c.maDanhMuc}
          onPress={() => handleSelectCategory(c.maDanhMuc)}
          color={isActive ? "primary" : "default"}
          className="hidden sm:hidden md:hidden lg:block xl:block"
        >
          {c.tenDanhMuc}
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
          onPress={onOpen}
          endContent={<FilterIcon />}
        >
          Filter by Category
        </Button>

        <Button
          onPress={() => setSelectedCategory("")}
          color="danger"
          endContent={<ResetFilter />}
        >
          Reset Filter
        </Button>
        <div className="hidden lg:flex items-center justify-center">
          <hr className="w-[70%] text-gray-300" />
        </div>
        {renderCategory()}
      </div>
      <Drawer
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Filter by Category
              </DrawerHeader>
              <DrawerBody>{renderCategory()}</DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
