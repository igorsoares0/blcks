'use client';

interface PreviewThemeWrapperProps {
  themeColors: Record<string, string>;
  children: React.ReactNode;
}

export function PreviewThemeWrapper({ themeColors, children }: PreviewThemeWrapperProps) {
  const entries = Object.entries(themeColors);

  if (entries.length === 0) {
    return <>{children}</>;
  }

  // Inject theme overrides as a <style> on :root so portals (Sheet, Dialog, etc.) also get themed
  const cssVars = entries.map(([key, value]) => `${key}: ${value};`).join('\n  ');
  const styleContent = `:root {\n  ${cssVars}\n}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleContent }} />
      {children}
    </>
  );
}
