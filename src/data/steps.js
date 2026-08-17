/**
 * As 21 etapas do procedimento de eliminação (Art. 18).
 * n = número, t = título, who = responsável, d = descrição detalhada
 */
export const STEPS = [
  { n: 1, t: "Abrir processo no SEI", who: "SCPAD", d: "Autuar processo administrativo específico para a eliminação no Sistema Eletrônico de Informações." },
  { n: 2, t: "Diagnóstico e triagem do acervo", who: "SCPAD", d: "Identificar, organizar, classificar e avaliar os documentos. Se for massa acumulada (documentos que nunca foram organizados), primeiro é preciso fazer um levantamento completo: ir ao local, registrar o que existe, o volume, as datas, o estado de conservação, a localização e os riscos. É o \"raio-X\" do arquivo." },
  { n: 3, t: "Aplicar tabela de temporalidade", who: "SCPAD", d: "Verificar se os prazos de guarda foram cumpridos usando as tabelas corretas: Portaria AN/MGI 174/2024 (meio) ou Portaria AN 103/2018 (fim). Verificar vedações do Art. 32." },
  { n: 4, t: "Elaborar minuta da LED", who: "SCPAD", d: "Preencher todos os campos: código de classificação, descritor, datas-limite, unidades de arquivamento, mensuração total." },
  { n: 5, t: "Elaborar inventário", who: "SCPAD", d: "Registrar em sistema institucional todos os conjuntos documentais da LED, com relação individual dos processos/documentos e respectiva unidade de arquivamento." },
  { n: 6, t: "Enviar à CNPAD — análise prévia", who: "SCPAD → CNPAD", d: "Encaminhar a minuta da LED à CNPAD para verificação inicial de conformidade." },
  { n: 7, t: "Análise técnica prévia", who: "CNPAD", d: "Conferir campos, códigos, prazos, vedações e inventário em até 15 dias. Devolver com diligências ou declarar aptidão para prosseguir." },
  { n: 8, t: "Ajustar e assinar", who: "SCPAD", d: "Realizar adequações indicadas pela CNPAD, consolidar a LED e colher assinatura do Presidente da SCPAD." },
  { n: 9, t: "Ciência e assinatura do Superintendente", who: "Superintendente", d: "Em 15 dias, verificar responsabilidade pela guarda e inexistência de ordem de preservação. Assinar a LED (não é aprovação, é atestação)." },
  { n: 10, t: "Conferência da DIGEDE", who: "DIGEDE", d: "Verificar regularidade da instrução processual e encaminhar à CNPAD para amostragem." },
  { n: 11, t: "Análise por amostragem", who: "CNPAD", d: "Selecionar aleatoriamente unidades de arquivamento conforme Anexo II e conferir integralmente seu conteúdo. Presencial ou documental conforme Art. 21." },
  { n: 12, t: "RAT e aprovação colegiada", who: "CNPAD", d: "Emitir Relatório de Análise Técnica (Anexo IV), aprovar a LED em reunião registrada em ata. Presidente da CNPAD assina a LED." },
  { n: 13, t: "Aprovação do Diretor-Geral", who: "Diretor-Geral", d: "Aprovar a LED como autoridade máxima da PRF e assinar." },
  { n: 14, t: "Envio ao Arquivo Nacional", who: "CNPAD + DIGEDE", d: "Encaminhar LED, RAT, despacho do Superintendente, ata da CNPAD e demais documentos pelo SOT." },
  { n: 15, t: "Autorização do Arquivo Nacional", who: "Arquivo Nacional", d: "Aguardar autorização formal para eliminação. Dispensada apenas se houver delegação formal ao Diretor-Geral." },
  { n: 16, t: "Publicar ECED no DOU", who: "CNPAD", d: "Publicar edital no Diário Oficial da União e dar ciência ao Arquivo Nacional em 2 dias." },
  { n: 17, t: "Aguardar 45 dias", who: "—", d: "Prazo para manifestações de interesse, pedidos de cópia ou desentranhamento. A eliminação só pode ocorrer após esse prazo." },
  { n: 18, t: "Eliminação física", who: "SCPAD", d: "Fragmentação irreversível, supervisionada pelo Presidente da SCPAD ou agente designado. Observar sigilo e proteção de dados." },
  { n: 19, t: "Elaborar e publicar TED", who: "SCPAD + CNPAD", d: "Elaborar Termo de Eliminação e publicar no Boletim de Serviço Eletrônico." },
  { n: 20, t: "Enviar TED ao Arquivo Nacional", who: "CNPAD", d: "Encaminhar pelo SOT para ciência da eliminação efetivada." },
  { n: 21, t: "Juntar documentação ao processo", who: "SCPAD", d: "Reunir toda a documentação comprobatória no processo administrativo do SEI." }
];
