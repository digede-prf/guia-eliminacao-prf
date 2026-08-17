/**
 * Árvore de decisão: "Posso eliminar este documento?"
 * 
 * Cada nó tem:
 *   id     — identificador único
 *   q      — pergunta (se for nó de pergunta)
 *   yes/no — id do próximo nó conforme resposta
 *   result — true/false (se for nó final)
 *   type   — "descarte" ou "eliminacao" (nos resultados positivos)
 *   msg    — mensagem explicativa (nós finais)
 *   ref    — referência ao artigo da IN
 */
export const DECISION_STEPS = [
  {
    id: "start",
    q: "O documento é uma CÓPIA SIMPLES ou CÓPIA AUTENTICADA ADMINISTRATIVAMENTE que já foi digitalizada e capturada no SEI?",
    yes: "descarte_ok",
    no: "check_original"
  },
  {
    id: "descarte_ok",
    result: true,
    type: "descarte",
    msg: "Você pode fazer o DESCARTE do suporte físico (papel). Não precisa de LED, ECED, TED nem autorização do Arquivo Nacional. Basta garantir que a digitalização está íntegra e completa.",
    ref: "Art. 12 a 16"
  },
  {
    id: "check_original",
    q: "O documento é um ORIGINAL (com assinatura autógrafa) ou cópia autenticada por TABELIÃO (cartório)?",
    yes: "no_descarte",
    no: "check_classificado"
  },
  {
    id: "no_descarte",
    result: false,
    msg: "Este documento NÃO pode ser descartado por simples digitalização. Se for documento de arquivo, pode eventualmente ser eliminado pelo procedimento completo (LED), desde que cumpra todos os requisitos.",
    ref: "Art. 13, inciso III"
  },
  {
    id: "check_classificado",
    q: "O documento está CLASSIFICADO de acordo com o Código de Classificação aplicável (atividade-meio ou atividade-fim)?",
    yes: "check_prazo",
    no: "nao_eliminar_class"
  },
  {
    id: "nao_eliminar_class",
    result: false,
    msg: "NÃO pode ser eliminado. O documento precisa estar classificado antes de ser incluído em qualquer LED. Classifique primeiro, depois avalie a eliminação.",
    ref: "Art. 10, § 1º e Art. 32, inciso III"
  },
  {
    id: "check_prazo",
    q: "O prazo de guarda previsto na Tabela de Temporalidade já foi integralmente cumprido?",
    yes: "check_permanente",
    no: "nao_eliminar_prazo"
  },
  {
    id: "nao_eliminar_prazo",
    result: false,
    msg: "NÃO pode ser eliminado. O documento ainda não cumpriu o prazo de guarda. Aguarde o cumprimento integral do prazo antes de incluí-lo em LED.",
    ref: "Art. 32, inciso II"
  },
  {
    id: "check_permanente",
    q: "A destinação final na Tabela de Temporalidade é ELIMINAÇÃO (e não guarda permanente)?",
    yes: "check_vedacao",
    no: "nao_eliminar_permanente"
  },
  {
    id: "nao_eliminar_permanente",
    result: false,
    msg: "NÃO pode ser eliminado. Documentos com destinação de guarda permanente ou valor histórico nunca podem ser eliminados.",
    ref: "Art. 32, inciso I"
  },
  {
    id: "check_vedacao",
    q: "O documento está livre de TODAS estas situações?\n• Processo judicial/administrativo/disciplinar em curso\n• Auditoria ou investigação em andamento\n• Pedido de acesso à informação\n• Ordem de preservação\n• Classificação de sigilo vigente",
    yes: "pode_eliminar",
    no: "nao_eliminar_vedacao"
  },
  {
    id: "nao_eliminar_vedacao",
    result: false,
    msg: "NÃO pode ser eliminado neste momento. Existe vedação ativa. Os prazos de guarda ficam suspensos durante a vigência dessas situações. A eliminação só poderá ser retomada após liberação expressa.",
    ref: "Art. 11 e Art. 32, incisos IV a VI e X"
  },
  {
    id: "pode_eliminar",
    result: true,
    type: "eliminacao",
    msg: "O documento PODE ser incluído em uma LED para eliminação, desde que seja cumprido todo o procedimento: elaboração da LED pela SCPAD, análise e aprovação pela CNPAD, aprovação pelo Diretor-Geral, autorização do Arquivo Nacional, publicação do ECED, aguardo de 45 dias, eliminação supervisionada e publicação do TED.",
    ref: "Art. 17 e Art. 18"
  }
];
