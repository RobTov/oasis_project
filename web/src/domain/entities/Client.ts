export interface ClientCreate {
  name: string;
  company: string;
  email: string;
  phone: string;
  sector: string;
}

export interface TeamCreate {
  name: string;
  role: string;
  bio: string;
  url_picture?: string;
}

export interface CampaignCreate {
  client: number;
  service: number;
  start_date: string;
  end_date: string;
  metrics?: Record<string, unknown>;
}

export interface SubscriberCreate {
  email: string;
  date: string;
}

export interface Testimonial {
  id: number;
  client: number;
  client_name: string;
  text: string;
  date: string;
  project: number;
  project_title: string;
}

export interface TestimonialCreate {
  client: number;
  text: string;
  date: string;
  project: number;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
}

export interface ContactCreate {
  name: string;
  email: string;
  message: string;
  date: string;
}

export interface UserCreate {
  username: string;
  email: string;
  password: string;
  role: 'administrator' | 'client';
}

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
