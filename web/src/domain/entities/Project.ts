export interface Project {
  id: number;
  title: string;
  description: string;
  date: string;
  client: number;
  client_name: string;
  service: number;
  service_name: string;
}

export interface ProjectCreate {
  title: string;
  description: string;
  date: string;
  client: number;
  service: number;
}
