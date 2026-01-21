export interface ISubtests {
  id: string;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type ISubtest = Pick<
  ISubtest,
  "id" | "name" | "description" | "is_active"
>;

export interface ISubtestResponse {
  success: boolean;
  data: ISubtest[];
}
