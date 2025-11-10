export interface Message {
    id: string;          // identificador único del mensaje
    role: "user" | "bot"; // quién envía el mensaje
    content: string;      // contenido del mensaje (texto)
  }