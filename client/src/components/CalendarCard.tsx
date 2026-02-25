import { CalendarEvent } from "@/lib/calendarData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  BookOpen,
  Video,
  MessageCircle,
  Image as ImageIcon,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditEventDialog from "./EditEventDialog";

interface CalendarCardProps {
  event: CalendarEvent;
}

export default function CalendarCard({ event }: CalendarCardProps) {
  const [open, setOpen] = useState(false);

  const formatoIcons: Record<string, React.ReactNode> = {
    Carrossel: <ImageIcon className="w-4 h-4" />,
    Reels: <Video className="w-4 h-4" />,
    Stories: <MessageCircle className="w-4 h-4" />,
    "Post Estático": <ImageIcon className="w-4 h-4" />,
  };

  const objetivoBg: Record<string, string> = {
    TOFU: "bg-blue-50 text-blue-700 border-blue-200",
    MOFU: "bg-amber-50 text-amber-700 border-amber-200",
    BOFU: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
  const pilarColors: Record<string, string> = {
    "Estudo Doutrinário": "bg-indigo-50 text-indigo-700",
    "Reflexão Moral": "bg-rose-50 text-rose-700",
    "Prece e Consolo": "bg-purple-50 text-purple-700",
    "Educação Espírita": "bg-cyan-50 text-cyan-700",
    "Prova e Autoridade": "bg-orange-50 text-orange-700",
    "Produto/App": "bg-green-50 text-green-700",
  };

  const statusColors: Record<string, string> = {
    Ideia: "bg-gray-100 text-gray-700 border-gray-200",
    Aprovado: "bg-blue-50 text-blue-700 border-blue-200",
    "Em Produção": "bg-yellow-50 text-yellow-700 border-yellow-200",
    Produzido: "bg-purple-50 text-purple-700 border-purple-200",
    Publicado: "bg-green-50 text-green-700 border-green-200",
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden border-0 bg-white group">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                {event.date}
              </div>
              <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                {event.hookA}
              </h3>
            </div>
            <div className="flex items-center gap-1 ml-2 flex-shrink-0">
              <Badge className={`${statusColors[event.status]} border`}>
                {event.status}
              </Badge>
              <EditEventDialog event={event} />
            </div>
          </div>

          {/* Formato e Pilar */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Badge variant="secondary" className="flex items-center gap-1">
              {formatoIcons[event.formato]}
              {event.formato}
            </Badge>
            <Badge className={`${pilarColors[event.pilar]} border-0`}>
              {event.pilar}
            </Badge>
            <Badge variant="outline" className="border-gray-200 text-gray-600">
              {event.objetivo}
            </Badge>
          </div>

          {/* Descrição resumida */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {event.descricao}
          </p>

          {/* Métrica */}
          <div className="text-xs text-gray-500 mb-4">
            <span className="font-semibold">Métrica:</span> {event.metrica}
          </div>

          {/* CTA */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(true)}
            className="w-full justify-between text-primary hover:bg-blue-50"
          >
            Ver detalhes
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Modal de detalhes */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between pr-8">
              <DialogTitle
                className="text-2xl text-gray-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {event.date} - {event.formato}
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Badge className={`${statusColors[event.status]} border`}>
                  {event.status}
                </Badge>
                <EditEventDialog event={event} />
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Hooks A/B */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Hooks A/B</h4>
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm">
                    <span className="font-semibold">A:</span> {event.hookA}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm">
                    <span className="font-semibold">B:</span> {event.hookB}
                  </p>
                </div>
              </div>
            </div>

            {/* Descrição completa */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Descrição/Legenda
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {event.descricao}
              </p>
            </div>

            {/* CTA */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Call-to-Action
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {event.cta}
              </p>
            </div>

            {/* Informações de Funil e Pilar */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Objetivo (Funil)
                </h4>
                <Badge className={`${objetivoBg[event.objetivo]} border`}>
                  {event.objetivo}
                </Badge>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Pilar</h4>
                <Badge className={`${pilarColors[event.pilar]} border-0`}>
                  {event.pilar}
                </Badge>
              </div>
            </div>

            {/* Responsáveis */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Responsáveis</h4>
              <div className="flex gap-2 flex-wrap">
                {event.responsavel.map(resp => (
                  <Badge key={resp} variant="outline">
                    {resp}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Brief de Design */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Brief de Design
              </h4>
              <ul className="space-y-2">
                {event.brief.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Métrica-chave */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Métrica-chave
              </h4>
              <p className="text-sm text-gray-700">{event.metrica}</p>
            </div>

            {/* Status (Removido daqui pois já está no header do modal) */}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
