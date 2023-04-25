export interface CategoryAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CategoryInputAttributes = Omit<CategoryAttributes, 'id' | 'created_at' | 'updated_at'>