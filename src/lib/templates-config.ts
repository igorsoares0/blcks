export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  githubRepo: string; // formato: owner/repo
}

export const templatesConfig: Record<string, TemplateConfig> = {
  dashboard: {
    id: 'dashboard',
    name: 'Modern Dashboard',
    description: 'Complete admin dashboard with authentication, charts, tables, and more',
    githubRepo: 'devforgeink/dashdash', // TODO: Substituir pelo repo real
  },
  landing: {
    id: 'landing',
    name: 'SaaS Landing Page',
    description: 'High-converting landing page template with 15+ sections',
    githubRepo: 'devforgeink/uild', // TODO: Substituir pelo repo real
  },
};

export function getTemplateConfig(templateId: string): TemplateConfig | null {
  return templatesConfig[templateId] || null;
}

export function isValidTemplateId(templateId: string): boolean {
  return templateId in templatesConfig;
}
