import { Code2, Link2, PenLine } from "lucide-react";
import { contactInfo } from "@/data/contact";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Code2,
  linkedin: Link2,
  "pen-line": PenLine,
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          {contactInfo.socials.map((social) => {
            const Icon = iconMap[social.icon];
            if (!Icon) return null;
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-150 cursor-pointer"
                aria-label={social.platform}
              >
                <Icon className="size-5" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
