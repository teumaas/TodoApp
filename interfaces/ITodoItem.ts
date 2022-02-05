export interface ITodoItem {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  description: string;
  published: boolean;
}
