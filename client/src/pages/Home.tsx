import { useState, useMemo } from "react";
import { pilares, formatos, objetivos } from "@/lib/calendarData";
import { useEvents } from "@/lib/api";
import CalendarCard from "@/components/CalendarCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

const monthOptions = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
] as const;

function parseMonthYear(date: string) {
  const parts = date.split("/");
  if (parts.length !== 3) return null;
  const month = parts[1];
  const year = parts[2];
  if (!month || !year) return null;
  return { month, year };
}

export default function Home() {
  const [selectedPilares, setSelectedPilares] = useState<string[]>([]);
  const [selectedFormatos, setSelectedFormatos] = useState<string[]>([]);
  const [selectedObjetivos, setSelectedObjetivos] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const { data: events = [], isLoading } = useEvents();

  const availableYears = useMemo(() => {
    const years = new Set<string>();
    for (const event of events) {
      const monthYear = parseMonthYear(event.date);
      if (monthYear?.year) years.add(monthYear.year);
    }
    return Array.from(years).sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const monthYear = parseMonthYear(event.date);
      const monthMatch =
        selectedMonth === "all" || monthYear?.month === selectedMonth;
      const yearMatch =
        selectedYear === "all" || monthYear?.year === selectedYear;

      const pilarMatch =
        selectedPilares.length === 0 || selectedPilares.includes(event.pilar);
      const formatoMatch =
        selectedFormatos.length === 0 ||
        selectedFormatos.includes(event.formato);
      const objetivoMatch =
        selectedObjetivos.length === 0 ||
        selectedObjetivos.includes(event.objetivo);
      return (
        monthMatch && yearMatch && pilarMatch && formatoMatch && objetivoMatch
      );
    });
  }, [
    events,
    selectedMonth,
    selectedYear,
    selectedPilares,
    selectedFormatos,
    selectedObjetivos,
  ]);

  const toggleFilter = (
    value: string,
    state: string[],
    setState: (s: string[]) => void
  ) => {
    setState(
      state.includes(value) ? state.filter(v => v !== value) : [...state, value]
    );
  };

  const clearFilters = () => {
    setSelectedPilares([]);
    setSelectedFormatos([]);
    setSelectedObjetivos([]);
    setSelectedMonth("all");
    setSelectedYear("all");
  };

  const hasActiveFilters =
    selectedPilares.length > 0 ||
    selectedFormatos.length > 0 ||
    selectedObjetivos.length > 0 ||
    selectedMonth !== "all" ||
    selectedYear !== "all";

  return (
    <div className="min-h-screen bg-background smooth-scroll">
      {/* Hero Section */}
      <section className="relative pt-10 pb-8 md:pt-14 md:pb-10 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Calendário<br></br>{" "}
              <span className="text-gradient">Saber Espírita</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-3">
              Planejamento estratégico de conteúdo para o Instagram
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6 pb-12 md:pt-8 md:pb-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar de Filtros */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Header */}
                <div>
                  <h2 className="text-lg font-bold mb-2">Filtros</h2>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-primary hover:bg-accent"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Limpar tudo
                    </Button>
                  )}
                </div>

                {/* Filtro por Pilar */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Mês/Ano</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      value={selectedMonth}
                      onValueChange={setSelectedMonth}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Mês" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {monthOptions.map(month => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={selectedYear}
                      onValueChange={setSelectedYear}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Ano" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {availableYears.map(year => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Filtro por Pilar */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">
                    Pilar de Conteúdo
                  </h3>
                  <div className="space-y-2">
                    {pilares.map(pilar => (
                      <label
                        key={pilar}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPilares.includes(pilar)}
                          onChange={() =>
                            toggleFilter(
                              pilar,
                              selectedPilares,
                              setSelectedPilares
                            )
                          }
                          className="w-4 h-4 rounded border-border accent-primary"
                        />
                        <span className="text-sm text-muted-foreground">
                          {pilar}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filtro por Formato */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Formato</h3>
                  <div className="space-y-2">
                    {formatos.map(formato => (
                      <label
                        key={formato}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFormatos.includes(formato)}
                          onChange={() =>
                            toggleFilter(
                              formato,
                              selectedFormatos,
                              setSelectedFormatos
                            )
                          }
                          className="w-4 h-4 rounded border-border accent-primary"
                        />
                        <span className="text-sm text-muted-foreground">
                          {formato}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filtro por Objetivo */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">
                    Objetivo (Funil)
                  </h3>
                  <div className="space-y-2">
                    {objetivos.map(objetivo => (
                      <label
                        key={objetivo}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedObjetivos.includes(objetivo)}
                          onChange={() =>
                            toggleFilter(
                              objetivo,
                              selectedObjetivos,
                              setSelectedObjetivos
                            )
                          }
                          className="w-4 h-4 rounded border-border accent-primary"
                        />
                        <span className="text-sm text-muted-foreground">
                          {objetivo}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Info Box */}
                <div className="glass-card p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-primary">Dica:</span>{" "}
                    Use os filtros para encontrar postagens por pilar, formato
                    ou objetivo de funil.
                  </p>
                </div>
              </div>
            </aside>

            {/* Grid de Cards */}
            <main className="lg:col-span-3">
              {/* Resultados */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Mostrando{" "}
                  <span className="font-semibold">{filteredEvents.length}</span>{" "}
                  de <span className="font-semibold">{events.length}</span>{" "}
                  postagens
                </p>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-12">
                  <p className="text-muted-foreground">
                    Carregando postagens...
                  </p>
                </div>
              ) : filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredEvents.map(event => (
                    <CalendarCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    Nenhuma postagem encontrada com os filtros selecionados.
                  </p>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="hover:bg-accent"
                  >
                    Limpar filtros
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 border-t border-border/60">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-2">Saber Espírita</h3>
              <p className="text-sm text-muted-foreground">
                Ecossistema digital de estudo, reflexão, meditação e prece
                fundamentado na Doutrina Espírita.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Distribuição de Tarefas</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  <span className="font-semibold">E1:</span> Estrategista
                </li>
                <li>
                  <span className="font-semibold">E2:</span> Social Media
                </li>
                <li>
                  <span className="font-semibold">E3:</span> Copywriter
                </li>
                <li>
                  <span className="font-semibold">E4:</span> Designer
                </li>
                <li>
                  <span className="font-semibold">E5:</span> Analista de Dados
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Diretriz 70/20/10</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  <span className="font-semibold">70%</span> Conteúdo de Valor
                </li>
                <li>
                  <span className="font-semibold">20%</span> Prova/Autoridade
                </li>
                <li>
                  <span className="font-semibold">10%</span> Oferta (App)
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/60 text-center text-sm text-muted-foreground">
            <p>© 2026 Saber Espírita. Calendário de Conteúdo</p>
          </div>
        </div>
      </section>
    </div>
  );
}
