import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../redux/slice/filterslice';
import { fetchFilteredData } from '../redux/slice/dataSlice';

const FilterPanel = () => {
  const dispatch = useDispatch();
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedVehicleMake, setSelectedVehicleMake] = useState('');

  const durations = [
    'Last Month',
    'This Month',
    'Last 3 Months',
    'Last 6 Months',
    'This Year',
    'Last Year',
  ];

  const vehicleMakes = ['Cadillac','Chevrolet','Buick','GMC','Toyota','Ram'];

  const handleFilterApply = () => {
    const filters = {
      timeStamp: selectedDuration,
      brand: selectedVehicleMake,
    };

    console.log("component",filters);
    
    dispatch(setFilters(filters));
    dispatch(fetchFilteredData(filters));
  };

  return (
    <div className="flex justify-end items-center p-4 bg-white shadow">
      <select
        className="border rounded p-2 mr-2"
        value={selectedVehicleMake}
        onChange={(e) => setSelectedVehicleMake(e.target.value)}
      >
        <option value="">Select Vehicle Make</option>
        {vehicleMakes.map((make) => (
          <option key={make} value={make}>
            {make}
          </option>
        ))}
      </select>

      <select
        className="border rounded p-2 mr-2"
        value={selectedDuration}
        onChange={(e) => setSelectedDuration(e.target.value)}
      >
        <option value="">Select Duration</option>
        {durations.map((duration) => (
          <option key={duration} value={duration}>
            {duration}
          </option>
        ))}
      </select>

      <button
        className="bg-orange-500 text-white px-4 py-2 rounded"
        onClick={handleFilterApply}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterPanel;
