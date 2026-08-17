/**
 * Registro de uso local — salva no localStorage do navegador.
 * Cada regional terá seus próprios dados.
 * Exportável como CSV pelo painel administrativo.
 */

const STORAGE_KEY = "guia-in-prf-analytics";

function getAnalytics() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { events: [], regional: "" };
  } catch {
    return { events: [], regional: "" };
  }
}

function saveAnalytics(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* localStorage cheio ou indisponível */ }
}

/** Define a regional do usuário */
export function setRegional(regional) {
  const data = getAnalytics();
  data.regional = regional;
  saveAnalytics(data);
}

/** Retorna a regional salva */
export function getRegional() {
  return getAnalytics().regional || "";
}

/** Registra um evento de uso */
export function trackEvent(type, detail = "") {
  const data = getAnalytics();
  data.events.push({
    type,
    detail,
    regional: data.regional,
    timestamp: new Date().toISOString()
  });
  // Limita a 5000 eventos para não estourar localStorage
  if (data.events.length > 5000) {
    data.events = data.events.slice(-5000);
  }
  saveAnalytics(data);
}

/** Retorna todos os eventos registrados */
export function getAllEvents() {
  return getAnalytics().events;
}

/** Limpa todos os dados de analytics */
export function clearAnalytics() {
  const data = getAnalytics();
  data.events = [];
  saveAnalytics(data);
}

/** Exporta os eventos como CSV */
export function exportCSV() {
  const events = getAllEvents();
  if (events.length === 0) return "";
  
  const header = "Data/Hora,Regional,Tipo,Detalhe";
  const rows = events.map(e => {
    const date = new Date(e.timestamp).toLocaleString("pt-BR");
    const detail = (e.detail || "").replace(/"/g, '""');
    return `"${date}","${e.regional || ""}","${e.type}","${detail}"`;
  });
  return header + "\n" + rows.join("\n");
}

/** Gera resumo estatístico para o painel admin */
export function getStats() {
  const events = getAllEvents();
  
  // Consultas por regional
  const byRegional = {};
  events.forEach(e => {
    const r = e.regional || "(não informada)";
    byRegional[r] = (byRegional[r] || 0) + 1;
  });

  // Seções mais acessadas
  const bySections = {};
  events.filter(e => e.type === "section_view").forEach(e => {
    bySections[e.detail] = (bySections[e.detail] || 0) + 1;
  });

  // Perguntas mais consultadas
  const byQuestions = {};
  events.filter(e => e.type === "faq_view").forEach(e => {
    byQuestions[e.detail] = (byQuestions[e.detail] || 0) + 1;
  });

  // Buscas realizadas
  const bySearches = {};
  events.filter(e => e.type === "search").forEach(e => {
    bySearches[e.detail] = (bySearches[e.detail] || 0) + 1;
  });

  const sortObj = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1]);

  return {
    totalEvents: events.length,
    byRegional: sortObj(byRegional),
    bySections: sortObj(bySections),
    byQuestions: sortObj(byQuestions),
    bySearches: sortObj(bySearches),
    firstEvent: events[0]?.timestamp || null,
    lastEvent: events[events.length - 1]?.timestamp || null,
  };
}
