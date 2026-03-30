import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className, ...props }) => {
  return (
    <div 
      className={twMerge(
        "bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children, className }) => (
  <div className={twMerge("p-6", className)}>
    {children}
  </div>
);

export const CardFooter = ({ children, className }) => (
  <div className={twMerge("p-6 pt-0 flex items-center justify-between", className)}>
    {children}
  </div>
);
