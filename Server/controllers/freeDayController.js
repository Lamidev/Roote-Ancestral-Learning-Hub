const isFreePeriodActive = () => {
  const currentDate = new Date();
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date('2026-01-17T00:00:00');

  return currentDate >= startDate && currentDate < endDate;
};

module.exports = {
  isFreePeriodActive
};