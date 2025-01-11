import React, { useEffect, useState } from 'react';

const Card = ({ label, value }) => (
  <div className="bg-white p-4 shadow rounded border border-gray-300">
    <p className="text-sm text-gray-500">{label}</p>
    <h3 className="text-xl font-bold">{value}</h3>
  </div>
);

const Cards = ({ data = {} }) => {
  if (!data.new || !data.used || !data.cpo) {
    return (
      <div className="bg-gray-500 text-white text-lg align-center font-semibold rounded-md py-2 px-4 w-full sm:w-1/2 md:w-1/3 hover:bg-blue-600 transition-colors duration-300 cursor-pointer">
        Choose vehicle make
      </div>
    );
  }

  const cardData = [
    { label: '# New Units', value: data.new.count },
    { label: 'New MSRP', value: data.new.totalMSRP },
    { label: 'New Avg. MSRP', value: data.new.averageMSRP },
    { label: 'Used Units', value: data.used.count },
    { label: 'Used MSRP', value: data.used.totalMSRP },
    { label: 'CPO Count', value: data.cpo.count },
    { label: 'CPO MSRP', value: data.cpo.averageMSRP },
  ];

  return (
    <div className="flex justify-between gap-4 p-4 bg-gray-50">
      {cardData.map((item, index) => (
        <Card key={index} label={item.label} value={item.value} />
      ))}
    </div>
  );
};

export default Cards;
