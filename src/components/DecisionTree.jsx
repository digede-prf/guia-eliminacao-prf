import { useState } from "react";
import { DECISION_STEPS } from "../data/decision-tree";
import { trackEvent } from "../utils/analytics";
import Header from "./Header";

export default function DecisionTree({ onBack }) {
  const [step, setStep] = useState("start");
  const current = DECISION_STEPS.find((s) => s.id === step);

  const handleAnswer = (nextId) => {
    setStep(nextId);
    const next = DECISION_STEPS.find((s) => s.id === nextId);
    if (next?.result !== undefined) {
      trackEvent("decision_result", next.result ? "pode_eliminar" : "nao_pode");
    }
  };

  const handleReset = () => {
    setStep("start");
    trackEvent("decision_reset");
  };

  const handleBack = () => {
    setStep("start");
    onBack();
  };

  return (
    <div className="min-h-screen bg-prf-50">
      <Header
        title="Posso Eliminar Este Documento?"
        sub="Responda as perguntas para descobrir"
        onBack={handleBack}
      />
      <main className="max-w-3xl mx-auto px-4 pb-10 pt-5">
        {current.result !== undefined ? (
          /* Resultado */
          <div>
            <div
              className={`rounded-2xl p-6 text-lg leading-relaxed ${
                current.result
                  ? "bg-ok-light border-2 border-ok"
                  : "bg-danger-light border-2 border-danger"
              }`}
              role="alert"
            >
              <span
                className={`inline-block px-4 py-1.5 rounded-xl text-[15px] font-bold mb-3 ${
                  current.result
                    ? "bg-ok-border text-green-900"
                    : "bg-danger-border text-red-900"
                }`}
              >
                {current.result
                  ? current.type === "descarte"
                    ? "✅ DESCARTE PERMITIDO"
                    : "✅ ELIMINAÇÃO POSSÍVEL"
                  : "❌ NÃO PODE SER ELIMINADO"}
              </span>
              <p className="whitespace-pre-line mb-4">{current.msg}</p>
              <span className="inline-block bg-prf-100 text-prf-800 px-3 py-1 rounded-lg text-[15px] font-semibold">
                📌 {current.ref}
              </span>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-3 w-full bg-prf-700 text-white rounded-2xl px-5 py-5 text-lg font-semibold mt-5 cursor-pointer hover:bg-prf-800 transition-colors min-h-[48px]"
            >
              🔄 Consultar outro documento
            </button>
          </div>
        ) : (
          /* Pergunta */
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <p className="text-[15px] text-gray-500 font-semibold mb-3">
              Responda:
            </p>
            <p className="text-xl font-semibold leading-snug mb-7 whitespace-pre-line">
              {current.q}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleAnswer(current.yes)}
                className="flex-1 py-5 text-xl font-bold rounded-xl bg-prf-700 text-white cursor-pointer hover:bg-prf-800 transition-colors min-h-[48px]"
              >
                👍 SIM
              </button>
              <button
                onClick={() => handleAnswer(current.no)}
                className="flex-1 py-5 text-xl font-bold rounded-xl bg-gray-400 text-white cursor-pointer hover:bg-gray-500 transition-colors min-h-[48px]"
              >
                👎 NÃO
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
