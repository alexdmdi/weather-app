import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React, { useState } from "react";

import NavBar from './components/Navbar'
import FutureForecast from './components/FutureForecast';
import { Location } from "./components/types";
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Weather from "./components/Weather"
import { WiDayCloudy } from "react-icons/wi";

function App() {

  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]); // State variable to store filtered cities
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  return (
    <>
      <div className="container">
        <NavBar />
        <h1 className="display-5 fw-normal text-center mb-2">
          Weather Forecast
          <div className="ico-WiDayCloudy">
            <WiDayCloudy size='1.5em' />
          </div>
        </h1>

        <div className="row text-center">
          <div className="col-xl-3 col-md-2 col-sm-1"></div>
          <div className="col pt-3 pb-3 search-bar-container p-0">
            <div className="fs-4 contentBox p-1 rounded">
            <div className="search-container">
                <SearchBar setFilteredLocations={setFilteredLocations} onLocationSelect={setSelectedLocation} />  
                
            </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-2 col-sm-1"></div>
        </div>

        <Weather selectedLocation={selectedLocation} />

        <div className="row border rounded ms-0 me-0">
          <FutureForecast />
        </div>

      </div>

      
    </>
  );
}

export default App

//for line 34: passes setFilteredLocations as the prop value to provide the function that updates 'FilteredLocations' state when called