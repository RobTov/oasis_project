export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: number;
  author_name: string;
  date_published: string;
  category: string;
}

export interface BlogPostCreate {
  title: string;
  content: string;
  author: number;
  date_published: string;
  category: string;
}
