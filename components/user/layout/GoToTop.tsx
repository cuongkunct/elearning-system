"use client";

import { GoToTopIcon } from "@/components/icons";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";

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
    <Button className="fixed bottom-12 right-12 z-50 shadow-lg hover:scale-105 transition" isIconOnly aria-label="Go to top" onPress={handleScrollTop} color="primary" variant="faded">
      <GoToTopIcon />
    </Button>
  );
}