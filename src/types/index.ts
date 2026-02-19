export interface BaseDocument {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ProductDetail {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  hoverImage?: string;
  alt: string;
  details: ProductDetail[];
  recommendation?: string;
  buyLink?: string;
}

export interface ProductCategory {
  id: string;
  label: string;
  intro?: string;
  products: Product[];
}

export interface TrainingProgram {
  id: string;
  title: string;
  image: string;
  alt: string;
  description: string;
}

export interface CateringMenuItem {
  id: string;
  name: string;
  image: string;
  alt: string;
  description: string;
}

export type InquiryType = "order" | "catering" | "training";
export type InquiryStatus = "new" | "in_progress" | "completed";

export interface Inquiry extends BaseDocument {
  type: InquiryType;
  status: InquiryStatus;
  name: string;
  email: string;
  phone?: string;
  date?: string;
  message?: string;
  classInterest?: string;
  datePreference?: string;
  adminNote?: string;
}

export interface InquiryFormData {
  type: InquiryType;
  name: string;
  email: string;
  phone?: string;
  date?: string;
  message?: string;
  classInterest?: string;
  datePreference?: string;
}
