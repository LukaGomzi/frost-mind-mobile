export interface FreezerItemRequest {
  name: string;
  description?: string;
  quantity: number;
  weight?: number;
  foodTypeId: number;
}

export interface FreezerItem {
  id: number;
  name: string;
  description?: string;
  quantity: number;
  weight?: number;
  foodTypeId: number;
  expirationDate: string;
}
