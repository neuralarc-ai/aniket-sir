export interface AppItem {
  id: string;
  name: string;
  description: string;
  icon: string; // path under /public/icons/ OR an emoji fallback
  url: string;
  category?: string;
  frequency?: number; // 0-100, higher = more frequently used
}

export type NavCategory =
  | "home"
  | "productivity"
  | "design & creative"
  | "engineering"
  | "finance";
