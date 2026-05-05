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
    TOFU: "bg-primary/10 text-primary border-primary/20",
    MOFU: "bg-secondary/20 text-foreground border-secondary/30",
    BOFU: "bg-accent text-accent-foreground border-border",
  };
  const pilarColors: Record<string, string> = {
    "Estudo Doutrinário": "bg-primary/10 text-primary",
    "Reflexão Moral": "bg-secondary/20 text-foreground",
    "Prece e Consolo": "bg-accent text-accent-foreground",
    "Educação Espírita": "bg-muted text-foreground",
    "Prova e Autoridade": "bg-secondary/15 text-foreground",
    "Produto/App": "bg-primary/15 text-primary",
  };

  const statusColors: Record<string, string> = {
    Ideia: "bg-muted text-muted-foreground border-border",
    Aprovado: "bg-primary/10 text-primary border-primary/20",
    "Em Produção": "bg-secondary/20 text-foreground border-secondary/30",
    Produzido: "bg-accent text-accent-foreground border-border",
    Publicado: "bg-primary text-primary-foreground border-transparent",
  };

  return (
    <>
      <Card className="glass-card hover:shadow-md transition-all duration-300 overflow-hidden group">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                {event.date}
              </div>
              <h3 className="text-lg font-bold line-clamp-2">
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
            <Badge variant="outline">
              {event.objetivo}
            </Badge>
          </div>

          {/* Descrição resumida */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {event.descricao}
          </p>

          {/* Métrica */}
          <div className="text-xs text-muted-foreground mb-4">
            <span className="font-semibold">Métrica:</span> {event.metrica}
          </div>

          {/* CTA */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(true)}
            className="w-full justify-between text-primary hover:bg-accent"
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
              <DialogTitle className="text-2xl">
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
              <h4 className="font-semibold mb-2">Hooks A/B</h4>
              <div className="space-y-2">
                <div className="p-3 glass-card rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold">A:</span> {event.hookA}
                  </p>
                </div>
                <div className="p-3 glass-card rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold">B:</span> {event.hookB}
                  </p>
                </div>
              </div>
            </div>

            {/* Descrição completa */}
            <div>
              <h4 className="font-semibold mb-2">Descrição/Legenda</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {event.descricao}
              </p>
            </div>

            {/* CTA */}
            <div>
              <h4 className="font-semibold mb-2">Call-to-Action</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {event.cta}
              </p>
            </div>

            {/* Informações de Funil e Pilar */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Objetivo (Funil)</h4>
                <Badge className={`${objetivoBg[event.objetivo]} border`}>
                  {event.objetivo}
                </Badge>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Pilar</h4>
                <Badge className={`${pilarColors[event.pilar]} border-0`}>
                  {event.pilar}
                </Badge>
              </div>
            </div>

            {/* Responsáveis */}
            <div>
              <h4 className="font-semibold mb-2">Responsáveis</h4>
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
              <h4 className="font-semibold mb-2">Brief de Design</h4>
              <ul className="space-y-2">
                {event.brief.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Métrica-chave */}
            <div>
              <h4 className="font-semibold mb-2">Métrica-chave</h4>
              <p className="text-sm text-muted-foreground">{event.metrica}</p>
            </div>

            {/* Status (Removido daqui pois já está no header do modal) */}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
