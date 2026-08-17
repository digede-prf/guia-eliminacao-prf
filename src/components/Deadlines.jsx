import { PRAZOS, TIPO_CONFIG, TIPO_ORDER } from "../data/deadlines";
import { trackEvent } from "../utils/analytics";
import Header from "./Header";

export default function Deadlines({ onBack }) {
  return (
    <div className="min-h-screen bg-prf-50">
      <Header
        title="Tabela de Prazos"
        sub="Todos os prazos da IN consolidados"
        onBack={onBack}
      />
      <main className="max-w-3xl mx-auto px-4 pb-10 pt-5">
        {TIPO_ORDER.map((tipo) => {
          const config = TIPO_CONFIG[tipo];
          const items = PRAZOS.filter((p) => p.tipo === tipo);
          return (
            <section key={tipo} className="mb-2">
              <h3 className="text-xl font-bold text-prf-800 mt-5 mb-3 pl-1">
                {config.label}
              </h3>
              {items.map((p, i) => (
                <div
                  key={i}
                  className={`${config.bg} border-l-[5px] ${config.border} rounded-2xl p-4 sm:p-5 mb-2.5`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-semibold text-gray-800 leading-snug">
                        {p.oque}
                      </p>
                      <p className="text-base text-gray-500 mt-1.5">
                        Responsável: {p.quem}
                      </p>
                    </div>
                    <span
                      className={`${config.dot} text-white rounded-xl px-4 py-2 text-base font-extrabold shrink-0 text-center min-w-[80px]`}
                    >
                      {p.prazo}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block bg-white/60 text-prf-800 px-3 py-1 rounded-lg text-[15px] font-semibold">
                      📌 {p.ref}
                    </span>
                  </div>
                </div>
              ))}
            </section>
          );
        })}

        {/* Warning */}
        <div className="bg-danger-light border-2 border-danger-border rounded-2xl p-5 mt-4">
          <p className="text-lg font-semibold text-red-900">⚠️ Atenção</p>
          <p className="text-base text-red-900 mt-1.5 leading-relaxed">
            Os prazos de guarda dos documentos ficam SUSPENSOS enquanto houver ordem de
            preservação (processo judicial, auditoria, investigação). O prazo só volta a correr
            após a liberação expressa.
          </p>
          <span className="inline-block bg-prf-100 text-prf-800 px-3 py-1 rounded-lg text-[15px] font-semibold mt-2">
            📌 Art. 11
          </span>
        </div>
      </main>
    </div>
  );
}
