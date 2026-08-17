import { useState, useRef } from "react";
import { getSampleSize } from "../data/sample-table";
import { trackEvent } from "../utils/analytics";
import Header from "./Header";

/**
 * Sorteio de Amostra Aleatória
 * 
 * O usuário cadastra os códigos de classificação presentes na LED,
 * cada um com seu número de caixas/pastas. O app:
 * 1. Soma o total de unidades de arquivamento
 * 2. Calcula o tamanho da amostra (Anexo II)
 * 3. Distribui a amostra proporcionalmente entre os códigos
 * 4. Sorteia aleatoriamente quais caixas verificar dentro de cada código
 * 5. Gera resultado imprimível/exportável
 */

export default function Sorteio({ onBack }) {
  const [codigos, setCodigos] = useState([]);
  const [novoCodigoNum, setNovoCodigoNum] = useState("");
  const [novoCodigoDesc, setNovoCodigoDesc] = useState("");
  const [novoCodigoQtd, setNovoCodigoQtd] = useState("");
  const [resultado, setResultado] = useState(null);
  const resultRef = useRef(null);

  // Total de caixas
  const total = codigos.reduce((s, c) => s + c.qtd, 0);
  const sampleInfo = total > 0 ? getSampleSize(total) : null;

  const adicionarCodigo = () => {
    const num = novoCodigoNum.trim();
    const desc = novoCodigoDesc.trim();
    const qtd = parseInt(novoCodigoQtd);

    if (!num) return alert("Informe o código de classificação.");
    if (!desc) return alert("Informe o descritor.");
    if (!qtd || qtd <= 0) return alert("Informe a quantidade de caixas/pastas.");

    setCodigos((prev) => [
      ...prev,
      { id: Date.now(), codigo: num, descritor: desc, qtd }
    ]);
    setNovoCodigoNum("");
    setNovoCodigoDesc("");
    setNovoCodigoQtd("");
    setResultado(null);
    trackEvent("sorteio_add_codigo", `${num} - ${desc} (${qtd})`);
  };

  const removerCodigo = (id) => {
    setCodigos((prev) => prev.filter((c) => c.id !== id));
    setResultado(null);
  };

  const realizarSorteio = () => {
    if (total === 0) return;
    const amostra = sampleInfo.size;

    // Distribuir proporcionalmente
    const codigosComAmostra = codigos.map((c) => {
      const proporcao = c.qtd / total;
      return { ...c, proporcao, amostraIdeal: proporcao * amostra };
    });

    // Arredondar mantendo o total correto
    let amostraDistribuida = codigosComAmostra.map((c) => ({
      ...c,
      amostraFinal: Math.floor(c.amostraIdeal)
    }));

    // Distribuir o resto pelos que têm maior fração decimal
    let somaAtual = amostraDistribuida.reduce((s, c) => s + c.amostraFinal, 0);
    let resto = amostra - somaAtual;

    if (resto > 0) {
      const porFracao = [...amostraDistribuida]
        .map((c, i) => ({ i, frac: c.amostraIdeal - c.amostraFinal }))
        .sort((a, b) => b.frac - a.frac);

      for (let r = 0; r < resto && r < porFracao.length; r++) {
        amostraDistribuida[porFracao[r].i].amostraFinal++;
      }
    }

    // Garantir que nenhum código tenha amostra maior que o total de caixas
    amostraDistribuida = amostraDistribuida.map((c) => ({
      ...c,
      amostraFinal: Math.min(c.amostraFinal, c.qtd)
    }));

    // Sortear caixas de cada código
    const resultadoSorteio = amostraDistribuida.map((c) => {
      const sorteadas = sortearNumeros(c.qtd, c.amostraFinal);
      return {
        codigo: c.codigo,
        descritor: c.descritor,
        totalCaixas: c.qtd,
        amostraFinal: c.amostraFinal,
        proporcao: c.proporcao,
        caixasSorteadas: sorteadas
      };
    });

    const res = {
      totalUnidades: total,
      tamanhoAmostra: amostra,
      percentual: sampleInfo.pct,
      integral: sampleInfo.integral,
      dataHora: new Date().toLocaleString("pt-BR"),
      codigos: resultadoSorteio
    };

    setResultado(res);
    trackEvent("sorteio_realizado", `total=${total}, amostra=${amostra}`);

    // Scroll para resultado
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const novoSorteio = () => {
    setResultado(null);
  };

  const imprimir = () => {
    trackEvent("sorteio_imprimir");
    window.print();
  };

  const exportarCSV = () => {
    if (!resultado) return;
    let csv = "\uFEFF"; // BOM for Excel
    csv += "SORTEIO DE AMOSTRA ALEATÓRIA — GUIA DA IN PRF\n";
    csv += `Data/Hora do sorteio:,${resultado.dataHora}\n`;
    csv += `Total de unidades na LED:,${resultado.totalUnidades}\n`;
    csv += `Tamanho da amostra (Anexo II):,${resultado.tamanhoAmostra}\n`;
    csv += `Percentual:,${resultado.percentual}\n\n`;

    resultado.codigos.forEach((c) => {
      csv += `Código ${c.codigo},${c.descritor}\n`;
      csv += `Total de caixas/pastas:,${c.totalCaixas}\n`;
      csv += `Quantidade sorteada:,${c.amostraFinal}\n`;
      csv += `Caixas/pastas sorteadas:,"${c.caixasSorteadas.join(", ")}"\n\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sorteio-amostra-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    trackEvent("sorteio_exportar_csv");
  };

  return (
    <div className="min-h-screen bg-prf-50">
      <Header
        title="Sorteio de Amostra"
        sub="Seleção aleatória de unidades para verificação"
        onBack={onBack}
      />
      <main className="max-w-3xl mx-auto px-4 pb-10 pt-5">

        {/* Explicação */}
        <div className="bg-prf-100 rounded-2xl p-5 mb-4 border border-prf-700/20">
          <p className="text-base text-prf-800 leading-relaxed">
            <strong>Como funciona:</strong> cadastre os códigos de classificação presentes na LED
            com a quantidade de caixas/pastas de cada um. O app calcula a amostra
            conforme o Anexo II e sorteia aleatoriamente quais unidades devem ser verificadas,
            distribuindo proporcionalmente entre os códigos.
          </p>
        </div>

        {!resultado ? (
          <>
            {/* Formulário para adicionar código */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-4">
              <h3 className="text-lg font-bold text-prf-800 mb-4">
                Adicionar código de classificação
              </h3>

              <div className="space-y-3">
                <div>
                  <label htmlFor="codigo-num" className="block text-base font-semibold text-gray-600 mb-1">
                    Código
                  </label>
                  <input
                    id="codigo-num"
                    type="text"
                    className="w-full px-4 py-3.5 text-lg border-2 border-gray-300 rounded-xl bg-white"
                    placeholder="Ex: 315"
                    value={novoCodigoNum}
                    onChange={(e) => setNovoCodigoNum(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="codigo-desc" className="block text-base font-semibold text-gray-600 mb-1">
                    Descritor
                  </label>
                  <input
                    id="codigo-desc"
                    type="text"
                    className="w-full px-4 py-3.5 text-lg border-2 border-gray-300 rounded-xl bg-white"
                    placeholder="Ex: Defesa e Recurso"
                    value={novoCodigoDesc}
                    onChange={(e) => setNovoCodigoDesc(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="codigo-qtd" className="block text-base font-semibold text-gray-600 mb-1">
                    Quantidade de caixas/pastas
                  </label>
                  <input
                    id="codigo-qtd"
                    type="number"
                    inputMode="numeric"
                    className="w-full px-4 py-3.5 text-lg border-2 border-gray-300 rounded-xl bg-white"
                    placeholder="Ex: 200"
                    value={novoCodigoQtd}
                    onChange={(e) => setNovoCodigoQtd(e.target.value)}
                    min="1"
                  />
                </div>

                <button
                  onClick={adicionarCodigo}
                  className="w-full bg-prf-700 text-white rounded-xl px-5 py-4 text-lg font-semibold cursor-pointer hover:bg-prf-800 transition-colors min-h-[48px] mt-1"
                >
                  + Adicionar código
                </button>
              </div>
            </div>

            {/* Lista de códigos adicionados */}
            {codigos.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-4">
                <h3 className="text-lg font-bold text-prf-800 mb-3">
                  Códigos na LED
                </h3>
                {codigos.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between gap-3 py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="inline-block bg-prf-800 text-white rounded-lg px-2.5 py-1 text-sm font-bold mr-2">
                        {c.codigo}
                      </span>
                      <span className="text-lg text-gray-800">{c.descritor}</span>
                      <span className="block text-base text-gray-500 mt-0.5">
                        {c.qtd} caixa{c.qtd !== 1 ? "s" : ""}/pasta{c.qtd !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <button
                      onClick={() => removerCodigo(c.id)}
                      className="text-red-500 text-2xl px-2 cursor-pointer hover:text-red-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
                      aria-label={`Remover código ${c.codigo}`}
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {/* Resumo */}
                <div className="bg-prf-100 rounded-xl p-4 mt-4 text-center">
                  <p className="text-base text-gray-500">Total de unidades na LED</p>
                  <p className="text-4xl font-extrabold text-prf-800">{total}</p>
                  {sampleInfo && (
                    <p className="text-lg text-gray-600 mt-1">
                      Amostra: <strong>{sampleInfo.size}</strong> unidades ({sampleInfo.pct})
                    </p>
                  )}
                </div>

                {/* Botão de sortear */}
                <button
                  onClick={realizarSorteio}
                  className="w-full bg-ok text-white rounded-xl px-5 py-5 text-xl font-bold cursor-pointer hover:bg-green-700 transition-colors min-h-[48px] mt-4"
                >
                  🎲 Realizar Sorteio
                </button>
              </div>
            )}
          </>
        ) : (
          /* RESULTADO DO SORTEIO */
          <div ref={resultRef}>
            {/* Cabeçalho do resultado — visível na impressão */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-prf-700 mb-4 print-block">
              <div className="text-center mb-4 print-header">
                <h2 className="text-xl font-bold text-prf-800">
                  Sorteio de Amostra Aleatória
                </h2>
                <p className="text-base text-gray-500">
                  Instrução Normativa PRF — Anexos I e II
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Gerado em: {resultado.dataHora}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-prf-100 rounded-xl p-3">
                  <p className="text-sm text-gray-500">Total na LED</p>
                  <p className="text-2xl font-extrabold text-prf-800">{resultado.totalUnidades}</p>
                </div>
                <div className="bg-prf-100 rounded-xl p-3">
                  <p className="text-sm text-gray-500">Amostra</p>
                  <p className="text-2xl font-extrabold text-prf-800">{resultado.tamanhoAmostra}</p>
                </div>
                <div className="bg-prf-100 rounded-xl p-3">
                  <p className="text-sm text-gray-500">Percentual</p>
                  <p className="text-2xl font-extrabold text-prf-800">{resultado.percentual}</p>
                </div>
              </div>

              {resultado.integral && (
                <div className="bg-warn-light border-2 border-warn rounded-xl p-3 mt-3 text-center">
                  <p className="text-base font-bold text-amber-900">
                    ⚠️ Verificação integral — todas as unidades devem ser conferidas
                  </p>
                </div>
              )}
            </div>

            {/* Caixas sorteadas por código */}
            {resultado.codigos.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-4 print-block">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="inline-block bg-prf-800 text-white rounded-lg px-3 py-1 text-base font-bold">
                      {c.codigo}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800 mt-1">{c.descritor}</h3>
                    <p className="text-base text-gray-500">
                      {c.amostraFinal} de {c.totalCaixas} caixas/pastas
                      ({Math.round(c.proporcao * 100)}% do total)
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-500 mb-2">
                    Caixas/pastas sorteadas:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {c.caixasSorteadas.map((num) => (
                      <span
                        key={num}
                        className="inline-block bg-prf-700 text-white rounded-lg px-3 py-1.5 text-base font-bold min-w-[44px] text-center"
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Nota para impressão */}
            <div className="bg-gray-50 rounded-2xl p-5 mb-4 border border-gray-200 print-block">
              <p className="text-sm text-gray-500 leading-relaxed">
                <strong>Método:</strong> Seleção aleatória estratificada proporcional.
                A amostra foi distribuída entre os códigos de classificação proporcionalmente
                ao número de unidades de cada código na LED, conforme o Anexo I da IN.
                O sorteio foi realizado por geração de números aleatórios sem repetição.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Nível de confiança:</strong> 95% · <strong>Margem de erro:</strong> 5%
              </p>
            </div>

            {/* Ações */}
            <div className="flex flex-col gap-3 no-print">
              <button
                onClick={imprimir}
                className="w-full bg-prf-700 text-white rounded-xl px-5 py-4 text-lg font-semibold cursor-pointer hover:bg-prf-800 transition-colors min-h-[48px]"
              >
                🖨️ Imprimir resultado
              </button>

              <button
                onClick={exportarCSV}
                className="w-full bg-prf-100 text-prf-800 border-2 border-prf-700 rounded-xl px-5 py-4 text-lg font-semibold cursor-pointer hover:bg-prf-700 hover:text-white transition-colors min-h-[48px]"
              >
                📥 Exportar como CSV
              </button>

              <button
                onClick={realizarSorteio}
                className="w-full bg-warn-light text-amber-900 border-2 border-warn rounded-xl px-5 py-4 text-lg font-semibold cursor-pointer hover:bg-amber-100 transition-colors min-h-[48px]"
              >
                🎲 Sortear novamente (mesmos códigos)
              </button>

              <button
                onClick={novoSorteio}
                className="w-full bg-gray-100 text-gray-700 border-2 border-gray-300 rounded-xl px-5 py-4 text-lg font-semibold cursor-pointer hover:bg-gray-200 transition-colors min-h-[48px]"
              >
                ↩ Voltar e editar códigos
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/**
 * Gera uma lista de 'qtd' números aleatórios entre 1 e 'total' (sem repetição).
 * Algoritmo Fisher-Yates shuffle parcial para eficiência.
 */
function sortearNumeros(total, qtd) {
  if (qtd >= total) {
    // Verificação integral — retorna todos
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // Criar array [1, 2, ..., total]
  const arr = Array.from({ length: total }, (_, i) => i + 1);

  // Fisher-Yates parcial — só embaralha os primeiros 'qtd' elementos
  for (let i = 0; i < qtd; i++) {
    const j = i + Math.floor(Math.random() * (total - i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  // Retorna os 'qtd' primeiros, ordenados
  return arr.slice(0, qtd).sort((a, b) => a - b);
}
