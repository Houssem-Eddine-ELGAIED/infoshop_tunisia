// Convert the number to a formatted string
// Convert the number to a formatted string in Tunisian Dinars (DT) with French locale
export const addCurrency = num => {
  return `${num?.toLocaleString('fr-TN', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })} DT`;
};
