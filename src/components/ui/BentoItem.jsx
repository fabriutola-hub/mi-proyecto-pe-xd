import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function BentoItem({
  className,
  title,
  description,
  header,
  icon,
  span = "", // e.g., "md:col-span-2"
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={cn(
        "row-span-1 rounded-none group/bento hover:shadow-xl transition duration-200 shadow-none border border-slate bg-slate justify-between flex flex-col space-y-4",
        "hover:border-neon-lichen/50", // Hover effect
        span,
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200 p-4">
        {icon}
        <div className="font-display font-bold text-neon-lichen mb-2 mt-2">
          {title}
        </div>
        <div className="font-body font-normal text-granite text-xs">
          {description}
        </div>
      </div>
    </motion.div>
  );
}
