// Type definitions for Notes app entities

export interface Note {
  id: number;
  title: string;
  content: string;
  userId: string;
  categoryId: number | null;
  tags: number[];
  isFavorite: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  color: string;
  icon: string;
  userId: string;
  createdAt: string;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
  userId: string;
}
