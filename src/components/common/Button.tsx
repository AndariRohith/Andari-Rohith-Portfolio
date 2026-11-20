import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className,
  href,
  download,
  target,
  rel,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer gap-2';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-6 py-3.5',
  };

  const variantClasses = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-0.5',
    secondary: 'bg-portfolio-brush/60 hover:bg-portfolio-brush dark:bg-slate-800 dark:hover:bg-slate-700 text-portfolio-dark dark:text-white',
    outline: 'border border-portfolio-brush dark:border-slate-700 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md',
    ghost: 'hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/20'
  };

  const combined = cn(baseClasses, sizeClasses[size], variantClasses[variant], className);

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        className={combined}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button className={combined} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
