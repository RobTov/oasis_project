export interface Client {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  sector: string;
}

export interface Team {
  id: number;
  name: string;
  role: string;
  bio: string;
  url_picture: string | null;
}

export interface Campaign {
  id: number;
  client: number;
  client_name: string;
  service: number;
  service_name: string;
  start_date: string;
  end_date: string;
  metrics: Record<string, unknown> | null;
}

export interface Subscriber {
  id: number;
  email: string;
  date: string;
}
