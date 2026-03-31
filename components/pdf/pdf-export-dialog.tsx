"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileDown, BookOpen } from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "education", label: "Education & Awards" },
  { id: "career", label: "Career" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "sharing", label: "Sharing" },
  { id: "contact", label: "Contact" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

interface PdfExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PdfExportDialog({ open, onOpenChange }: PdfExportDialogProps) {
  const [selected, setSelected] = useState<Record<SectionId, boolean>>(
    () =>
      Object.fromEntries(SECTIONS.map((s) => [s.id, true])) as Record<
        SectionId,
        boolean
      >,
  );

  const allChecked = Object.values(selected).every(Boolean);
  const noneChecked = Object.values(selected).every((v) => !v);

  const toggleAll = useCallback(() => {
    const next = !allChecked;
    setSelected(
      Object.fromEntries(SECTIONS.map((s) => [s.id, next])) as Record<
        SectionId,
        boolean
      >,
    );
  }, [allChecked]);

  const handlePrint = useCallback(async () => {
    // 선택되지 않은 섹션 숨기기
    const hidden: HTMLElement[] = [];
    for (const s of SECTIONS) {
      if (!selected[s.id]) {
        const el = document.getElementById(s.id);
        if (el) {
          el.classList.add("print-hidden");
          hidden.push(el);
        }
      }
    }

    // lazy loading 이미지 강제 로드
    const lazyImages = document.querySelectorAll<HTMLImageElement>(
      'img[loading="lazy"]',
    );
    lazyImages.forEach((img) => img.setAttribute("loading", "eager"));

    // 모든 이미지 로드 대기
    await Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise<void>((resolve) => {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }),
        ),
    );

    onOpenChange(false);

    // 다이얼로그 닫히는 애니메이션 후 프린트
    requestAnimationFrame(() => {
      setTimeout(() => {
        window.print();
        // 프린트 후 복원
        hidden.forEach((el) => el.classList.remove("print-hidden"));
        lazyImages.forEach((img) => img.setAttribute("loading", "lazy"));
      }, 300);
    });
  }, [selected, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">PDF 내보내기</DialogTitle>
          <DialogDescription>
            포함할 섹션을 선택한 후 브라우저 인쇄 기능으로 PDF를 저장하세요
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex items-center space-x-2 pb-2 border-b border-border">
            <Checkbox
              id="select-all"
              checked={allChecked}
              onCheckedChange={toggleAll}
            />
            <Label htmlFor="select-all" className="font-medium cursor-pointer">
              전체 선택
            </Label>
          </div>

          <div className="space-y-3">
            {SECTIONS.map((s) => (
              <div key={s.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`section-${s.id}`}
                  checked={selected[s.id]}
                  onCheckedChange={() =>
                    setSelected((prev) => ({ ...prev, [s.id]: !prev[s.id] }))
                  }
                />
                <Label htmlFor={`section-${s.id}`} className="cursor-pointer">
                  {s.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={handlePrint}
          disabled={noneChecked}
          className="w-full cursor-pointer"
        >
          <FileDown className="size-4 mr-2" />
          PDF 내보내기
        </Button>

        <div className="relative flex items-center py-1">
          <div className="flex-grow border-t border-border" />
          <span className="mx-3 text-xs text-muted-foreground">또는</span>
          <div className="flex-grow border-t border-border" />
        </div>

        <Link href="/projects/all" target="_blank">
          <Button variant="outline" className="w-full cursor-pointer">
            <BookOpen className="size-4 mr-2" />
            전체 프로젝트 PDF 내보내기
          </Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
}
