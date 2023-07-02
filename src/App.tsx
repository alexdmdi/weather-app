import React, { useState, Suspense } from "react";

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DayCSS from './components/DayCSS'
import NightCSS from './components/NightCSS'

import NavBar from './components/Navbar'
import Weather from "./components/Weather"
import FutureForecast from './components/FutureForecast';

import { Location } from "./components/types";
import { WiDayCloudy } from "react-icons/wi";

const SearchBar = React.lazy( () => import ('./components/SearchBar'))

function App() {

  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>();
  const [forecastData, setForecastData] = useState<any>(null); //gets passed to futureforecast
  const [dayThemeBoolean, setDayThemeBoolean] = useState<boolean>(true); //true: DayCSS used, false: NightCSS used

  const updateTheme = (booleanValue: boolean) => {
    setDayThemeBoolean(booleanValue);
    console.log(`current weather data in app.tsx has been set to: ${(booleanValue==true)? "DayCSS" : "NightCSS"}`)
  }
  const updateForecastData = (forecastData: object) => {
    setForecastData(forecastData);
  }


  return (
    <>
      <style>
        {(dayThemeBoolean === true)? DayCSS : NightCSS}
      </style>
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col-10">
            <NavBar />
          </div>
          <div className="col"></div>

        </div>
  
        <h1 className="display-5 fw-normal text-center mb-2 ">
          Weather Forecast
          <div className="ico-WiDayCloudy">
            <WiDayCloudy size='1.5em' />
          </div>
        </h1>

        <div className="row text-center justify-content-center">
          <div className="col"></div>
            
          <div className="col-10 col-lg-5 col-sm-8 pt-3 mb-4 search-bar-container p-0">
            <div className="fs-4 contentBox p-1 rounded">
              <div className="search-container">
                <Suspense fallback={<div className="fs-5">Loading...</div>}>
                  <SearchBar setFilteredLocations={setFilteredLocations} onLocationSelect={setSelectedLocation}/>  
                </Suspense>
              </div>
            </div>
          </div>

          <div className="col"></div>
          
        </div>

        <div className="row justify-content-center">
            
          <div className="col  col-md-1"></div>
            
            <div className="col-xl-7 col-lg-8 col-md-10">
              <Weather selectedLocation={selectedLocation} updateForecastData={updateForecastData} updateTheme={updateTheme}/>

              <div className="row rounded ms-0 me-0 mb-5">
                <FutureForecast forecastData={forecastData} />
              </div>    
            </div>
            
          <div className="col  col-md-1"></div>
        </div>
          
      </div>

    </>

  );

}

export default App

//NOTES:
//line 61: react suspense promise under the hood, allowing react to asynchronously load the component when needed instead of including it in the initial bundle
//line 62: passes setFilteredLocations as the prop value to provide the function that updates 'FilteredLocations' state when called