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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 space-y-1">
        {eyebrow && (
          <p className="text-sm font-medium text-violet-400">{eyebrow}</p>
        )}
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl text-balance">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted sm:text-base">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
