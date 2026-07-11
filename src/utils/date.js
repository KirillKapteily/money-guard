export function formatTransactionDate(dateString) {
  if (!dateString) return "";

  const normalized = normalizeDateString(dateString);
  const date = new Date(normalized);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function normalizeDateString(dateString) {
  if (dateString.includes(".")) {
    const match = dateString.match(/^(\d{2})\.(\d{2})\.(\d{2,4})$/);
    if (match) {
      const [, day, month, year] = match;
      const fullYear = year.length === 2 ? `20${year}` : year;
      return `${fullYear}-${month}-${day}`;
    }
  }

  return dateString;
}
