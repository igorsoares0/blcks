'use client';

interface PreviewThemeWrapperProps {
  themeColors: Record<string, string>;
  children: React.ReactNode;
}

export function PreviewThemeWrapper({ themeColors, children }: PreviewThemeWrapperProps) {
  const hasOverrides = Object.keys(themeColors).length > 0;

  if (!hasOverrides) {
    return <>{children}</>;
  }

  return (
    <div style={themeColors}>
      {children}
    </div>
  );
}
