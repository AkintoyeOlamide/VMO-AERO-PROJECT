export interface Testimonial {
  id: number;
  name?: string;
  title?: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Chinedu Okafor",
    text: "VMO Aero has revolutionized the way I conduct business travel. The attention to detail, punctuality, and luxurious experience have made them my exclusive choice for private aviation. Their team anticipates my needs before I even express them.",
    rating: 5
  },
  {
    id: 2,
    name: "Amina Bello",
    text: "As someone who travels frequently for fashion weeks across the globe, VMO Aero provides me with the reliability and comfort I need. Their cabin crew is exceptional, and the customized experience makes every journey a pleasure rather than a necessity.",
    rating: 5
  },
  {
    id: 3,
    name: "Cynthia Olamide",
    text: "My demanding schedule requires flexibility and reliability. VMO Aero delivers both consistently. Their ability to accommodate last-minute changes and provide absolute privacy has made them an essential partner in my career.",
    rating: 4
  }
];