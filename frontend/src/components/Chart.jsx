import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../components/util/chartSetup'; // Assuming chart setup is done here

const Chart = ({ title, data }) => {
  // If no data is provided, use demo data
  const demoData = {
    '2024-08': { new: 0, used: 0, cpo: 0 },
    '2024-12': { new: 2, used: 0, cpo: 0 },
    '2024-11': { new: 0, used: 4, cpo: 0 },
    '2024-10': { new: 2, used: 0, cpo: 0 },
    '2024-07': { new: 0, used: 0, cpo: 0 },
    '2024-09': { new: 0, used: 0, cpo: 6 },
  };
console.log(data,"ghjk");

  // Use provided data if available, otherwise fall back to demo data
  const chartData = (data && data.monthlyData) ? data.monthlyData : demoData;


  // Process the data to extract labels and dataset values
  const labels = Object.keys(chartData); // Extract the month-year keys as labels
  const newData = labels.map((label) => chartData[label].new); // Extract new data for each month
  const usedData = labels.map((label) => chartData[label].used); // Extract used data for each month
  const cpoData = labels.map((label) => chartData[label].cpo); // Extract cpo data for each month

  // Chart data structure
  const chartDataset = {
    labels: labels, // Labels are the months (e.g., '2024-08', '2024-09', etc.)
    datasets: [
      {
        label: 'New Units',
        data: newData,
        backgroundColor: '#f97316', // Orange color for New Units
      },
      {
        label: 'Used Units',
        data: usedData,
        backgroundColor: '#4b5563', // Gray color for Used Units
      },
      {
        label: 'CPO Units',
        data: cpoData,
        backgroundColor: '#10b981', // Green color for CPO Units
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-4 shadow rounded w-full"> {/* Ensure full width for container */}
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      {/* Chart container takes full width */}
      <div className="w-full h-64">
        <Bar data={chartDataset} options={options} />
      </div>
    </div>
  );
};

export default Chart;
