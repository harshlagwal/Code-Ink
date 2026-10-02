export type ToolCategory =
  | 'all'
  | 'ai'
  | 'cloud'
  | 'database'
  | 'ide'
  | 'design'
  | 'api'
  | 'learning'
  | 'utilities';

export type PricingType = 'all' | 'free-forever' | 'generous-tier' | 'student-pack' | 'open-source';

export interface DevTool {
  id: string;
  name: string;
  description: string;
  category: Exclude<ToolCategory, 'all'>;
  domain: string;
  simpleIconSlug?: string;
  websiteUrl: string;
  freeTierDetails: string;
  pricingType: Exclude<PricingType, 'all'>;
  tags: string[];
  featured?: boolean;
  studentPerk?: string;
  brandColor?: string;
  logoUrl?: string;
}

export interface CategoryMeta {
  id: ToolCategory;
  label: string;
  iconName: string;
  count?: number;
  description: string;
}
