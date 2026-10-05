import React from 'react';

interface DiarySectionProps {
  id: string;
  title: string;
  badge?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Section wrapper for Mobile Diary Mode
 * Provides an anchor ID for scroll-spy, heading hierarchy, and consistent notebook margins.
 */
export const DiarySection: React.FC<DiarySectionProps> = ({
  id,
  title,
  badge,
  icon,
  action,
  children,
  className = '',
}) => {
  return (
    <section
      id={id}
      className={`scroll-mt-32 pt-5 pb-6 border-b border-[#D9D4C8]/60 ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {icon && <span className="text-[#2457D6] shrink-0">{icon}</span>}
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#171717] font-mono flex items-center gap-2">
            <span>{title}</span>
            {badge && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-[#2457D6] border border-blue-200 font-mono font-medium">
                {badge}
              </span>
            )}
          </h2>
        </div>
        {action && <div>{action}</div>}
      </div>
      <div>{children}</div>
    </section>
  );
};
