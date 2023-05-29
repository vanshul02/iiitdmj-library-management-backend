export interface CategoryAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryInputAttributes {
  name: string;
}