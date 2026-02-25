export interface CalendarEvent {
  id: string;
  date: string; // DD/MM/YYYY
  canal: string;
  formato: string;
  hookA: string;
  hookB: string;
  descricao: string;
  cta: string;
  objetivo: "TOFU" | "MOFU" | "BOFU";
  pilar: string;
  responsavel: string[];
  brief: string[];
  metrica: string;
  status: "Ideia" | "Aprovado" | "Em Produção" | "Produzido" | "Publicado";
}

export const pilares = [
  "Estudo Doutrinário",
  "Reflexão Moral",
  "Prece e Consolo",
  "Educação Espírita",
  "Prova e Autoridade",
  "Produto/App",
];

export const formatos = ["Carrossel", "Reels", "Stories", "Post Estático"];

export const objetivos = ["TOFU", "MOFU", "BOFU"];

export const statusOptions = [
  "Ideia",
  "Aprovado",
  "Em Produção",
  "Produzido",
  "Publicado",
];
