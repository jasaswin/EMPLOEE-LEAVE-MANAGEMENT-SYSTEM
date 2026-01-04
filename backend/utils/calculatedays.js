

const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = end - start;
  return diffTime / (1000 * 60 * 60 * 24) + 1; 
};

module.exports = calculateDays;
