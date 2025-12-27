import {
  Wifi,
  Wind,
  Tv,
  Coffee,
  Utensils,
  Sun,
  MapPin,
  Phone,
  Instagram,
  MessageCircle,
  Sparkles,
  Key,
  Users,
  Car,
  Heart
} from "lucide-react";
import { Room, Amenity, SocialLink } from "./types";

export const APP_NAME = "APARTMENT DURI";
export const PHONE_NUMBER = "+30 699 710 0234";
export const EMAIL_ADDRESS = "duriceka3@gmail.com";

export const ROOMS: Room[] = [
  {
    id: 'living',
    title: "Sea-View Living Area",
    description: "A bright, air-conditioned living space that opens directly to the sea. Relax on the comfortable sofa (converts to a bed) while enjoying the flat-screen TV with satellite channels or the stunning ocean panorama.",
    images: [
      "images/Living_Room1.jpg",
      "images/Living_Room2.jpg",
      "images/Living_Room3.jpg"
    ],
    features: ["Sea View", "Sofa Bed", "Flat-screen TV", "Tile/Marble Floor"]
  },
  {
    id: 'balcony',
    title: "Private Balcony",
    description: "Unwind on your private balcony overlooking the lively main road of Pefkochori. Furnished with outdoor seating and a dining table, it's the perfect spot for morning coffee or people-watching in the warm Greek evenings.",
    images: [
      "images/Balcony1.jpg",
      "images/Balcony2.jpg",
      "images/Balcony3.jpg"
    ],
    features: ["Outdoor Furniture", "Dining Area", "Sun Protection", "Street View"]
  },
  {
    id: 'bedroom',
    title: "Soundproof Bedroom",
    description: "Sleep peacefully in our soundproofed master bedroom. Featuring a large double bed, spacious wardrobe, and cool tile floors to keep the temperature perfect during warm Greek nights.",
    images: [
      "images/Bedroom.jpg",
      "images/Bedroom2.jpg",
      "images/Bedroom3.jpg"
    ],
    features: ["Soundproofing", "Large Double Bed", "Wardrobe", "Socket near bed"]
  },
  {
    id: 'kitchen',
    title: "Equipped Kitchenette",
    description: "Prepare your own meals with ease. The kitchenette includes a refrigerator, stovetop, electric kettle, and kitchenware, plus a dining table for intimate meals indoors.",
    images: [
      "images/Kitchen.jpg",
      "images/Kitchen2.jpg",
      "images/Kitchen3.jpg"
    ],
    features: ["Stovetop", "Refrigerator", "Electric Kettle", "Kitchenware"]
  },
  {
    id: 'bath',
    title: "Modern Bathroom",
    description: "A private, clean bathroom featuring a shower, fresh towels, a hairdryer, and complimentary toiletries for your convenience.",
    images: [
      "images/Bathroom1.jpg",
      "images/Bathroom2.jpg",
      "images/Bathroom3.jpg"
    ],
    features: ["Shower", "Hairdryer", "Free Toiletries", "Towels"]
  }
];

export const AMENITIES: Amenity[] = [
  { icon: Heart, title: "Friendliest Host", description: "Experience warm Greek hospitality with personalized care and local tips from Pefkochori's most welcoming host." },
  { icon: Wind, title: "Air Conditioning", description: "Individual climate control and heating for year-round comfort." },
  { icon: Key, title: "Private Entrance", description: "Enjoy the privacy of your own independent entry to the apartment." },
  { icon: Wifi, title: "Free WiFi", description: "High-speed wireless internet access available throughout the property." },
  { icon: Utensils, title: "Kitchenette", description: "Fully equipped with fridge, stovetop, kettle, and dining table." },
  { icon: Sun, title: "Outdoor Dining", description: "Spacious terrace furnished for al fresco meals with a view." },
  { icon: Tv, title: "Entertainment", description: "Flat-screen TV with satellite channels for your downtime." },
  { icon: Sparkles, title: "Essentials", description: "Fresh linens, towels, hairdryer, and free toiletries provided." },
  { icon: Coffee, title: "Coffee & Tea", description: "Electric kettle and coffee making facilities included." },
  { icon: Users, title: "Family Friendly", description: "Spacious layout with a sofa bed suitable for families." },
  { icon: Car, title: "Easy Parking", description: "Free public parking is available at a location nearby." },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    // WhatsApp format: no + sign, just country code and number
    href: `https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}`,
    color: "bg-green-500"
  },
  {
    name: "Viber",
    icon: Phone,
    // Viber format: %2B for + sign
    href: `viber://chat?number=%2B${PHONE_NUMBER.replace(/[^0-9]/g, '')}`,
    color: "bg-purple-600"
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com",
    color: "bg-pink-600"
  }
];