const calculateMSRP = (data) => {
    // Filter vehicles by condition (used, cpo, new)
    const usedVehicles = data.filter(item => item.condition === 'used');
    const cpoVehicles = data.filter(item => item.condition === 'cpo'); // If CPO data exists
    const newVehicles = data.filter(item => item.condition === 'new'); // If new data exists
  
    // Calculate the count, total MSRP, and average MSRP for each condition
    const calculateMSRPData = (vehicles) => {
      const totalMSRP = vehicles.reduce((sum, vehicle) => sum + vehicle.price, 0);
      const averageMSRP = vehicles.length > 0 ? totalMSRP / vehicles.length : 0;
      return {
        totalMSRP,
        averageMSRP,
      };
    };
  
    // Calculate for used vehicles
    const usedCount = usedVehicles.length;
    const { totalMSRP: usedTotalMSRP, averageMSRP: usedAverageMSRP } = calculateMSRPData(usedVehicles);
  
    // Calculate for CPO vehicles
    const cpoCount = cpoVehicles.length;
    const { totalMSRP: cpoTotalMSRP, averageMSRP: cpoAverageMSRP } = calculateMSRPData(cpoVehicles);
  
    // Calculate for new vehicles
    const newCount = newVehicles.length;
    const { totalMSRP: newTotalMSRP, averageMSRP: newAverageMSRP } = calculateMSRPData(newVehicles);
  
    return {
      used: {
        count: usedCount,
        totalMSRP: usedTotalMSRP,
        averageMSRP: usedAverageMSRP.toFixed(2),
      },
      cpo: {
        count: cpoCount,
        totalMSRP: cpoTotalMSRP,
        averageMSRP: cpoAverageMSRP.toFixed(2),
      },
      new: {
        count: newCount,
        totalMSRP: newTotalMSRP,
        averageMSRP: newAverageMSRP.toFixed(2),
      }
    };
  };
  
  module.exports = { calculateMSRP };
  