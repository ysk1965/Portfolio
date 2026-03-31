"use client";

import { useState } from "react";
import { FileDown } from "lucide-react";
import { PdfExportDialog } from "./pdf-export-dialog";

export function PdfDownloadButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        aria-label="이력서 PDF 다운로드"
      >
        <FileDown className="size-5" />
      </button>
      <PdfExportDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
