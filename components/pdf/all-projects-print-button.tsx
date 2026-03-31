"use client";

import { useCallback } from "react";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AllProjectsPrintButton() {
  const handlePrint = useCallback(async () => {
    const imgs = document.querySelectorAll<HTMLImageElement>(
      'img[loading="lazy"]',
    );
    imgs.forEach((img) => img.setAttribute("loading", "eager"));

    await Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise<void>((r) => {
              img.onload = () => r();
              img.onerror = () => r();
            }),
        ),
    );

    window.print();
  }, []);

  return (
    <div className="print-hidden mx-auto max-w-5xl px-6 py-8 md:px-8">
      <Button onClick={handlePrint} className="cursor-pointer">
        <FileDown className="size-4 mr-2" />
        전체 프로젝트 PDF 내보내기
      </Button>
    </div>
  );
}
