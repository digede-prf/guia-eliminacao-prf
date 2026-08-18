import { useState, useMemo } from "react";
import { TEMPORALIDADE_FIM, CLASSES_FIM } from "../data/temporalidade-fim";
import { trackEvent } from "../utils/analytics";
import Header from "./Header";

/** Normaliza string para busca (minúsculas, sem acentos) */
function norm(s) {
  return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** Busca por relevância: palavras-chave > assunto > nota explicativa */
function buscar(dados, termo) {
  const palavras = norm(termo).split(/\s+/).filter((p) => p.length >= 2);
  if (!palavras.length) return dados;

  return dados
    .map((item) => {
      let score = 0;
      const an = norm(item.a);
      const nn = norm(item.n);
      const kn = item.k.map(norm);

      for (const p of palavras) {
        if (item.c === termo.trim()) score += 100;
        if (kn.some((k) => k === p)) score += 20;
        if (kn.some((k) => k.includes(p))) score += 10;
        if (an.includes(p)) score += 8;
        if (nn.includes(p)) score += 3;
      }
      return { ...item, score };
    })
    .filter((i) => i.score > 0)
    .sort((a, b) => b.score - a.score);
}

/** Mapa de classes para acesso rápido */
const CL_MAP = Object.fromEntries(CLASSES_FIM.map((c) => [c.cod, c]));

export default function Classificacao({ onBack }) {
  const [search, setSearch] = useState("");
  const [classeAtiva, setClasseAtiva] = useState(null);
  const [destFiltro, setDestFiltro] = useState(null);
  const [openItem, setOpenItem] = useState(null);

  const resultados = useMemo(() => {
    let r =
      search.trim().length >= 2
        ? buscar(TEMPORALIDADE_FIM, search)
        : [...TEMPORALIDADE_FIM];
    if (classeAtiva) r = r.filter((i) => i.cl === classeAtiva);
    if (destFiltro) r = r.filter((i) => i.d === destFiltro);
    return r;
  }, [search, classeAtiva, destFiltro]);

  const handleSearch = (val) => {
    setSearch(val);
    setOpenItem(null);
    if (val.trim().length >= 3) {
      trackEvent("classificacao_search", val.trim());
    }
  };

  const toggleItem = (codigo) => {
    const next = openItem === codigo ? null : codigo;
    setOpenItem(next);
    if (next) trackEvent("classificacao_view", codigo);
  };

  const handleKeywordClick = (kw) => {
    setSearch(kw);
    setOpenItem(null);
    trackEvent("classificacao_keyword", kw);
  };

  const limpar = () => {
    setSearch("");
    setClasseAtiva(null);
    setDestFiltro(null);
    setOpenItem(null);
  };

  const isPerm = (d) => d === "Guarda permanente";

  // Contadores para badges dos filtros
  const countElim = TEMPORALIDADE_FIM.filter(
    (i) => i.d === "Eliminação" && (!classeAtiva || i.cl === classeAtiva)
  ).length;
  const countPerm = TEMPORALIDADE_FIM.filter(
    (i) => i.d === "Guarda permanente" && (!classeAtiva || i.cl === classeAtiva)
  ).length;

  return (
    <div className="min-h-screen bg-prf-50">
      <Header
        title="Assistente de Classificação"
        sub="Busque por palavras-chave ou código"
        onBack={onBack}
      />

      <main className="max-w-3xl mx-auto px-4 pb-10 pt-5">
        {/* ── Busca ── */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-200">
          <label htmlFor="class-search" className="sr-only">
            Buscar código de classificação
          </label>
          <div className="relative">
            <input
              id="class-search"
              type="search"
              className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl bg-white placeholder-gray-400"
              placeholder="🔎  Descreva o documento ou digite o código..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={limpar}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center text-sm cursor-pointer transition-colors"
                aria-label="Limpar busca e filtros"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ── Filtros de classe ── */}
        <div className="flex flex-wrap gap-2 mb-3">
          {CLASSES_FIM.map((cl) => {
            const ativo = classeAtiva === cl.cod;
            return (
              <button
                key={cl.cod}
                onClick={() => {
                  setClasseAtiva((prev) => (prev === cl.cod ? null : cl.cod));
                  setOpenItem(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border-2 cursor-pointer transition-colors ${
                  ativo
                    ? "border-prf-700 bg-prf-100 text-prf-800"
                    : "border-gray-200 bg-white text-gray-500 hover:border-gray-400"
                }`}
              >
                <span aria-hidden="true">{cl.icon}</span>
                <span className="hidden sm:inline">{cl.nome}</span>
                <span className="sm:hidden">{cl.cod}</span>
              </button>
            );
          })}
        </div>

        {/* ── Filtros de destinação ── */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() =>
              setDestFiltro((prev) =>
                prev === "Eliminação" ? null : "Eliminação"
              )
            }
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border-2 cursor-pointer transition-colors ${
              destFiltro === "Eliminação"
                ? "border-danger bg-danger-light text-danger"
                : "border-gray-200 bg-white text-gray-500 hover:border-gray-400"
            }`}
          >
            🗑️ Eliminação
            <span className="bg-gray-100 text-gray-600 px-1.5 rounded-md text-xs">
              {countElim}
            </span>
          </button>
          <button
            onClick={() =>
              setDestFiltro((prev) =>
                prev === "Guarda permanente" ? null : "Guarda permanente"
              )
            }
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border-2 cursor-pointer transition-colors ${
              destFiltro === "Guarda permanente"
                ? "border-ok bg-ok-light text-ok"
                : "border-gray-200 bg-white text-gray-500 hover:border-gray-400"
            }`}
          >
            🏛️ Permanente
            <span className="bg-gray-100 text-gray-600 px-1.5 rounded-md text-xs">
              {countPerm}
            </span>
          </button>
        </div>

        {/* ── Contador ── */}
        <p className="text-base text-gray-500 mb-3 font-semibold">
          {search.trim().length >= 2
            ? `${resultados.length} resultado${resultados.length !== 1 ? "s" : ""} para "${search}"`
            : `${resultados.length} código${resultados.length !== 1 ? "s" : ""}`}
        </p>

        {/* ── Resultados ── */}
        {resultados.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-200">
            <div className="text-5xl mb-3" aria-hidden="true">
              📭
            </div>
            <p className="text-xl font-semibold mb-2">
              Nenhum código encontrado
            </p>
            <p className="text-base text-gray-500">
              Tente outras palavras-chave ou remova os filtros.
            </p>
          </div>
        ) : (
          resultados.map((item) => {
            const aberto = openItem === item.c;
            const cl = CL_MAP[item.cl] || {};
            return (
              <div key={item.c} className="mb-2">
                {/* Cabeçalho do card */}
                <button
                  onClick={() => toggleItem(item.c)}
                  className={`flex items-start gap-3 w-full bg-white border-2 rounded-xl px-4 py-4 text-left cursor-pointer transition-colors ${
                    aberto
                      ? "border-prf-700 rounded-b-none"
                      : "border-gray-200 hover:border-prf-700"
                  }`}
                  aria-expanded={aberto}
                >
                  {/* Badge do código */}
                  <span className="shrink-0 bg-prf-800 text-amber-300 font-mono font-extrabold text-sm px-2.5 py-1.5 rounded-lg min-w-[60px] text-center">
                    {item.c}
                  </span>

                  {/* Texto */}
                  <span className="flex-1 min-w-0">
                    <span className="block text-lg font-semibold text-gray-800 leading-snug">
                      {item.a}
                    </span>
                    <span className="flex flex-wrap gap-1.5 mt-2">
                      <span className="inline-block text-xs font-semibold bg-prf-100 text-prf-800 px-2 py-0.5 rounded-lg">
                        {cl.icon} {cl.nome}
                      </span>
                      <span
                        className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-lg ${
                          isPerm(item.d)
                            ? "bg-ok-light text-ok"
                            : "bg-danger-light text-danger"
                        }`}
                      >
                        {isPerm(item.d) ? "🏛️ Permanente" : "🗑️ Eliminação"}
                      </span>
                    </span>
                  </span>

                  {/* Seta */}
                  <span
                    className="text-2xl shrink-0 text-gray-400 transition-transform"
                    style={{
                      transform: aberto ? "rotate(180deg)" : "rotate(0)",
                    }}
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </button>

                {/* Detalhe expandido */}
                {aberto && (
                  <div className="bg-gray-50 border-2 border-t-0 border-prf-700 rounded-b-xl px-4 py-5">
                    {/* Nota explicativa */}
                    <div className="mb-4">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                        Nota Explicativa
                      </h3>
                      <p className="text-base text-gray-700 leading-relaxed">
                        {item.n}
                      </p>
                    </div>

                    {/* Prazos */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-white rounded-xl p-3 border border-gray-200">
                        <div className="text-xs font-bold text-gray-500 mb-1">
                          CORRENTE
                        </div>
                        <div className="text-sm font-semibold text-prf-800">
                          {item.fc}
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-gray-200">
                        <div className="text-xs font-bold text-gray-500 mb-1">
                          INTERMEDIÁRIA
                        </div>
                        <div className="text-sm font-semibold text-prf-800">
                          {item.fi}
                        </div>
                      </div>
                      <div
                        className={`rounded-xl p-3 border ${
                          isPerm(item.d)
                            ? "bg-ok-light border-ok-border"
                            : "bg-danger-light border-danger-border"
                        }`}
                      >
                        <div className="text-xs font-bold text-gray-500 mb-1">
                          DESTINAÇÃO
                        </div>
                        <div
                          className={`text-sm font-bold ${
                            isPerm(item.d) ? "text-ok" : "text-danger"
                          }`}
                        >
                          {item.d}
                        </div>
                      </div>
                    </div>

                    {/* Observações */}
                    {item.o && (
                      <div className="mb-4">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                          Observações
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed italic">
                          {item.o}
                        </p>
                      </div>
                    )}

                    {/* Palavras-chave clicáveis */}
                    <div>
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                        Termos Relacionados
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {item.k.map((kw, i) => (
                          <button
                            key={i}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleKeywordClick(kw);
                            }}
                            className="text-sm bg-gray-200 hover:bg-prf-100 hover:text-prf-800 text-gray-600 px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
                          >
                            {kw}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* ── Rodapé ── */}
        <footer className="text-center text-sm text-gray-400 mt-6 leading-relaxed">
          Fonte: Código de Classificação e Tabela de Temporalidade — Atividades-Fim
          <br />
          Aprovado pelo Arquivo Nacional · {TEMPORALIDADE_FIM.length} códigos
        </footer>
      </main>
    </div>
  );
}
