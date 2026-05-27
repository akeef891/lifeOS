interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="min-w-0 space-y-1.5">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-400 sm:text-sm sm:normal-case sm:tracking-normal">
            {eyebrow}
          </p>
        )}
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl lg:text-3xl text-balance">
          {title}
        </h2>
        {description && (
          <p className="text-sm leading-relaxed text-muted sm:text-base">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0 self-start sm:self-auto">{action}</div>}
    </div>
  );
}
