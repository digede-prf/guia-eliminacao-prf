import { useState } from "react";

/**
 * Controles flutuantes de acessibilidade:
 * - Ajuste de tamanho de fonte (A- A A+)
 * - Modo alto contraste
 * Persistentes em todas as telas.
 */
export default function FontControls({ fontScale, setFontScale, highContrast, setHighContrast }) {
  const [open, setOpen] = useState(false);

  const decrease = () => setFontScale(Math.max(0.85, fontScale - 0.1));
  const reset = () => setFontScale(1);
  const increase = () => setFontScale(Math.min(1.4, fontScale + 0.1));

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col items-end gap-2">
      {open && (
        <div
          className="bg-white rounded-2xl shadow-2xl border-2 border-prf-700 p-4 flex flex-col gap-3 animate-in"
          role="group"
          aria-label="Controles de acessibilidade"
        >
          <p className="text-sm font-semibold text-prf-800 text-center">
            Tamanho da fonte
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={decrease}
              disabled={fontScale <= 0.85}
              className="w-12 h-12 rounded-xl bg-prf-100 text-prf-800 font-bold text-lg border-2 border-prf-700 disabled:opacity-40 cursor-pointer hover:bg-prf-700 hover:text-white transition-colors"
              aria-label="Diminuir fonte"
            >
              A-
            </button>
            <button
              onClick={reset}
              className="w-12 h-12 rounded-xl bg-prf-100 text-prf-800 font-bold text-lg border-2 border-prf-700 cursor-pointer hover:bg-prf-700 hover:text-white transition-colors"
              aria-label="Fonte padrão"
            >
              A
            </button>
            <button
              onClick={increase}
              disabled={fontScale >= 1.4}
              className="w-12 h-12 rounded-xl bg-prf-100 text-prf-800 font-bold text-xl border-2 border-prf-700 disabled:opacity-40 cursor-pointer hover:bg-prf-700 hover:text-white transition-colors"
              aria-label="Aumentar fonte"
            >
              A+
            </button>
          </div>
          <label className="flex items-center gap-3 cursor-pointer mt-1">
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="w-6 h-6 accent-prf-800"
            />
            <span className="text-base font-medium text-gray-800">Alto contraste</span>
          </label>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-prf-800 text-white shadow-xl flex items-center justify-center text-2xl cursor-pointer hover:bg-prf-700 transition-colors border-2 border-white"
        aria-label={open ? "Fechar controles de acessibilidade" : "Abrir controles de acessibilidade"}
        aria-expanded={open}
      >
        {open ? "✕" : "Aa"}
      </button>
    </div>
  );
}
