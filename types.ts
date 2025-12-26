import { LucideIcon } from "lucide-react";

export interface Room {
  id: string;
  title: string;
  description: string;
  images: string[]; // Array of URLs for the gallery
  features: string[];
}

export interface Amenity {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SocialLink {
  name: string;
  icon: LucideIcon;
  href: string;
  color: string;
}