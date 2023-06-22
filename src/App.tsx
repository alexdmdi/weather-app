import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React, { useState, Suspense } from "react";

import NavBar from './components/Navbar'
import FutureForecast from './components/FutureForecast';
import { Location } from "./components/types";
import Weather from "./components/Weather"
import { WiDayCloudy } from "react-icons/wi";

const SearchBar = React.lazy( () => import ('./components/SearchBar'))

function App() {

  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>({"id":6167865, "name":"Toronto", "state":"", "country":"CA"});
  const [weatherData, setWeatherData] = useState<any>(null);

  const updateWeatherData = (data: object) => {
    setWeatherData(data);
  }

  return (
    <>
      <div className="container">
        <NavBar />
        <h1 className="display-5 fw-normal text-center mb-2 ">
          Weather Forecast
          <div className="ico-WiDayCloudy">
            <WiDayCloudy size='1.5em' />
          </div>
        </h1>

        <div className="row text-center">
          <div className="col-xl-3 col-md-1"></div>
          <div className="col pt-3 pb-4 search-bar-container p-0">
            <div className="fs-4 contentBox p-1 rounded">
              <div className="search-container">
                  <Suspense fallback={<div className="fs-5">Loading...</div>}>
                    <SearchBar setFilteredLocations={setFilteredLocations} onLocationSelect={setSelectedLocation} />  
                  </Suspense>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-1"></div>
        
        </div>

        <div className="row">
          <div className="col-xl-2 col-md-1">   </div>
          <div className="col">
            <Weather selectedLocation={selectedLocation} updateWeatherData={updateWeatherData} />

            <div className="row border rounded ms-0 me-0 mb-5">
              <FutureForecast weatherData={weatherData} />
            </div>    
          </div>
          <div className="col-xl-2 col-md-1">   </div>
        </div>
        
      </div>

    </>
  );
}

export default App

//NOTES:
//line 41 passes setFilteredLocations as the prop value to provide the function that updates 'FilteredLocations' state when called
//line 42 uses react suspense promise under the hood, allowing react to asynchronously load the component when needed instead of including it in the initial bundle