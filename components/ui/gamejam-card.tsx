"use client";

import Image from "next/image";
import type { GameJamProject } from "@/data/types";

interface GameJamCardProps {
  project: GameJamProject;
}

export function GameJamCard({ project }: GameJamCardProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${project.youtubeId}`;

  return (
    <a
      href={youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
    >
      {/* 16:9 thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />

        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <svg
            className="h-14 w-14 text-white drop-shadow-lg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>
      </div>
    </a>
  );
}
