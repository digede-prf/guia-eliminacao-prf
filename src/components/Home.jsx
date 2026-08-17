import { REGIONAIS } from "../data/regionais";

const MENU_ITEMS = [
  { id: "faq", icon: "❓", label: "Perguntas Frequentes", desc: "As principais dúvidas sobre a IN, com respostas claras" },
  { id: "decide", icon: "✅", label: "Posso Eliminar Este Documento?", desc: "Responda algumas perguntas e descubra" },
  { id: "calc", icon: "🔢", label: "Calculadora de Amostragem", desc: "Quantas caixas/pastas verificar na análise técnica" },
  { id: "sorteio", icon: "🎲", label: "Sorteio de Amostra", desc: "Sorteio aleatório das caixas/pastas para verificação da CNPAD" },
  { id: "steps", icon: "📋", label: "Passo a Passo da Eliminação", desc: "As 21 etapas do procedimento completo" },
  { id: "checklist", icon: "☑️", label: "Checklist da LED", desc: "Confira tudo antes de enviar à CNPAD" },
  { id: "prazos", icon: "⏰", label: "Tabela de Prazos", desc: "Todos os prazos da IN num lugar só" },
  { id: "glossario", icon: "🔤", label: "Glossário de Siglas", desc: "O que significa cada sigla da IN" },
];

export default function Home({ regional, setRegional, onNavigate }) {
  return (
    <main className="max-w-3xl mx-auto px-4 pb-10 pt-5">
      {/* Boas-vindas */}
      <div className="text-center py-6 px-4">
        <div className="text-6xl mb-3" aria-hidden="true">📘</div>
        <h2 className="text-2xl sm:text-[26px] font-bold text-prf-800 mb-2">
          Bem-vindo ao Guia da Instrução Normativa
        </h2>
        <p className="text-lg text-gray-500 max-w-md mx-auto">
          Aqui você encontra respostas sobre avaliação, destinação e eliminação de documentos de arquivo na PRF.
        </p>
      </div>

      {/* Seletor de regional */}
      <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-200">
        <label
          htmlFor="regional-select"
          className="block text-base font-semibold text-gray-500 mb-2"
        >
          Identifique sua regional:
        </label>
        <select
          id="regional-select"
          value={regional}
          onChange={(e) => setRegional(e.target.value)}
          className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl bg-white text-gray-800 cursor-pointer"
        >
          <option value="">Selecione sua Superintendência...</option>
          {REGIONAIS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* Menu principal */}
      <nav aria-label="Seções do guia">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex items-center gap-4 w-full bg-white border-2 border-gray-300 rounded-2xl px-5 py-5 text-left text-lg font-semibold text-gray-800 mb-3 shadow-sm hover:border-prf-700 hover:bg-prf-50 active:bg-prf-100 transition-colors cursor-pointer"
          >
            <span
              className="text-4xl shrink-0 w-13 h-13 flex items-center justify-center bg-prf-100 rounded-xl"
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <span>
              <span className="block">{item.label}</span>
              <span className="block text-[15px] text-gray-500 font-normal mt-1">
                {item.desc}
              </span>
            </span>
          </button>
        ))}
      </nav>

      {/* Rodapé */}
      <footer className="text-center text-sm text-gray-400 mt-6 leading-relaxed">
        Ferramenta de consulta elaborada pela DIGEDE/CGLOG/DIAD<br />
        Baseada na Instrução Normativa PRF — Processo 08650.229294/2026-54
      </footer>
    </main>
  );
}
