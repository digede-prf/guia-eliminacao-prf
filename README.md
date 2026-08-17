# Guia da IN — Eliminação de Documentos de Arquivo

Aplicativo web da **Polícia Rodoviária Federal** para orientar servidores de protocolo e gestão documental sobre os procedimentos de avaliação, destinação e eliminação de documentos de arquivo, conforme a nova Instrução Normativa.

Desenvolvido pela **DIGEDE** (Divisão de Gestão Documental Eletrônica) — CGLOG/DIAD.

---

## Funcionalidades

| Seção | Descrição |
|-------|-----------|
| **Perguntas Frequentes** | 44+ perguntas organizadas em 8 categorias, com busca por palavras-chave |
| **Posso Eliminar Este Documento?** | Árvore de decisão interativa com SIM/NÃO |
| **Calculadora de Amostragem** | Cálculo automático baseado nos Anexos I e II da IN |
| **Passo a Passo da Eliminação** | As 21 etapas do procedimento completo |
| **Checklist da LED** | 24 itens verificáveis com barra de progresso (salva automaticamente) |
| **Tabela de Prazos** | Prazos consolidados da IN por categoria |
| **Glossário de Siglas** | 20 siglas com busca |
| **Painel de Uso** | Estatísticas locais exportáveis como CSV |

## Características

- **PWA** — Funciona offline e pode ser "instalado" no celular como app
- **Acessível** — Fontes grandes, contraste WCAG AA, botões de 48px, controle de tamanho de fonte
- **Mobile-first** — Projetado para uso no celular
- **Sem backend** — Tudo roda no navegador, sem necessidade de servidor
- **Dados locais** — Checklist e estatísticas salvos no navegador

---

## Como rodar localmente

### Pré-requisitos
- [Node.js](https://nodejs.org) versão 18 ou superior
- npm (vem com o Node.js)

### Instalação

```bash
git clone https://github.com/SEU-USUARIO/guia-eliminacao-prf.git
cd guia-eliminacao-prf
npm install
npm run dev
```

O app abre em `http://localhost:5173`.

---

## Deploy no GitHub Pages (gratuito)

### Primeira vez

1. Crie um repositório no GitHub chamado `guia-eliminacao-prf`
2. No arquivo `package.json`, troque `SEU-USUARIO` pelo seu username do GitHub
3. No arquivo `vite.config.js`, confirme que `base` está correto: `/guia-eliminacao-prf/`

```bash
git init
git remote add origin https://github.com/SEU-USUARIO/guia-eliminacao-prf.git
git add .
git commit -m "versão inicial"
git push -u origin main
npm run deploy
```

### Atualizações posteriores

```bash
git add .
git commit -m "descrição da mudança"
git push
npm run deploy
```

O app ficará disponível em: `https://SEU-USUARIO.github.io/guia-eliminacao-prf/`

---

## Como atualizar o conteúdo

Todos os textos ficam em arquivos separados na pasta `src/data/`. Para alterar o conteúdo, **edite apenas os arquivos de dados** — não é necessário mexer no código dos componentes.

| Arquivo | O que contém |
|---------|-------------|
| `src/data/faq.js` | Perguntas e respostas organizadas por categoria |
| `src/data/decision-tree.js` | Árvore de decisão (perguntas e resultados) |
| `src/data/sample-table.js` | Tabela de amostragem (Anexo II) e fórmula de cálculo |
| `src/data/steps.js` | As 21 etapas do procedimento |
| `src/data/checklist.js` | Itens do checklist da LED |
| `src/data/deadlines.js` | Tabela de prazos |
| `src/data/glossary.js` | Glossário de siglas |
| `src/data/regionais.js` | Lista de Superintendências |

### Exemplo: adicionar uma pergunta à FAQ

Abra `src/data/faq.js`, encontre a categoria desejada e adicione um objeto ao array `items`:

```js
{
  q: "Minha nova pergunta aqui?",
  a: "A resposta detalhada aqui.",
  ref: "Art. XX"
}
```

Salve, faça `npm run build` e `npm run deploy`.

---

## Estrutura de pastas

```
guia-eliminacao-prf/
├── public/icons/             # Ícones da PWA
├── src/
│   ├── components/           # Componentes React (interface)
│   ├── data/                 # ⬅ EDITE AQUI para atualizar conteúdo
│   ├── utils/                # Utilitários (analytics, storage)
│   ├── App.jsx               # Componente principal
│   ├── index.css             # Estilos globais + Tailwind
│   └── main.jsx              # Ponto de entrada
├── vite.config.js            # Configuração do Vite + PWA
└── package.json
```

---

## Painel de Uso (Admin)

Acessível de duas formas:
- Link discreto "painel de uso" no rodapé da tela inicial
- Atalho de teclado: `Ctrl + Shift + A`

O painel mostra estatísticas de uso **locais** (deste dispositivo):
- Total de eventos registrados
- Consultas por regional
- Seções mais acessadas
- Perguntas mais consultadas
- Buscas realizadas

Os dados podem ser exportados como CSV para envio à DIGEDE.

> **Importante**: cada dispositivo guarda apenas seus próprios dados. Para consolidar os dados de todas as regionais, solicite que cada unidade exporte o CSV e envie à DIGEDE.

---

## Tecnologias

- React · Vite · Tailwind CSS v4 · vite-plugin-pwa · gh-pages

---

## Referência normativa

Instrução Normativa PRF — Processo 08650.229294/2026-54
Avaliação, destinação e eliminação de documentos de arquivo

*DIGEDE/CGLOG/DIAD — Polícia Rodoviária Federal*
