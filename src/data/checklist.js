/**
 * Checklist da LED — itens a verificar antes de enviar à CNPAD.
 * Organizados por categoria. Cada item tem id único e texto (t).
 */
export const CHECKLIST = [
  {
    cat: "Processo e Portaria",
    items: [
      { id: "c1", t: "Processo administrativo autuado no SEI específico para esta eliminação" },
      { id: "c2", t: "Portaria de designação da SCPAD vigente e adequada à nova IN (denominação SCPAD, Presidente e Substituto indicados)" },
      { id: "c3", t: "Membros da SCPAD com designação válida" }
    ]
  },
  {
    cat: "Classificação e Avaliação",
    items: [
      { id: "c4", t: "Todos os documentos classificados conforme Código de Classificação aplicável" },
      { id: "c5", t: "Tabela de temporalidade correta aplicada (meio: Portaria AN/MGI 174/2024 · fim: Portaria AN 103/2018)" },
      { id: "c6", t: "Prazos de guarda integralmente cumpridos para TODOS os itens da LED" },
      { id: "c7", t: "Destinação final na tabela é ELIMINAÇÃO (não guarda permanente) para todos os itens" }
    ]
  },
  {
    cat: "Vedações (Art. 32)",
    items: [
      { id: "c8", t: "Nenhum documento vinculado a processo judicial, administrativo, disciplinar ou policial em curso" },
      { id: "c9", t: "Nenhum documento sob auditoria, investigação ou pedido de acesso à informação" },
      { id: "c10", t: "Nenhum documento com ordem de preservação ativa" },
      { id: "c11", t: "Nenhum documento com classificação de sigilo vigente" },
      { id: "c12", t: "Consulta realizada às unidades detentoras sobre existência de ordens de preservação" },
      { id: "c13", t: "Nenhum documento relativo a contas julgadas irregulares pelo TCU" }
    ]
  },
  {
    cat: "Campos da LED",
    items: [
      { id: "c14", t: "Código de classificação preenchido corretamente em todos os itens" },
      { id: "c15", t: "Descritor preenchido conforme tabela de temporalidade" },
      { id: "c16", t: "Datas-limite (início e fim) preenchidas e coerentes" },
      { id: "c17", t: "Quantidade de unidades de arquivamento (caixas/pastas) indicada por item" },
      { id: "c18", t: "Mensuração total do conjunto documental informada" }
    ]
  },
  {
    cat: "Inventário",
    items: [
      { id: "c19", t: "Inventário elaborado e registrado em sistema institucional" },
      { id: "c20", t: "Relação individual dos processos/documentos com respectiva unidade de arquivamento" },
      { id: "c21", t: "Se massa acumulada: justificativa para inventário simplificado registrada no processo" }
    ]
  },
  {
    cat: "Revisão Final",
    items: [
      { id: "c22", t: "Minuta da LED revisada pelo Presidente da SCPAD" },
      { id: "c23", t: "Toda a documentação juntada ao processo no SEI" },
      { id: "c24", t: "Processo pronto para encaminhamento à CNPAD" }
    ]
  }
];
