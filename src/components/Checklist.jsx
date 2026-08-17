import { useState, useEffect } from "react";
import { CHECKLIST } from "../data/checklist";
import { saveChecklist, loadChecklist, clearChecklist } from "../utils/storage";
import { trackEvent } from "../utils/analytics";
import Header from "./Header";

export default function ChecklistScreen({ onBack }) {
  const [checks, setChecks] = useState(() => loadChecklist());

  // Persist on every change
  useEffect(() => {
    saveChecklist(checks);
  }, [checks]);

  const total = CHECKLIST.reduce((s, c) => s + c.items.length, 0);
  const done = Object.values(checks).filter(Boolean).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const toggle = (id) => {
    setChecks((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      trackEvent("checklist_toggle", id);
      return next;
    });
  };

  const handleClear = () => {
    setChecks({});
    clearChecklist();
    trackEvent("checklist_clear");
  };

  return (
    <div className="min-h-screen bg-prf-50">
      <Header
        title="Checklist da LED"
        sub="Verifique ANTES de enviar à CNPAD"
        onBack={onBack}
      />
      <main className="max-w-3xl mx-auto px-4 pb-10 pt-5">
        {/* Progress bar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center mb-4">
          <p className="text-base text-gray-500 font-semibold">Progresso</p>
          <div className="bg-gray-200 rounded-xl h-7 mt-2.5 overflow-hidden relative" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <div
              className={`h-full rounded-xl transition-all duration-300 ${
                pct === 100 ? "bg-ok" : "bg-prf-700"
              }`}
              style={{ width: `${pct}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[15px] font-bold" style={{ color: pct > 50 ? "white" : "#1a2332" }}>
              {done} de {total} ({pct}%)
            </span>
          </div>
          {pct === 100 && (
            <p className="mt-3 text-lg font-bold text-ok">
              ✅ LED pronta para envio à CNPAD!
            </p>
          )}
        </div>

        {/* Categories */}
        {CHECKLIST.map((cat, ci) => (
          <section key={ci} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-4">
            <h3 className="text-xl font-bold text-prf-800 mb-3.5 pb-2.5 border-b-2 border-prf-100">
              {cat.cat}
            </h3>
            {cat.items.map((item) => (
              <label
                key={item.id}
                className="flex items-start gap-3.5 py-3 px-1 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <input
                  type="checkbox"
                  checked={!!checks[item.id]}
                  onChange={() => toggle(item.id)}
                  className="w-7 h-7 mt-0.5 shrink-0 accent-prf-700 cursor-pointer"
                />
                <span
                  className={`text-lg leading-snug ${
                    checks[item.id]
                      ? "text-gray-400 line-through"
                      : "text-gray-800"
                  }`}
                >
                  {item.t}
                </span>
              </label>
            ))}
          </section>
        ))}

        {/* Clear button */}
        <button
          onClick={handleClear}
          className="flex items-center justify-center gap-2 w-full bg-danger-light text-danger border-2 border-danger-border rounded-2xl px-5 py-5 text-lg font-semibold cursor-pointer hover:bg-red-100 transition-colors"
        >
          🔄 Limpar tudo e recomeçar
        </button>
      </main>
    </div>
  );
}
