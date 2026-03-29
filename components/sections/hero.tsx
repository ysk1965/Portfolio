"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";

const channels = [
  {
    href: "https://github.com/ysk1965",
    src: "/logo/logo_github.png",
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/sangkeon-y-37303a182/",
    src: "/logo/logo_linkedin.png",
    label: "LinkedIn",
  },
] as const;

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  };

  const item = prefersReducedMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" as const },
        },
      };

  const imageVariant = prefersReducedMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.95 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.7, ease: "easeOut" as const },
        },
      };

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6">
      <motion.div
        className="flex w-full max-w-5xl flex-col-reverse items-center gap-12 md:flex-row md:items-center md:justify-between md:gap-16"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* 텍스트 영역 */}
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
          <motion.h1
            className="font-heading text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl"
            variants={item}
          >
            유상건
          </motion.h1>

          <motion.p
            className="max-w-md text-lg text-muted-foreground sm:text-xl"
            variants={item}
          >
            기술로 비즈니스 임팩트를 만드는 개발자
          </motion.p>

          <motion.div className="flex items-center gap-3" variants={item}>
            {channels.map(({ href, src, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Image src={src} alt={label} width={20} height={20} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* 프로필 사진 영역 - 3D tilt */}
        <ProfileCard
          imageVariant={imageVariant}
          prefersReducedMotion={prefersReducedMotion}
        />
      </motion.div>

      <div className="absolute bottom-8">
        <ScrollIndicator />
      </div>
    </section>
  );
}

function ProfileCard({
  imageVariant,
  prefersReducedMotion,
}: {
  imageVariant: Variants;
  prefersReducedMotion: boolean | null;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [12, -12]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-12, 12]),
    springConfig,
  );
  const glareX = useSpring(
    useTransform(mouseX, [0, 1], [0, 100]),
    springConfig,
  );
  const glareY = useSpring(
    useTransform(mouseY, [0, 1], [0, 100]),
    springConfig,
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY, prefersReducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="shrink-0"
      variants={imageVariant}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-[420px] w-[320px] sm:h-[500px] sm:w-[380px] md:h-[560px] md:w-[420px]"
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* 뒤쪽 두께 레이어 (측면 입체감) */}
        <div
          className="absolute inset-0 rounded-2xl bg-neutral-300 dark:bg-neutral-600"
          style={{ transform: "translateZ(-8px)" }}
        />
        <div
          className="absolute inset-0 rounded-2xl bg-neutral-200 dark:bg-neutral-500"
          style={{ transform: "translateZ(-4px)" }}
        />

        {/* 뒤쪽 그림자 */}
        <div
          className="absolute -inset-1 rounded-2xl bg-black/15 blur-xl"
          style={{ transform: "translateZ(-12px)" }}
        />

        {/* 사진 (앞면) */}
        <Image
          src="/images/profile.jpeg"
          alt="유상건 프로필 사진"
          fill
          priority
          className="rounded-2xl border border-neutral-200 object-cover object-top dark:border-neutral-700"
          sizes="(max-width: 768px) 320px, 420px"
        />

        {/* 빛 반사 글레어 */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]: number[]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            ),
          }}
        />
      </motion.div>
    </motion.div>
  );
}
