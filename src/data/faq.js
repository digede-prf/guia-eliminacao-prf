/**
 * Perguntas Frequentes — organizadas por categoria.
 * 
 * Para adicionar uma pergunta:
 *   1. Encontre a categoria certa (ou crie uma nova)
 *   2. Adicione um objeto { q, a, ref } ao array "items"
 *   3. q = pergunta, a = resposta, ref = artigo da IN
 * 
 * Para criar uma nova categoria:
 *   Adicione um objeto { cat, icon, desc, items: [] } ao array FAQ
 */
export const FAQ = [
  {
    cat: "Conceitos Básicos",
    icon: "📖",
    desc: "Entenda os termos e definições da IN",
    items: [
      {
        q: "Qual a diferença entre DESCARTE e ELIMINAÇÃO?",
        a: "São procedimentos completamente diferentes.\n\n• DESCARTE é a destruição do papel de cópias simples ou cópias autenticadas administrativamente que já foram digitalizadas e capturadas no SEI. É mais simples: NÃO precisa de LED, ECED, TED nem autorização do Arquivo Nacional.\n\n• ELIMINAÇÃO é a destruição de documentos de arquivo que cumpriram os prazos de guarda. É mais complexo: precisa de LED, aprovação da CNPAD, aprovação do Diretor-Geral, autorização do Arquivo Nacional, publicação de edital e termo.",
        ref: "Art. 4º"
      },
      {
        q: "O que é a LED (Listagem de Eliminação de Documentos)?",
        a: "É o documento que lista todos os conjuntos de documentos que estão sendo propostos para eliminação. Ela contém: identificação do órgão, código de classificação, descritor, datas-limite, quantidade de caixas/pastas, e precisa ser assinada por 4 autoridades em sequência: Presidente da SCPAD → Superintendente → Presidente da CNPAD → Diretor-Geral.",
        ref: "Art. 3º, inciso VII e Art. 26"
      },
      {
        q: "O que é o ECED (Edital de Ciência de Eliminação)?",
        a: "É o edital publicado no Diário Oficial da União que avisa a sociedade sobre a eliminação. Após a publicação, qualquer pessoa tem 45 dias para pedir cópias ou o desentranhamento de documentos. A eliminação SÓ pode acontecer depois de passados esses 45 dias.",
        ref: "Art. 3º, inciso VIII e Art. 29"
      },
      {
        q: "O que é o TED (Termo de Eliminação de Documentos)?",
        a: "É o documento que comprova que a eliminação realmente aconteceu. É publicado no Boletim de Serviço Eletrônico e enviado ao Arquivo Nacional pelo SOT.",
        ref: "Art. 3º, inciso IX e Art. 18, incisos XIX e XX"
      },
      {
        q: "O que é uma ordem de preservação?",
        a: "É qualquer determinação (judicial, administrativa ou de órgão de controle) que impede a eliminação de documentos. Inclui: processos judiciais em curso, auditorias, investigações, pedidos de acesso à informação, litígios ou risco concreto de litígio. Enquanto houver ordem de preservação, o documento NÃO pode ser eliminado.",
        ref: "Art. 3º, inciso X e Art. 11"
      },
      {
        q: "O que é massa documental acumulada?",
        a: "É o conjunto de documentos que NUNCA recebeu tratamento técnico completo — ou seja, não foi identificado, classificado, avaliado, ordenado ou higienizado adequadamente.\n\nAntes de qualquer eliminação, é obrigatório fazer um diagnóstico da situação real desse acervo. Na prática, isso significa ir até o local onde os documentos estão guardados e registrar:\n\n• O que tem ali (quais tipos de documentos)\n• Quanto tem (volume em caixas, pastas, metros lineares)\n• De quando são (datas mais antigas e mais recentes)\n• Como estão (estado de conservação — mofo, umidade, deterioração)\n• Onde estão (localização exata — sala, armário, prateleira)\n• Quais os riscos (infiltração, pragas, incêndio, acesso indevido)\n\nÉ como um \"raio-X\" do arquivo. Sem esse diagnóstico, não se pode avançar para a eliminação.",
        ref: "Art. 3º, inciso VI e Art. 33"
      },
      {
        q: "O que é o RAT (Relatório de Análise Técnica)?",
        a: "É o documento elaborado pela CNPAD que registra toda a verificação feita sobre a LED: a conferência dos campos, a análise por amostragem, os defeitos encontrados e a decisão da Comissão. Sem o RAT aprovado, a eliminação não pode prosseguir.",
        ref: "Art. 3º, inciso XII e Art. 19"
      },
      {
        q: "O que é unidade de arquivamento?",
        a: "É a caixa, pasta ou outro invólucro onde os documentos estão guardados fisicamente. É importante porque a amostragem da CNPAD é feita por unidade de arquivamento — cada caixa/pasta selecionada é aberta e conferida integralmente.",
        ref: "Art. 3º, inciso XIV"
      }
    ]
  },
  {
    cat: "Descarte de Cópias Digitalizadas",
    icon: "📄",
    desc: "Quando e como descartar o papel após digitalizar",
    items: [
      {
        q: "Posso descartar cópia simples depois de digitalizar?",
        a: "SIM, desde que:\n\n1. A digitalização reproduza integralmente o documento, com legibilidade\n2. O documento tenha sido capturado no SEI com os metadados corretos\n3. NÃO seja documento original\n4. NÃO haja dúvida sobre autenticidade ou integridade\n5. NÃO exista ordem de preservação\n\nEsse descarte NÃO precisa de LED, ECED, TED nem autorização do Arquivo Nacional.",
        ref: "Art. 12 e Art. 13"
      },
      {
        q: "Posso descartar documento ORIGINAL depois de digitalizar?",
        a: "NÃO. Documento original (com assinatura autógrafa, por exemplo) NÃO pode ser descartado, mesmo após digitalização. Também não podem ser descartados: cópias autenticadas por tabelião (cartório) e documentos cuja manutenção em papel seja exigida por lei.",
        ref: "Art. 13, inciso III"
      },
      {
        q: "Preciso de LED para descartar cópias digitalizadas?",
        a: "NÃO. O descarte de cópias digitalizadas é um procedimento mais simples e independe de LED, ECED, TED ou autorização do Arquivo Nacional. Não se confunde com eliminação de documento de arquivo.",
        ref: "Art. 4º, inciso I e Art. 16"
      },
      {
        q: "Como fazer o descarte físico do papel?",
        a: "Por fragmentação (manual ou mecânica), pulverização ou outro método que torne impossível recuperar o conteúdo. O material já fragmentado pode ser destinado à reciclagem, inclusive para cooperativas de catadores. Documentos com dados pessoais ou informação sigilosa exigem cuidados extras de segurança.",
        ref: "Art. 14"
      },
      {
        q: "O que fazer quando alguém apresenta um documento original no balcão?",
        a: "REGRA: o documento original DEVE ser devolvido ao interessado. O órgão não tem base legal para reter indefinidamente documentos pessoais do cidadão (identidade, CPF, certidões, diplomas etc.). A digitalização existe justamente para permitir essa devolução.\n\nExistem 3 formas de proceder:\n\n1. Digitalizar na hora e devolver imediatamente o original ao interessado (forma preferencial)\n2. Pedir que traga o original + uma cópia: conferir a cópia com o original, devolver o original e digitalizar a cópia\n3. Receber o documento para digitalização posterior — nesse caso, originais e cópias autenticadas em cartório DEVEM ser devolvidos ao interessado\n\n⚠️ ATENÇÃO: A retenção temporária de original só é admitida quando for indispensável à instrução do processo e a digitalização ainda não tiver sido possível. Nesse caso, a decisão de reter e a localização do original DEVEM ser registradas no processo. Trata-se de exceção, não de regra.",
        ref: "Art. 12, § 1º e Art. 14, § 2º"
      },
      {
        q: "E se houver dúvida sobre a qualidade da digitalização?",
        a: "Suspenda imediatamente o descarte do papel. Registre a ocorrência no processo, faça nova conferência e, se necessário, nova digitalização. Se a dúvida persistir, encaminhe o caso à DIGEDE.",
        ref: "Art. 15"
      }
    ]
  },
  {
    cat: "Eliminação — Procedimento",
    icon: "📋",
    desc: "O passo a passo para eliminar documentos de arquivo",
    items: [
      {
        q: "Quais as etapas para eliminar documentos de arquivo?",
        a: "São 21 etapas, resumidas assim:\n\n1. Abrir processo no SEI\n2. SCPAD faz diagnóstico, triagem, classificação e avaliação\n3. SCPAD aplica tabela de temporalidade e verifica vedações\n4. SCPAD elabora minuta da LED\n5. SCPAD elabora inventário dos documentos\n6. SCPAD envia minuta à CNPAD (análise prévia)\n7. CNPAD analisa e devolve com diligências ou aprova\n8. SCPAD ajusta e Presidente da SCPAD assina\n9. Superintendente dá ciência e assina\n10. DIGEDE confere instrução processual\n11. CNPAD faz análise por amostragem\n12. CNPAD emite RAT e aprova em reunião\n13. Diretor-Geral aprova a LED\n14. Envio ao Arquivo Nacional pelo SOT\n15. Arquivo Nacional autoriza\n16. Publicação do ECED no DOU\n17. Aguardar 45 dias do edital\n18. Eliminação física supervisionada\n19. Elaboração e publicação do TED\n20. Envio do TED ao Arquivo Nacional\n21. Juntada da documentação ao processo",
        ref: "Art. 18"
      },
      {
        q: "Quem assina a LED e em que ordem?",
        a: "A LED é assinada por 4 autoridades, nesta ordem obrigatória:\n\n1º — Presidente da SCPAD (atesta a regularidade técnica)\n2º — Superintendente Regional (atesta a guarda do acervo e inexistência de ordem de preservação)\n3º — Presidente da CNPAD (atesta a aprovação pela Comissão)\n4º — Diretor-Geral (aprova como autoridade máxima)\n\nIMPORTANTE: A assinatura do Superintendente NÃO é aprovação — é apenas ciência e responsabilidade pela guarda.",
        ref: "Art. 26"
      },
      {
        q: "Preciso de autorização do Arquivo Nacional?",
        a: "SIM, como regra. A autorização do Arquivo Nacional é obrigatória para eliminar documentos de arquivo. A única exceção é se houver delegação formal de competência do Arquivo Nacional ao Diretor-Geral da PRF, que não pode ser subdelegada.",
        ref: "Art. 4º, § 1º e Art. 18, inciso XIV"
      },
      {
        q: "Qual o prazo do edital (ECED)?",
        a: "45 dias corridos, contados da data de publicação no Diário Oficial da União. Durante esse prazo, qualquer pessoa pode pedir cópias ou o desentranhamento de documentos. A eliminação SÓ pode acontecer depois de passado esse prazo.",
        ref: "Art. 29"
      },
      {
        q: "Como deve ser feita a eliminação física?",
        a: "Por fragmentação (manual ou mecânica), pulverização ou outro método que garanta a descaracterização irreversível. É PROIBIDO doar, vender, reciclar ou jogar fora o documento ANTES de fragmentar. Após fragmentado, o material pode ir para reciclagem. A eliminação deve ser supervisionada pelo Presidente da SCPAD ou agente designado por ele.",
        ref: "Art. 30"
      },
      {
        q: "O que o Superintendente precisa verificar antes de assinar?",
        a: "No prazo de 15 dias, o Superintendente deve verificar e declarar no despacho:\n\n1. Que a Superintendência é responsável pela guarda, organização e controle do acervo listado na LED\n2. Que NÃO existe ordem de preservação conhecida (deve consultar as unidades detentoras)\n\nEssa assinatura NÃO é aprovação da LED — é atestação de responsabilidade.",
        ref: "Art. 18, § 4º"
      },
      {
        q: "O que é a análise técnica prévia da CNPAD?",
        a: "É uma primeira verificação que a CNPAD faz na minuta da LED ANTES da amostragem. Ela confere: preenchimento dos campos, compatibilidade dos códigos e prazos com as tabelas, vedações do Art. 32 e presença do inventário. Deve ser concluída em 15 dias. NÃO é a aprovação final — é uma triagem para evitar que LEDs com erros básicos avancem.",
        ref: "Art. 18, § 2º"
      },
      {
        q: "De quanto em quanto tempo a SCPAD deve elaborar uma LED?",
        a: "No máximo a cada 2 anos. Se não houver documentos em condição de eliminação, isso deve ser formalmente justificado e comunicado à DIGEDE.",
        ref: "Art. 28"
      }
    ]
  },
  {
    cat: "O Que NÃO Pode Ser Eliminado",
    icon: "🚫",
    desc: "Vedações e documentos protegidos",
    items: [
      {
        q: "Quais documentos NÃO podem ser eliminados?",
        a: "É PROIBIDO eliminar:\n\n• Documento de guarda permanente ou valor histórico\n• Documento que não cumpriu o prazo de guarda\n• Documento não classificado ou não avaliado\n• Documento de processo judicial, administrativo, disciplinar ou policial em curso\n• Documento sob auditoria, investigação ou pedido de acesso à informação\n• Documento com ordem de preservação\n• Documento cuja preservação foi determinada por juiz, lei ou órgão de controle\n• Documento único sem cópia em outro suporte confiável\n• Documento sem RAT, aprovação da CNPAD e do Diretor-Geral\n• Documento sem autorização do Arquivo Nacional (quando exigida)\n• Documento com classificação de sigilo vigente",
        ref: "Art. 32"
      },
      {
        q: "Posso eliminar documentos de um processo judicial já ENCERRADO?",
        a: "Depende. O Art. 32 veda a eliminação de documentos de processos judiciais EM CURSO. Se o processo já foi encerrado (transitou em julgado), E o prazo de guarda na tabela de temporalidade já foi cumprido, E não há outra vedação, em tese poderia ser incluído na LED. Na dúvida, consulte a DIGEDE ou a CNPAD.",
        ref: "Art. 32, inciso IV e Art. 5º"
      },
      {
        q: "Posso eliminar documento com informação sigilosa?",
        a: "NÃO enquanto a classificação de sigilo estiver vigente. Somente após a desclassificação ou o decurso do prazo de restrição de acesso. Além disso, pode ser necessária manifestação da CPADS (Comissão de Avaliação de Documentos Sigilosos) sobre o sigilo, sem prejuízo da avaliação arquivística pela CNPAD.",
        ref: "Art. 32, inciso X e § 2º"
      },
      {
        q: "Digitalizar um documento autoriza sua eliminação?",
        a: "NÃO. A digitalização, por si só, NÃO autoriza a eliminação do documento físico. A eliminação segue procedimento próprio (LED, aprovação, autorização do Arquivo Nacional, edital). Não confunda descarte de cópia digitalizada (mais simples) com eliminação de documento de arquivo (mais complexo).",
        ref: "Art. 4º, § 2º"
      },
      {
        q: "Posso eliminar documentos de contas julgadas irregulares pelo TCU?",
        a: "NÃO. É expressamente vedada a eliminação de documentos relativos a exercícios cujas contas tenham sido julgadas irregulares pelo Tribunal de Contas da União.",
        ref: "Art. 31, parágrafo único"
      },
      {
        q: "O que fazer em caso de dúvida sobre se posso eliminar?",
        a: "SUSPENDA o procedimento e consulte a DIGEDE ou a CNPAD, conforme a matéria. Na dúvida, NÃO elimine. A IN é clara: havendo dúvida quanto à natureza, autenticidade, valor, classificação ou destinação, o descarte e a eliminação são suspensos.",
        ref: "Art. 5º"
      }
    ]
  },
  {
    cat: "Quem Faz o Quê",
    icon: "👥",
    desc: "Competências da SCPAD, CNPAD e DIGEDE",
    items: [
      {
        q: "O que é a SCPAD e qual seu papel?",
        a: "A Subcomissão Permanente de Avaliação de Documentos (SCPAD) é a instância LOCAL — existe uma em cada Superintendência, uma na Sede e uma na UniPRF. Ela é quem faz o trabalho de campo: identifica, classifica, avalia os documentos, elabora a minuta da LED e o inventário, e supervisiona a eliminação física.",
        ref: "Art. 7º"
      },
      {
        q: "O que é a CNPAD e qual seu papel?",
        a: "A Comissão Nacional Permanente de Avaliação de Documentos (CNPAD) é a instância NACIONAL. Ela orienta, faz a análise técnica prévia e por amostragem da LED, emite o RAT, aprova a LED em reunião colegiada, encaminha ao Arquivo Nacional e cuida das publicações do ECED e TED.",
        ref: "Art. 6º"
      },
      {
        q: "Qual o papel da DIGEDE?",
        a: "A DIGEDE orienta tecnicamente, confere a instrução processual, articula com o Arquivo Nacional, apoia a CNPAD e as SCPADs, elabora modelos e formulários, promove capacitação e monitora os procedimentos de eliminação. É para a DIGEDE que as dúvidas devem ser encaminhadas.",
        ref: "Art. 8º"
      },
      {
        q: "Quem designa os membros da SCPAD?",
        a: "Por portaria:\n\n• Nas Superintendências: o Superintendente Regional\n• Na Sede: o Diretor-Geral\n• Na UniPRF: o Diretor da UniPRF\n\nA portaria deve indicar o Presidente e o Presidente Substituto, preferencialmente entre servidores de gestão documental, protocolo ou arquivo.",
        ref: "Art. 7º, §§ 4º e 5º"
      },
      {
        q: "A SRPAD mudou de nome?",
        a: "SIM. A antiga Subcomissão Regional Permanente de Avaliação de Documentos (SRPAD) agora se chama Subcomissão Permanente de Avaliação de Documentos (SCPAD). As portarias de designação devem ser adequadas no prazo de 60 dias da publicação da IN.",
        ref: "Art. 39 e Art. 7º, § 7º"
      },
      {
        q: "Quem são os membros obrigatórios da CNPAD?",
        a: "No mínimo:\n\n1. Um responsável pelos serviços arquivísticos (será o Presidente)\n2. Servidores das unidades cujos documentos serão avaliados\n3. Um servidor de gestão documental (preferencialmente arquivista)\n4. Uma pessoa com formação em História\n5. Um representante da AGU\n\nCada membro tem um suplente.",
        ref: "Art. 6º, § 1º"
      }
    ]
  },
  {
    cat: "Amostragem e Análise Técnica",
    icon: "🔍",
    desc: "Como funciona a verificação por amostragem",
    items: [
      {
        q: "Como funciona a análise por amostragem?",
        a: "A CNPAD seleciona aleatoriamente uma quantidade de caixas/pastas (unidades de arquivamento) da LED e confere o conteúdo de cada uma, documento por documento. O objetivo é verificar se a classificação, as datas e as informações da LED correspondem ao que realmente existe nas caixas.",
        ref: "Art. 20 a 24 e Anexo I"
      },
      {
        q: "Quantas caixas/pastas precisam ser verificadas?",
        a: "Depende do total na LED:\n\n• Até 100: TODAS\n• 101 a 200: 132\n• 201 a 300: 169\n• 301 a 500: 218\n• 501 a 750: 255\n• 751 a 1.000: 278\n• 1.001 a 1.500: 306\n• 1.501 a 2.000: 323\n• 2.001 a 3.000: 341\n• 3.001 a 5.000: 357\n• 5.001 a 10.000: 370\n• Acima de 10.000: 385",
        ref: "Anexo II"
      },
      {
        q: "O que é defeito crítico?",
        a: "É um erro grave que impede a eliminação. Existem dois níveis:\n\nNível DOCUMENTAL (erro na LED):\n• Código de classificação com destinação de guarda permanente\n• Prazo de guarda não cumprido\n• Código inexistente na tabela\n• Documento alcançado por vedação do Art. 32\n\nNível FÍSICO (erro no acervo):\n• Código real diferente do declarado\n• Documento vinculado a processo em curso\n• Caixa listada na LED mas não localizada\n• Data posterior às datas-limite declaradas\n\nUM ÚNICO defeito crítico = devolução integral da LED.",
        ref: "Anexo III e Art. 25, inciso I"
      },
      {
        q: "O que acontece se encontrarem defeito crítico?",
        a: "A LED INTEIRA é devolvida à SCPAD para reavaliação de TODO o conjunto documental. NÃO é permitido corrigir apenas a caixa/pasta onde o defeito foi encontrado. A lógica é que um defeito crítico na amostra indica falha no procedimento como um todo.",
        ref: "Art. 25, inciso I e Anexo I, item 4.1"
      },
      {
        q: "E se os defeitos forem apenas não críticos?",
        a: "Depende da proporção:\n\n• Até 3% das unidades analisadas com defeito não crítico: devolução para retificação pontual e reapresentação, SEM necessidade de nova amostragem\n\n• Acima de 3%: devolução integral para reavaliação de todo o conjunto, como se fosse defeito crítico",
        ref: "Art. 25, incisos II e III"
      },
      {
        q: "A amostragem pode ser feita à distância?",
        a: "Depende do tipo de acervo. Deve ser PRESENCIAL quando:\n• For massa documental acumulada\n• Acervo sem tratamento técnico prévio\n• Volume acima do definido em orientação técnica\n• Unidade com histórico de inconsistências\n\nNos demais casos, pode ser DOCUMENTAL (análise do inventário), mas a CNPAD pode converter em presencial por decisão fundamentada.",
        ref: "Art. 21"
      }
    ]
  },
  {
    cat: "Inventário e Tabelas",
    icon: "📊",
    desc: "Inventário, tabelas de temporalidade e classificação",
    items: [
      {
        q: "Quais tabelas de temporalidade devo usar?",
        a: "Duas tabelas, conforme o tipo de atividade:\n\n• ATIVIDADES-MEIO (administrativas): Portaria AN/MGI nº 174/2024\n• ATIVIDADES-FIM (policiamento rodoviário): Portaria AN nº 103/2018\n\nOs documentos DEVEM estar classificados de acordo com a tabela aplicável ANTES de serem incluídos na LED.",
        ref: "Art. 10"
      },
      {
        q: "O que deve conter o inventário?",
        a: "No mínimo: identificação das unidades de arquivamento, código de classificação, descritor, datas-limite, localização física, e a relação individual dos processos/documentos com a respectiva unidade de arquivamento. A digitalização dos documentos NÃO é exigida.",
        ref: "Art. 3º, inciso XIII e Art. 27"
      },
      {
        q: "Posso simplificar o inventário para massa documental acumulada?",
        a: "SIM, mediante justificativa da SCPAD registrada no processo. O inventário pode se limitar ao conteúdo mínimo (sem a relação individual de cada documento). A justificativa deve indicar o volume, o estado do tratamento técnico e o prazo estimado para completar a relação individual.",
        ref: "Art. 27, §§ 1º e 2º"
      },
      {
        q: "E documentos que não estão previstos em nenhuma tabela?",
        a: "NÃO podem ser eliminados sem prévia manifestação da CNPAD e autorização específica do Arquivo Nacional. A CNPAD pode elaborar plano de destinação ou justificativa de eliminação e submeter ao Arquivo Nacional.",
        ref: "Art. 10, § 2º e Art. 6º, inciso XI"
      }
    ]
  },
  {
    cat: "Prazos e Transição",
    icon: "⏰",
    desc: "Prazos, regras de transição e disposições finais",
    items: [
      {
        q: "Quando esta IN entra em vigor?",
        a: "60 dias após a data de sua publicação no Diário Oficial da União.",
        ref: "Art. 41"
      },
      {
        q: "E os processos de eliminação que já estavam em andamento?",
        a: "Depende do estágio:\n\n• Se o ECED já foi publicado antes do Decreto 12.939/2026: podem ser concluídos pelo regime antigo\n• Se o ECED NÃO foi publicado: devem se adequar à nova IN, aproveitando os atos válidos já praticados (classificação, avaliação, diagnóstico, triagem)",
        ref: "Art. 36"
      },
      {
        q: "Em quanto tempo as portarias da SCPAD devem ser adequadas?",
        a: "60 dias contados da publicação da IN. As portarias devem ser atualizadas com a nova denominação (SCPAD, não mais SRPAD) e a indicação do Presidente e Presidente Substituto.",
        ref: "Art. 7º, § 7º"
      },
      {
        q: "A IN revoga toda a Portaria 360/2017?",
        a: "NÃO. Revoga apenas partes específicas: Art. 6º, incisos V a VIII do Art. 7º, Art. 8º, incisos IV a VII do Art. 9º, e Art. 10. Os demais dispositivos da Portaria 360 continuam em vigor no que não contrariem esta IN.",
        ref: "Art. 40"
      },
      {
        q: "E se devo digitalizar antes de eliminar?",
        a: "A digitalização deve ser PRECEDIDA da avaliação e triagem. Ou seja: primeiro avalie se o documento deve ser mantido, eliminado ou preservado. Só depois digitalize o que for necessário. Isso evita gastar recursos digitalizando documentos que serão eliminados.",
        ref: "Art. 34"
      }
    ]
  }
];
