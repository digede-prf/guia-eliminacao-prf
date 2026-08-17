/**
 * Tabela de amostragem — Anexo II da IN.
 * [limite superior, tamanho da amostra, percentual]
 * Infinity = acima de 10.000
 */
export const SAMPLE_TABLE = [
  [100, "Todas", "100%"],
  [200, 132, "66,0%"],
  [300, 169, "56,3%"],
  [500, 218, "43,6%"],
  [750, 255, "34,0%"],
  [1000, 278, "27,8%"],
  [1500, 306, "20,4%"],
  [2000, 323, "16,1%"],
  [3000, 341, "11,4%"],
  [5000, 357, "7,1%"],
  [10000, 370, "3,7%"],
  [Infinity, 385, "<3,7%"]
];

/** Rótulos para exibição na tabela visual */
export const SAMPLE_TABLE_DISPLAY = [
  ["Até 100", "Todas", "100%"],
  ["101–200", "132", "66,0%"],
  ["201–300", "169", "56,3%"],
  ["301–500", "218", "43,6%"],
  ["501–750", "255", "34,0%"],
  ["751–1.000", "278", "27,8%"],
  ["1.001–1.500", "306", "20,4%"],
  ["1.501–2.000", "323", "16,1%"],
  ["2.001–3.000", "341", "11,4%"],
  ["3.001–5.000", "357", "7,1%"],
  ["5.001–10.000", "370", "3,7%"],
  ["> 10.000", "385", "<3,7%"]
];

/**
 * Calcula o tamanho da amostra para um dado total de unidades.
 * Retorna { size, pct, integral, tabelaPrev? }
 */
export function getSampleSize(n) {
  if (n <= 0) return { size: 0, pct: "0%", integral: false };
  if (n <= 100) return { size: n, pct: "100%", integral: true };
  for (const [limit, size, pct] of SAMPLE_TABLE) {
    if (n <= limit) {
      if (size >= n) return { size: n, pct: "100%", integral: true, tabelaPrev: size };
      return { size, pct, integral: false };
    }
  }
  return { size: 385, pct: "<3,7%", integral: false };
}

/**
 * Retorna o índice da faixa destacada na tabela visual.
 * Usado para highlight da linha correspondente.
 */
export function getHighlightIndex(n) {
  if (n <= 0) return -1;
  if (n <= 100) return 0;
  if (n <= 200) return 1;
  if (n <= 300) return 2;
  if (n <= 500) return 3;
  if (n <= 750) return 4;
  if (n <= 1000) return 5;
  if (n <= 1500) return 6;
  if (n <= 2000) return 7;
  if (n <= 3000) return 8;
  if (n <= 5000) return 9;
  if (n <= 10000) return 10;
  return 11;
}
