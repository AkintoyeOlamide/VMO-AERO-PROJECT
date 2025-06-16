export interface BlogPost {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Ultimate Guide to Private Jet Etiquette",
    date: "May 15, 2025",
    category: "Lifestyle",
    excerpt: "Discover the unwritten rules of private aviation and how to make the most of your luxury travel experience.",
    image: "/airplaine2.jpg",
    content: "Full details for The Ultimate Guide to Private Jet Etiquette..."
  },
  {
    id: 2,
    title: "Top 10 Private Jet Destinations for 2025",
    date: "April 28, 2025",
    category: "Travel",
    excerpt: "Explore the most exclusive and sought-after destinations accessible only by private aircraft this year.",
    image: "https://images.pexels.com/photos/247474/pexels-photo-247474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    content: "Full details for Top 10 Private Jet Destinations for 2025..."
  },
  {
    id: 3,
    title: "The Environmental Future of Private Aviation",
    date: "April 10, 2025",
    category: "Innovation",
    excerpt: "How the private aviation industry is embracing sustainable practices and carbon-neutral initiatives.",
    image: "https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    content: "Full details for The Environmental Future of Private Aviation..."
  }
];