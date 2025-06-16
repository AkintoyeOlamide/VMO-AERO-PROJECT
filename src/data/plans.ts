export interface Plan {
  id: number;
  name: string;
  price: number;
  frequency: string;
  description: string;
  features: string[];
  featured: boolean;
  image: string;
}

export const plans: Plan[] = [
  {
    id: 1,
    name: "Challenger 604",
    price: 15000,
    frequency: "/month",
    description: "",
    features: [
      // Removed all features as requested
    ],
    featured: false,
    image: "/airplaine2.jpg"
  },
  {
    id: 2,
    name: "Executive",
    price: 35000,
    frequency: "/month",
    description: "",
    features: [
      // Removed all features as requested
    ],
    featured: true,
    image: "/airplaine3.jpg"
  },
  {
    id: 3,
    name: "Elite",
    price: 75000,
    frequency: "/month",
    description: "",
    features: [
      // Removed all features as requested
    ],
    featured: false,
    image: "/airplaine4.jpg"
  }
];