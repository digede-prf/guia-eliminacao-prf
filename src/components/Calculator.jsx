import { useState } from "react";
import { getSampleSize, getHighlightIndex, SAMPLE_TABLE_DISPLAY } from "../data/sample-table";
import { trackEvent } from "../utils/analytics";
import Header from "./Header";

export default function Calculator({ onBack }) {
  const [input, setInput] = useState("");
  const n = parseInt(input) || 0;
  const result = n > 0 ? getSampleSize(n) : null;
  const hlIndex = getHighlightIndex(n);

  const handleChange = (val) => {
    setInput(val);
    const num = parseInt(val);
    if (num > 0) {
      trackEvent("calculator_use", `n=${num}`);
    }
  };

  return (
    <div className="min-h-screen bg-prf-50">
      <Header
        title="Calculadora de Amostragem"
        sub="Anexos I e II da IN"
        onBack={onBack}
      />
      <main className="max-w-3xl mx-auto px-4 pb-10 pt-5">
        {/* Input */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <label htmlFor="sample-input" className="block text-lg font-semibold mb-1">
            Quantas unidades de arquivamento (caixas/pastas) estão na LED?
          </label>
          <p className="text-base text-gray-500 mb-4">
            Digite o número total de caixas ou pastas listadas
          </p>
          <input
            id="sample-input"
            type="number"
            className="w-full px-5 py-4 text-2xl text-center border-2 border-gray-300 rounded-xl bg-white"
            placeholder="Ex: 500"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            min="1"
            inputMode="numeric"
          />
        </div>

        {/* Result */}
        {result && (
          <div className="bg-prf-100 rounded-2xl p-6 text-center mt-4">
            <p className="text-base text-gray-500 mb-1">Unidades a analisar:</p>
            <p className="text-5xl font-extrabold text-prf-800">{result.size}</p>
            <p className="text-lg text-gray-500 mt-2">
              Corresponde a {result.pct} do total
            </p>
            <p className="text-[15px] text-gray-400 mt-3">
              Nível de confiança: 95% · Margem de erro: 5%
            </p>

            {result.integral && result.tabelaPrev && (
              <div className="bg-warn-light border-2 border-warn rounded-xl p-4 mt-4 text-left">
                <p className="text-lg font-bold text-amber-900 mb-1">
                  ⚠️ Verificação integral obrigatória
                </p>
                <p className="text-base text-amber-900 leading-relaxed">
                  A amostra prevista no Anexo II para esta faixa é de {result.tabelaPrev} unidades,
                  que excede o total informado ({n}). Neste caso, todas as {n} unidades devem ser
                  verificadas integralmente.
                </p>
              </div>
            )}

            {result.integral && !result.tabelaPrev && (
              <div className="bg-warn-light border-2 border-warn rounded-xl p-4 mt-4 text-left">
                <p className="text-lg font-bold text-amber-900">
                  ⚠️ Até 100 unidades: verificação integral obrigatória
                </p>
              </div>
            )}
          </div>
        )}

        {/* Full table */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mt-4">
          <h3 className="text-lg font-semibold mb-3">📋 Tabela completa (Anexo II)</h3>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full border-collapse text-lg">
              <thead>
                <tr className="bg-prf-100">
                  <th className="px-3.5 py-3 text-left border-b-2 border-gray-300">
                    Unid. na LED
                  </th>
                  <th className="px-3.5 py-3 text-center border-b-2 border-gray-300">
                    Analisar
                  </th>
                  <th className="px-3.5 py-3 text-center border-b-2 border-gray-300">
                    %
                  </th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_TABLE_DISPLAY.map((row, i) => {
                  const isHighlighted = i === hlIndex;
                  return (
                    <tr
                      key={i}
                      className={
                        isHighlighted
                          ? "bg-blue-100 font-bold"
                          : i % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50"
                      }
                    >
                      <td className="px-3.5 py-2.5 border-b border-gray-200">{row[0]}</td>
                      <td className="px-3.5 py-2.5 border-b border-gray-200 text-center">{row[1]}</td>
                      <td className="px-3.5 py-2.5 border-b border-gray-200 text-center">{row[2]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
