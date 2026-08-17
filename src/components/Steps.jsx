import { useState } from "react";
import { STEPS } from "../data/steps";
import { trackEvent } from "../utils/analytics";
import Header from "./Header";

export default function StepsScreen({ onBack }) {
  const [openStep, setOpenStep] = useState(null);

  const toggleStep = (n) => {
    const next = openStep === n ? null : n;
    setOpenStep(next);
    if (next) trackEvent("step_view", `Etapa ${n}`);
  };

  return (
    <div className="min-h-screen bg-prf-50">
      <Header
        title="Passo a Passo da Eliminação"
        sub="As 21 etapas do procedimento completo (Art. 18)"
        onBack={onBack}
      />
      <main className="max-w-3xl mx-auto px-4 pb-10 pt-5">
        {/* Warning */}
        <div className="bg-warn-light border-2 border-warn rounded-2xl p-5 mb-5">
          <p className="text-lg font-semibold text-amber-900">⚠️ Atenção</p>
          <p className="text-base text-amber-900 mt-1 leading-relaxed">
            Este é o procedimento para ELIMINAÇÃO de documentos de arquivo. Para o DESCARTE de
            cópias digitalizadas, o procedimento é mais simples — consulte a seção "Descarte de
            Cópias Digitalizadas" nas Perguntas Frequentes.
          </p>
        </div>

        {/* Steps */}
        {STEPS.map((st) => (
          <button
            key={st.n}
            className={`flex justify-between items-start gap-3 w-full bg-white border-2 rounded-xl px-5 py-4 text-left mb-2 cursor-pointer transition-colors ${
              openStep === st.n ? "border-prf-700" : "border-gray-200 hover:border-prf-700"
            }`}
            onClick={() => toggleStep(st.n)}
            aria-expanded={openStep === st.n}
          >
            <div className="flex items-start gap-3.5 flex-1 min-w-0">
              <span
                className="bg-prf-700 text-white rounded-xl min-w-[38px] h-[38px] flex items-center justify-center font-bold text-base shrink-0"
                aria-hidden="true"
              >
                {st.n}
              </span>
              <div className="min-w-0">
                <span className="block text-lg font-semibold leading-snug">{st.t}</span>
                <span className="block text-sm text-gray-500 font-medium mt-0.5">
                  Responsável: {st.who}
                </span>
                {openStep === st.n && (
                  <p className="text-base text-gray-700 mt-2.5 leading-relaxed font-normal">
                    {st.d}
                  </p>
                )}
              </div>
            </div>
            <span className="text-xl shrink-0 mt-1" aria-hidden="true">
              {openStep === st.n ? "▲" : "▼"}
            </span>
          </button>
        ))}
      </main>
    </div>
  );
}
