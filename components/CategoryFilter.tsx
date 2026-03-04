"use client";

import { Category } from "@/lib/amazonProducts";

type Props = {
  categories: Category[];
  selected: Category | "All";
  onChange: (cat: Category | "All") => void;
};

export default function CategoryFilter({ categories, selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <button
        onClick={() => onChange("All")}
        className={`px-4 py-2 rounded-lg ${
          selected === "All" ? "bg-white text-black" : "bg-white/10"
        }`}
      >
        Tous
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-lg ${
            selected === cat ? "bg-white text-black" : "bg-white/10"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}