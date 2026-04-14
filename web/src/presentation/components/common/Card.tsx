import type { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface CardProps {
  title?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function Card({ title, icon: Icon, children, className, action }: CardProps) {
  return (
    <div className={clsx('bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden', className)}>
      {(title || action) && (
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          {title && (
            <div className="flex items-center gap-3">
              {Icon && <Icon className="w-5 h-5 text-blue-600" />}
              <h3 className="font-semibold text-gray-900">{title}</h3>
            </div>
          )}
          {action}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
