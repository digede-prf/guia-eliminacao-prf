/**
 * Cabeçalho com título, subtítulo e botão Voltar.
 * Fixo no topo (sticky) para navegação sempre acessível.
 */
export default function Header({ title, sub, onBack }) {
  return (
    <header
      className="bg-gradient-to-br from-prf-800 to-prf-700 text-white px-5 py-4 flex items-center gap-4 shadow-lg sticky top-0 z-50"
      role="banner"
    >
      {onBack && (
        <button
          onClick={onBack}
          className="bg-white/20 border-2 border-white/40 text-white rounded-xl px-4 py-2.5 text-lg font-semibold flex items-center gap-2 shrink-0 min-h-[48px] cursor-pointer hover:bg-white/30 transition-colors focus-visible:outline-white"
          aria-label="Voltar à tela anterior"
        >
          ← Voltar
        </button>
      )}
      <div className="flex-1 min-w-0">
        <h1 className="text-xl sm:text-[22px] font-bold tracking-tight leading-tight truncate">
          {title}
        </h1>
        {sub && (
          <p className="text-sm opacity-85 mt-0.5 leading-snug">{sub}</p>
        )}
      </div>
    </header>
  );
}
