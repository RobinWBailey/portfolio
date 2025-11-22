export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  images: string[];
  tags: string[];
  link?: string;
  client?: string;
  role?: string;
  isSelected?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}