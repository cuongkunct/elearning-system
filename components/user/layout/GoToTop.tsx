"use client";

import { Button } from "@heroui/button";
import { useEffect, useState } from "react";

import { GoToTopIcon } from "@/components/icons";

export default function GoToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <Button
      isIconOnly
      aria-label="Go to top"
      className="fixed bottom-12 right-12 z-50 shadow-lg hover:scale-105 transition"
      color="primary"
      variant="faded"
      onPress={handleScrollTop}
    >
      <GoToTopIcon />
    </Button>
  );
}
