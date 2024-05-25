import React from 'react';
import LineChart from './LineChart';
import MapComponent from './Map'; 

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <LineChart />
      <MapComponent />
    </div>
  );
};

export default Dashboard;