// Utility function to convert duration into start and end dates
const getDateRange = (timeStamp) => {
    const today = new Date();
    let startDate = new Date();
    let endDate = today;
  
    switch (timeStamp) {
      case 'Last Month':
        startDate.setMonth(today.getMonth() - 1);
        startDate.setDate(1); // Set the start date to the 1st of last month
        break;
      case 'This Month':
        startDate.setDate(1); // Set the start date to the 1st of this month
        break;
      case 'Last 3 Months':
        startDate.setMonth(today.getMonth() - 3);
        break;
      case 'Last 6 Months':
        startDate.setMonth(today.getMonth() - 6);
        break;
      case 'This Year':
        startDate.setMonth(0); // Set the start date to the 1st of January this year
        startDate.setDate(1);
        break;
      case 'Last Year':
        startDate.setFullYear(today.getFullYear() - 1);
        startDate.setMonth(0); // Set the start date to the 1st of January last year
        startDate.setDate(1);
        break;
      default:
        return { startDate: null, endDate: null };
    }
  
    return { startDate, endDate };
  };
  
  module.exports = { getDateRange };
  