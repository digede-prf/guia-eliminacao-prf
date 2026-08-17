import { useState, useMemo } from "react";
import { GLOSSARIO } from "../data/glossary";
import { trackEvent } from "../utils/analytics";
import Header from "./Header";

export default function Glossary({ onBack }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return GLOSSARIO;
    const t = search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return GLOSSARIO.filter((g) => {
      const txt = (g.sigla + " " + g.nome + " " + g.desc)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      return t.split(/\s+/).every((w) => txt.includes(w));
    });
  }, [search]);

  const handleSearch = (val) => {
    setSearch(val);
    if (val.trim().length >= 2) {
      trackEvent("glossary_search", val.trim());
    }
  };

  return (
    <div className="min-h-screen bg-prf-50">
      <Header
        title="Glossário de Siglas"
        sub="Toque em qualquer sigla para ver o significado"
        onBack={onBack}
      />
      <main className="max-w-3xl mx-auto px-4 pb-10 pt-5">
        {/* Search */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-200">
          <label htmlFor="glossary-search" className="sr-only">Buscar sigla</label>
          <input
            id="glossary-search"
            type="search"
            className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl bg-white placeholder-gray-400"
            placeholder="🔎  Buscar sigla..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Entries */}
        {filtered.map((g, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl px-5 py-4 mb-2.5 shadow-sm border border-gray-200"
          >
            <div className="flex items-center gap-3.5">
              <span className="bg-prf-800 text-white rounded-xl px-3.5 py-2 text-lg font-extrabold tracking-wide shrink-0">
                {g.sigla}
              </span>
              <div>
                <p className="text-xl font-bold text-gray-800">{g.nome}</p>
                <p className="text-base text-gray-600 mt-1 leading-snug">{g.desc}</p>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-200">
            <div className="text-5xl mb-3" aria-hidden="true">🤔</div>
            <p className="text-xl font-semibold">Sigla não encontrada</p>
            <p className="text-base text-gray-500 mt-1.5">
              Tente outras palavras ou navegue pela lista completa.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
