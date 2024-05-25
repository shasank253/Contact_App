import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface CovidData {
  country: string;
  cases: number;
  todayCases: number;
  casesPerOneMillion: number;
  deaths: number;
  countryInfo: {
    lat: number;
    long: number;
  };
}

const MapComponent: React.FC = () => {
  const [covidData, setCovidData] = useState<CovidData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://disease.sh/v3/covid-19/countries');
        const data = await response.json();
        setCovidData(data);
      } catch (error) {
        console.error('Error fetching COVID-19 data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={3} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {covidData.map((country: CovidData, index: number) => (
        <Circle
          key={index}
          center={[country.countryInfo.lat, country.countryInfo.long]}
          radius={50000} // Adjust radius as needed
          fillColor="red"
          fillOpacity={0.5}
        >
          <Popup>
            <h2>{country.country}</h2>
            <p>Total Cases: {country.cases.toLocaleString()}</p>
            <p>New Cases Today: {country.todayCases.toLocaleString()}</p>
            <p>Cases Per Million People: {country.casesPerOneMillion.toLocaleString()}</p>
            <p>Deaths: {country.deaths.toLocaleString()}</p>
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
