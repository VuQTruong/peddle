export const formatCurrency = (n: number) => {
  return (
    '$' +
    n
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  );
};
