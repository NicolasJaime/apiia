export interface Message {
    id: string;
    role: "user" | "bot"; // o "ai" si lo estás usando así
    content: string;
  }
  