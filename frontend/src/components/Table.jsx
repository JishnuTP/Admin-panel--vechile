import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Table = () => {
  const [data, setData] = useState([]); // State to hold the inventory data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/tabledata'); // Replace with your API URL
        setData(response.data); // Assuming the API returns an array of objects
      } catch (err) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-lg font-bold mb-4">All Inventory Data</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Date</th>
              <th className="border p-2">New Inventory Count</th>
              <th className="border p-2">New Total MSRP</th>
              <th className="border p-2">New Avg MSRP</th>
              <th className="border p-2">Used Inventory Count</th>
              <th className="border p-2">Used Total MSRP</th>
              <th className="border p-2">Used Avg MSRP</th>
              <th className="border p-2">CPO Inventory Count</th>
              <th className="border p-2">CPO Total MSRP</th>
              <th className="border p-2">CPO Avg MSRP</th>
            </tr>
          </thead>
        </table>
        <div className="overflow-y-auto max-h-96">
          <table className="w-full border-collapse">
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="border p-2">{row.date}</td>
                  <td className="border p-2">{row.new.count}</td>
                  <td className="border p-2">${row.new.totalMSRP.toLocaleString()}</td>
                  <td className="border p-2">${row.new.avgMSRP.toLocaleString()}</td>
                  <td className="border p-2">{row.used.count}</td>
                  <td className="border p-2">${row.used.totalMSRP.toLocaleString()}</td>
                  <td className="border p-2">${row.used.avgMSRP.toLocaleString()}</td>
                  <td className="border p-2">{row.cpo.count}</td>
                  <td className="border p-2">${row.cpo.totalMSRP.toLocaleString()}</td>
                  <td className="border p-2">${row.cpo.avgMSRP.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
