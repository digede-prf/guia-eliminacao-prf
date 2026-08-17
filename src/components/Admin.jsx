import { useState } from "react";
import { getStats, exportCSV, clearAnalytics } from "../utils/analytics";
import Header from "./Header";

export default function Admin({ onBack }) {
  const [stats, setStats] = useState(() => getStats());
  const [showConfirm, setShowConfirm] = useState(false);

  const handleExport = () => {
    const csv = exportCSV();
    if (!csv) {
      alert("Nenhum dado para exportar.");
      return;
    }
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `guia-in-prf-dados-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    clearAnalytics();
    setStats(getStats());
    setShowConfirm(false);
  };

  const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleString("pt-BR");
  };

  return (
    <div className="min-h-screen bg-prf-50">
      <Header title="Painel de Uso" sub="Dados locais deste dispositivo" onBack={onBack} />
      <main className="max-w-3xl mx-auto px-4 pb-10 pt-5">
        {/* Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-4">
          <h3 className="text-xl font-bold text-prf-800 mb-4">Resumo</h3>
          <div className="grid grid-cols-2 gap-4">
            <Stat label="Total de eventos" value={stats.totalEvents} />
            <Stat label="Regionais" value={stats.byRegional.length} />
            <Stat label="Primeiro acesso" value={formatDate(stats.firstEvent)} small />
            <Stat label="Último acesso" value={formatDate(stats.lastEvent)} small />
          </div>
        </div>

        {/* By regional */}
        <RankingCard title="Consultas por regional" data={stats.byRegional} />

        {/* By section */}
        <RankingCard title="Seções mais acessadas" data={stats.bySections} />

        {/* By question */}
        <RankingCard title="Perguntas mais consultadas" data={stats.byQuestions} />

        {/* By search */}
        <RankingCard title="Buscas mais realizadas" data={stats.bySearches} />

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={handleExport}
            className="w-full bg-prf-700 text-white rounded-2xl px-5 py-4 text-lg font-semibold cursor-pointer hover:bg-prf-800 transition-colors min-h-[48px]"
          >
            📥 Exportar dados como CSV
          </button>

          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full bg-danger-light text-danger border-2 border-danger-border rounded-2xl px-5 py-4 text-lg font-semibold cursor-pointer hover:bg-red-100 transition-colors"
            >
              🗑️ Limpar todos os dados
            </button>
          ) : (
            <div className="bg-danger-light border-2 border-danger rounded-2xl p-5">
              <p className="text-lg font-semibold text-red-900 mb-3">
                Tem certeza? Esta ação não pode ser desfeita.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleClear}
                  className="flex-1 bg-danger text-white rounded-xl px-4 py-3 font-semibold cursor-pointer min-h-[48px]"
                >
                  Sim, limpar
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 rounded-xl px-4 py-3 font-semibold cursor-pointer min-h-[48px]"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-400 text-center mt-6 leading-relaxed">
          Estes dados são armazenados localmente neste dispositivo.<br />
          Cada regional só vê seus próprios dados de uso.<br />
          Exporte o CSV e envie à DIGEDE para consolidação.
        </p>
      </main>
    </div>
  );
}

function Stat({ label, value, small }) {
  return (
    <div className="bg-prf-100 rounded-xl p-3 text-center">
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className={`font-bold text-prf-800 mt-0.5 ${small ? "text-sm" : "text-2xl"}`}>
        {value}
      </p>
    </div>
  );
}

function RankingCard({ title, data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-4">
        <h3 className="text-xl font-bold text-prf-800 mb-2">{title}</h3>
        <p className="text-base text-gray-400">Nenhum dado registrado.</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-4">
      <h3 className="text-xl font-bold text-prf-800 mb-3">{title}</h3>
      {data.slice(0, 15).map(([name, count], i) => (
        <div
          key={i}
          className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
        >
          <span className="text-base text-gray-700 flex-1 min-w-0 truncate pr-2">
            {i + 1}. {name}
          </span>
          <span className="bg-prf-100 text-prf-800 px-3 py-1 rounded-lg text-sm font-bold shrink-0">
            {count}
          </span>
        </div>
      ))}
    </div>
  );
}
