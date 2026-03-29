"use client";

import { skillCategories } from "@/data/skills";
import { SkillCard } from "@/components/ui/skill-card";

const techCategories = skillCategories.filter((c) => c.type === "tech");
const managementCategories = skillCategories.filter(
  (c) => c.type === "management",
);

export function Skills() {
  return (
    <div>
      <div className="mx-auto max-w-5xl">
        <h2 className="font-heading mb-12 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Skills
        </h2>

        <div className="space-y-16">
          {/* Tech */}
          <div>
            <h3 className="mb-6 text-xl font-semibold text-foreground">Tech</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {techCategories.map((category, index) => (
                <SkillCard
                  key={category.id}
                  category={category}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Management */}
          <div>
            <h3 className="mb-6 text-xl font-semibold text-foreground">
              Management
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {managementCategories.map((category, index) => (
                <SkillCard
                  key={category.id}
                  category={category}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
