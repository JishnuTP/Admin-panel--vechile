import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../components/util/chartSetup'; // Assuming chart setup is done here

const Chart2 = ({ title, data }) => {
  // Demo data structure as a fallback
  const demoData = {
    '2024-01': { new: 4884, used: 0, cpo: 848 },
    '2024-02': { new: 4747, used: 0, cpo: 34 },
    '2024-03': { new: 3000, used: 2000, cpo: 100 },
    '2024-04': { new: 4000, used: 1500, cpo: 250 },
  };

  // Use provided data if available, otherwise fall back to demo data
  const chartData = data && data.monthmsrp ? data.monthmsrp : demoData;

  // Process the data to extract labels and dataset values
  const labels = Object.keys(chartData); // Extract the month-year keys as labels
  const newData = labels.map((label) => chartData[label].new || 0); // Extract new data for each month
  const usedData = labels.map((label) => chartData[label].used || 0); // Extract used data for each month
  const cpoData = labels.map((label) => chartData[label].cpo || 0); // Extract CPO data for each month

  // Chart data structure
  const chartDataset = {
    labels: labels, // Labels are the months (e.g., '2024-01', '2024-02', etc.)
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
    plugins: {
      legend: {
        display: true, // Display legend for multiple datasets
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start the Y-axis from zero
        title: {
          display: true,
          text: 'Units', // Y-axis label
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month-Year', // X-axis label
        },
      },
    },
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

export default Chart2;
