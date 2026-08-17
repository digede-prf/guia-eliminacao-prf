/**
 * Utilitário para persistência de dados no localStorage.
 * Usado para salvar progresso do checklist e preferências.
 */

const CHECKLIST_KEY = "guia-in-prf-checklist";
const PREFS_KEY = "guia-in-prf-prefs";

/** Salva o estado do checklist */
export function saveChecklist(checks) {
  try {
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checks));
  } catch { /* silencioso */ }
}

/** Carrega o estado do checklist */
export function loadChecklist() {
  try {
    return JSON.parse(localStorage.getItem(CHECKLIST_KEY)) || {};
  } catch {
    return {};
  }
}

/** Limpa o checklist */
export function clearChecklist() {
  try {
    localStorage.removeItem(CHECKLIST_KEY);
  } catch { /* silencioso */ }
}

/** Salva preferências do usuário (escala de fonte, contraste) */
export function savePrefs(prefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch { /* silencioso */ }
}

/** Carrega preferências do usuário */
export function loadPrefs() {
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY)) || { fontScale: 1, highContrast: false };
  } catch {
    return { fontScale: 1, highContrast: false };
  }
}
