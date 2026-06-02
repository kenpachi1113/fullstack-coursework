export interface Character {
  id: number;
  name: string;
  japaneseName: string;
  slug: string;
  description: string;
  abilities: string;
  zanpakuto: string;
  bankai?: string;
  faction: string;
  factionSlug: string;
  squad?: string;
  rank?: string;
  image?: string;
  status: "published" | "draft";
}

export interface Arc {
  id: number;
  title: string;
  slug: string;
  description: string;
  episodes: string;
  sortOrder: number;
  status: "published" | "draft";
}

export interface Faction {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  summary: string;
  body: string;
  image?: string;
  publishedAt: string;
  status: "published" | "draft";
}

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
  characterId?: number;
  characterName?: string;
  status: "published" | "draft";
  createdAt: string;
}

export interface Concept {
  id: number;
  title: string;
  slug: string;
  category: string;
  icon: string;
  shortDesc: string;
  body: string;
  sortOrder: number;
  status: "published" | "draft";
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "user";
}

export interface Store {
  characters: import("./index").Character[];
  arcs: import("./index").Arc[];
  factions: import("./index").Faction[];
  news: import("./index").NewsItem[];
  gallery: GalleryItem[];
  concepts: Concept[];
}
