import {
  BotIcon,
  ChartColumnIcon,
  CodeIcon,
  DatabaseIcon,
  FilesIcon,
  GlobeIcon,
  HeadsetIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UsersIcon,
  type LucideIcon,
} from 'lucide-react';

/**
 * Icon whitelist shared with the API schema and the admin registry.
 * Keys are the contract — extending the whitelist means updating all three
 * (content model §4.10.1).
 */
export const serviceIconRegistry: Record<string, LucideIcon> = {
  headset: HeadsetIcon,
  files: FilesIcon,
  code: CodeIcon,
  bot: BotIcon,
  'chart-column': ChartColumnIcon,
  globe: GlobeIcon,
  'shield-check': ShieldCheckIcon,
  database: DatabaseIcon,
  users: UsersIcon,
  sparkles: SparklesIcon,
};

export function getServiceIcon(key: string): LucideIcon {
  return serviceIconRegistry[key] ?? SparklesIcon;
}
