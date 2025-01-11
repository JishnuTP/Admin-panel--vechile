const calculateMonthlyCount = (filteredData) => {
    // Helper function to group by month and condition
    const groupByMonthAndCondition = (data) => {
      const result = {};
  
      data.forEach(item => {
        // Extract month (in format "YYYY-MM")
        const month = new Date(item.timestamp).toISOString().slice(0, 7); // Extracting the month (e.g., "2024-01")
        const condition = item.condition; // "new", "used", or "cpo"
  
        // Initialize the month object if it doesn't exist
        if (!result[month]) {
          result[month] = {
            new: 0,
            used: 0,
            cpo: 0,
          };
        }
  
        // Increment the count for the respective condition
        if (result[month][condition] !== undefined) {
          result[month][condition]++;
        }
      });
  
      return result;
    };
  
    // Group filtered data by month and condition
    const monthlyCounts = groupByMonthAndCondition(filteredData);
  
    return monthlyCounts;
  };
  module.exports={calculateMonthlyCount}