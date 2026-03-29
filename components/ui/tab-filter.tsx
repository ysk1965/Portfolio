"use client";

import { motion } from "framer-motion";

interface Tab {
  id: string;
  label: string;
}

interface TabFilterProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function TabFilter({ tabs, activeTab, onChange }: TabFilterProps) {
  return (
    <div className="flex gap-6 border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative cursor-pointer pb-3 text-sm font-medium transition-colors duration-200 ${
            activeTab === tab.id
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="tab-underline"
              className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
