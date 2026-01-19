export interface ISubtest {
  id: string;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ISubtestResponse {
  success: boolean;
  data: ISubtest[];
}
