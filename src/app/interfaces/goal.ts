export interface Goal {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'done' | 'abandoned';
  endDate: Date;
}
