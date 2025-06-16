export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "What services does VMO Aero provide?",
    answer: "We offer a comprehensive range of services, including flight and ground operations, maintenance oversight, fuel release services, regulatory compliance, and much more. For a detailed breakdown of all our services, please visit our services section."
  },
  {
    id: 2,
    question: "Do you offer custom tailored aircraft management solutions?",
    answer: "Yes, we understand that every aircraft owner has unique needs. This is why we offer personalized management solutions designed to fit your specific requirements, from basic management services to comprehensive solutions."
  },
  {
    id: 3,
    question: "How much does it cost to charter an aircraft with VMO Aero?",
    answer: "Charter costs vary depending on the aircraft type, flight route, flight duration, and any additional services required. Contact us for a personalized quote based on your specific needs."
  },
  {
    id: 4,
    question: "How do I know if VMO Aero's aircraft management package is right for me?",
    answer: "If you own an aircraft and are looking to streamline operations and monetize your asset, our total aircraft management service can simplify your ownership experience. It allows you to focus on other priorities while we handle the operational complexities."
  },
  {
    id: 5,
    question: "How do I book a charter flight with VMO Aero?",
    answer: "Booking a charter flight is simple. Just contact our team with all relevant flight details and we will attend accordingly."
  }
];