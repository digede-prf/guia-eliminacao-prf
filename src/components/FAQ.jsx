import { useState, useMemo } from "react";
import { FAQ as FAQ_DATA } from "../data/faq";
import { trackEvent } from "../utils/analytics";
import Header from "./Header";

export default function FAQScreen({ onBack }) {
  const [search, setSearch] = useState("");
  const [openCat, setOpenCat] = useState(null);
  const [openQ, setOpenQ] = useState(null);

  // Flatten all questions for search
  const allQs = useMemo(
    () =>
      FAQ_DATA.flatMap((c, ci) =>
        c.items.map((it, qi) => ({ ...it, cat: c.cat, icon: c.icon, ci, qi }))
      ),
    []
  );

  // Filter by search term (normalized, accent-insensitive)
  const filtered = useMemo(() => {
    if (!search.trim()) return [];
    const t = search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return allQs.filter((x) => {
      const txt = (x.q + " " + x.a + " " + x.cat)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      return t.split(/\s+/).every((w) => txt.includes(w));
    });
  }, [search, allQs]);

  const handleSearch = (val) => {
    setSearch(val);
    setOpenCat(null);
    if (val.trim().length >= 3) {
      trackEvent("search", val.trim());
    }
  };

  const toggleQuestion = (key, questionText) => {
    const newKey = openQ === key ? null : key;
    setOpenQ(newKey);
    if (newKey) {
      trackEvent("faq_view", questionText);
    }
  };

  return (
    <div className="min-h-screen bg-prf-50">
      <Header
        title="Perguntas Frequentes"
        sub="Digite palavras-chave ou navegue pelos temas"
        onBack={onBack}
      />
      <main className="max-w-3xl mx-auto px-4 pb-10 pt-5">
        {/* Search */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-200">
          <label htmlFor="faq-search" className="sr-only">Buscar dúvida</label>
          <input
            id="faq-search"
            type="search"
            className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl bg-white placeholder-gray-400"
            placeholder="🔎  Digite sua dúvida aqui..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {search.trim() ? (
          // Search results
          filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-200">
              <div className="text-5xl mb-3" aria-hidden="true">🤔</div>
              <p className="text-xl font-semibold mb-2">Nenhum resultado encontrado</p>
              <p className="text-base text-gray-500">
                Tente outras palavras-chave ou navegue pelos temas abaixo.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-base text-gray-500 mb-3 font-semibold">
                {filtered.length} resultado(s) encontrado(s)
              </p>
              {filtered.map((it, i) => {
                const key = `s${i}`;
                return (
                  <div key={key}>
                    <button
                      className="flex justify-between items-center gap-3 w-full bg-white border-2 border-gray-200 rounded-xl px-5 py-4 text-left text-lg font-semibold text-gray-800 mb-2 cursor-pointer hover:border-prf-700 transition-colors"
                      onClick={() => toggleQuestion(key, it.q)}
                      aria-expanded={openQ === key}
                    >
                      <span>
                        <span className="inline-block text-sm bg-prf-100 text-prf-800 px-2.5 py-1 rounded-lg font-semibold">
                          {it.cat}
                        </span>
                        <span className="block mt-1.5 leading-snug">{it.q}</span>
                      </span>
                      <span className="text-2xl shrink-0" aria-hidden="true">
                        {openQ === key ? "▲" : "▼"}
                      </span>
                    </button>
                    {openQ === key && <Answer a={it.a} ref_={it.ref} />}
                  </div>
                );
              })}
            </div>
          )
        ) : (
          // Category browsing
          FAQ_DATA.map((cat, ci) => (
            <div key={ci}>
              <button
                className="flex items-center gap-4 w-full bg-white border-2 border-gray-300 rounded-2xl px-5 py-5 text-left text-lg font-semibold text-gray-800 mb-2 cursor-pointer hover:border-prf-700 transition-colors"
                onClick={() => {
                  setOpenCat(openCat === ci ? null : ci);
                  setOpenQ(null);
                  if (openCat !== ci) trackEvent("section_view", cat.cat);
                }}
                aria-expanded={openCat === ci}
              >
                <span
                  className="text-4xl shrink-0 w-13 h-13 flex items-center justify-center bg-prf-100 rounded-xl"
                  aria-hidden="true"
                >
                  {cat.icon}
                </span>
                <span className="flex-1">
                  <span className="block">{cat.cat}</span>
                  <span className="block text-[15px] text-gray-500 font-normal mt-1">
                    {cat.desc}
                  </span>
                </span>
                <span className="text-2xl" aria-hidden="true">
                  {openCat === ci ? "▲" : "▼"}
                </span>
              </button>
              {openCat === ci && (
                <div className="pl-2 pr-2 mb-4">
                  {cat.items.map((it, qi) => {
                    const key = `${ci}-${qi}`;
                    return (
                      <div key={key}>
                        <button
                          className="flex justify-between items-center gap-3 w-full bg-white border-2 border-gray-200 rounded-xl px-5 py-4 text-left text-lg font-semibold text-gray-800 mb-2 cursor-pointer hover:border-prf-700 transition-colors leading-snug"
                          onClick={() => toggleQuestion(key, it.q)}
                          aria-expanded={openQ === key}
                        >
                          <span>{it.q}</span>
                          <span className="text-2xl shrink-0" aria-hidden="true">
                            {openQ === key ? "▲" : "▼"}
                          </span>
                        </button>
                        {openQ === key && <Answer a={it.a} ref_={it.ref} />}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))
        )}
      </main>
    </div>
  );
}

/** Bloco de resposta reutilizável */
function Answer({ a, ref_ }) {
  return (
    <div className="bg-gray-50 border-2 border-prf-700 rounded-xl px-5 py-5 mb-3 text-lg leading-relaxed whitespace-pre-line">
      {a}
      <div className="mt-3">
        <span className="inline-block bg-prf-100 text-prf-800 px-3 py-1 rounded-lg text-[15px] font-semibold">
          📌 {ref_}
        </span>
      </div>
    </div>
  );
}
