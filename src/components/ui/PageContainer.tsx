interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return <div className="mx-auto max-w-7xl space-y-8">{children}</div>;
}
