export const certMapping = {
  // "0": "NR",
  1: 'G',
  2: 'PG',
  3: 'PG-13',
  4: 'R',
  5: 'NC-17',
};

export function getCertById(id) {
  return certMapping[id];
}
