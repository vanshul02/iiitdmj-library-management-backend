export interface CategoryAttributes {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export type CategoryInputAttributes = Omit<CategoryAttributes, 'id' | 'created_at' | 'updated_at'>