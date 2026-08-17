/**
 * Tabela de prazos da IN — consolidada por tipo.
 * tipo: "proc" = procedimento, "recor" = recorrente, "trans" = transição
 */
export const PRAZOS = [
  { quem: "CNPAD", oque: "Concluir análise técnica prévia da LED", prazo: "15 dias", ref: "Art. 18, § 2º", tipo: "proc" },
  { quem: "Superintendente", oque: "Verificar guarda e ordens de preservação, assinar a LED", prazo: "15 dias", ref: "Art. 18, § 4º", tipo: "proc" },
  { quem: "CNPAD", oque: "Dar ciência ao Arquivo Nacional da publicação do ECED", prazo: "2 dias", ref: "Art. 18, XVI", tipo: "proc" },
  { quem: "Sociedade", oque: "Prazo para manifestação após publicação do ECED no DOU", prazo: "45 dias", ref: "Art. 29", tipo: "proc" },
  { quem: "SCPAD", oque: "Elaborar nova LED (periodicidade máxima)", prazo: "2 anos", ref: "Art. 28", tipo: "recor" },
  { quem: "Superintendente", oque: "Adequar portaria da SCPAD à nova IN", prazo: "60 dias da publicação", ref: "Art. 7º, § 7º", tipo: "trans" },
  { quem: "—", oque: "Entrada em vigor da IN", prazo: "60 dias da publicação", ref: "Art. 41", tipo: "trans" },
  { quem: "SCPAD", oque: "Comunicar à DIGEDE se não houver documentos para eliminação", prazo: "A cada ciclo (2 anos)", ref: "Art. 28", tipo: "recor" },
];

export const TIPO_CONFIG = {
  proc:  { label: "Procedimento de eliminação", bg: "bg-prf-100",     border: "border-prf-700",   dot: "bg-prf-700" },
  recor: { label: "Obrigações recorrentes",     bg: "bg-ok-light",    border: "border-ok",        dot: "bg-ok" },
  trans: { label: "Transição",                  bg: "bg-warn-light",  border: "border-warn",      dot: "bg-warn" },
};

export const TIPO_ORDER = ["proc", "recor", "trans"];
