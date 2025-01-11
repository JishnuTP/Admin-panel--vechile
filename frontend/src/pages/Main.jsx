import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Headder';
import FilterPanel from '../components/Filterpanel';
import Cards from '../components/Cards';
import Table from '../components/Table';
import Chart from '../components/Chart';
import Chart2 from '../components/chart2';

// Import your actions here

const Main = () => {
    const { data, loading, error } = useSelector((state) => state.data);
console.log(data.allData,"hh");

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  return (
    <div className="bg-gray-100 min-h-fit">
      <Header />
      <div className="p-4">
        <FilterPanel />
      </div>
      <div className="p-4">
        <Cards data={data.msrp}/>
      </div>
      <div className="p-4 ">
        <Chart title="Inventory Count" data={data.monthdata} />
        <Chart2 title="Average MSRP in USD" data={data.monthmsrp} />
      </div>
      <div className="p-4">
        <Table/>
      </div>
    </div>
  );
};

export default Main;
