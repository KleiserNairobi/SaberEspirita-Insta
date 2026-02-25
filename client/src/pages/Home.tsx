import { useState, useMemo } from "react";
import { pilares, formatos, objetivos } from "@/lib/calendarData";
import { useEvents } from "@/lib/api";
import CalendarCard from "@/components/CalendarCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

/**
 * Design Philosophy: Minimalismo Espiritual Moderno
 * - Paleta: Azul profundo (#1e3a8a), Branco, Dourado suave (#d4af37), Cinza neutro
 * - Tipografia: Playfair Display (títulos), Inter (corpo)
 * - Layout: Grid assimétrico com sidebar para filtros
 * - Animações: Suaves e propositais, sem distração
 */

export default function Home() {
  const [selectedPilares, setSelectedPilares] = useState<string[]>([]);
  const [selectedFormatos, setSelectedFormatos] = useState<string[]>([]);
  const [selectedObjetivos, setSelectedObjetivos] = useState<string[]>([]);

  const { data: events = [], isLoading } = useEvents();

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const pilarMatch =
        selectedPilares.length === 0 || selectedPilares.includes(event.pilar);
      const formatoMatch =
        selectedFormatos.length === 0 ||
        selectedFormatos.includes(event.formato);
      const objetivoMatch =
        selectedObjetivos.length === 0 ||
        selectedObjetivos.includes(event.objetivo);
      return pilarMatch && formatoMatch && objetivoMatch;
    });
  }, [events, selectedPilares, selectedFormatos, selectedObjetivos]);

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
  };

  const hasActiveFilters =
    selectedPilares.length > 0 ||
    selectedFormatos.length > 0 ||
    selectedObjetivos.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 600"
            preserveAspectRatio="none"
          >
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="currentColor"
              className="text-blue-900"
            />
            <circle
              cx="1100"
              cy="500"
              r="100"
              fill="currentColor"
              className="text-blue-900"
            />
            <circle
              cx="600"
              cy="300"
              r="60"
              fill="currentColor"
              className="text-amber-600"
            />
          </svg>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Calendário Saber Espírita
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Março de 2026 — Planejamento estratégico de conteúdo para o
              Instagram
            </p>
            <div className="flex gap-4 flex-wrap">
              <Badge className="bg-blue-900 text-white text-base py-2 px-4">
                14 postagens planejadas
              </Badge>
              <Badge variant="outline" className="text-base py-2 px-4">
                6 pilares de conteúdo
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar de Filtros */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Header */}
                <div>
                  <h2
                    className="text-lg font-bold text-gray-900 mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Filtros
                  </h2>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-blue-900 hover:bg-blue-50"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Limpar tudo
                    </Button>
                  )}
                </div>

                {/* Filtro por Pilar */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
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
                          className="w-4 h-4 rounded border-gray-300 text-blue-900"
                        />
                        <span className="text-sm text-gray-700">{pilar}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filtro por Formato */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Formato
                  </h3>
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
                          className="w-4 h-4 rounded border-gray-300 text-blue-900"
                        />
                        <span className="text-sm text-gray-700">{formato}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filtro por Objetivo */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
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
                          className="w-4 h-4 rounded border-gray-300 text-blue-900"
                        />
                        <span className="text-sm text-gray-700">
                          {objetivo}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Info Box */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold text-blue-900">Dica:</span>{" "}
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
                <p className="text-sm text-gray-600">
                  Mostrando{" "}
                  <span className="font-semibold">{filteredEvents.length}</span>{" "}
                  de <span className="font-semibold">{events.length}</span>{" "}
                  postagens
                </p>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-12">
                  <p className="text-gray-500">Carregando postagens...</p>
                </div>
              ) : filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredEvents.map(event => (
                    <CalendarCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">
                    Nenhuma postagem encontrada com os filtros selecionados.
                  </p>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="text-blue-900 border-blue-900 hover:bg-blue-50"
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
      <section className="py-12 border-t border-gray-200">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3
                className="font-bold text-gray-900 mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Saber Espírita
              </h3>
              <p className="text-sm text-gray-600">
                Ecossistema digital de estudo, reflexão, meditação e prece
                fundamentado na Doutrina Espírita.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Distribuição de Tarefas
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
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
              <h4 className="font-semibold text-gray-900 mb-3">
                Diretriz 70/20/10
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
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
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>© 2026 Saber Espírita. Calendário de Conteúdo — Março 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
}
