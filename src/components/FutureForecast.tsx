import React, { useEffect, useRef } from "react";

interface FutureForecastProps {
    forecastData: any;
}
interface DayData {
    date: Date;
    dayOfWeek: string;
    MonthName: string;
    day: number;
    weatherList: any[];
    minTemp: number
    maxTemp: number;
    maxHumidity: number;
  }

function FutureForecast( {forecastData}: FutureForecastProps) {
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    //gets current date based on users location through browser/computer
    const getCurrentDate = () => {
        const todayDateObj = new Date(new Date().setHours(0,0,0,0)); //initializes new date for today with hour set at midnight 
        // console.log(`todayDateObj is: ${todayDateObj}`)
        const currentMonthName: string = monthNames[todayDateObj.getMonth()];
        const currentDayOfWeek: string = weekdayNames[todayDateObj.getDay()];

        const currentDateObject = {todayDateObj, currentMonthName, currentDayOfWeek}
        return currentDateObject;
    }
    const currentDate = getCurrentDate();
    console.log(`current date from local pc based is: ${currentDate.todayDateObj}`)

    //passing an offset of 1 means tomorrow, one day after currentDate, passing 2 is for after tomorrow, etc
    const getDateInfo = (dayOffset: number) => {
        if (dayOffset <= 5){
            
            //initialize by setting as current date object
            const dateObj = new Date(getCurrentDate().todayDateObj);
            
            //dateObj now contains the right data for the specified following day
            dateObj.setDate(dateObj.getDate() + dayOffset);
            
            const day: number = dateObj.getDate()
            const MonthName: string = monthNames[dateObj.getMonth()];
            const dayOfWeek: string = weekdayNames[dateObj.getDay()];

            const dateObject = {dateObj, day, MonthName, dayOfWeek}
            return dateObject;
        }
        else {
            throw new Error (`dayOffset can be a maximum of 5`)
        }
    
    }

    //initialize forecast days, only contains date info at first
    const followingDays: Record<string, DayData> = {
        "day1": {
            "date": getDateInfo(1).dateObj, 
            "dayOfWeek": getDateInfo(1).dayOfWeek, 
            "MonthName": getDateInfo(1).MonthName, 
            "day": getDateInfo(1).day,
            "weatherList": [],
            "minTemp": -100,
            "maxTemp" : -100,
            "maxHumidity" : 0,
        }, 

        "day2": {
            "date": getDateInfo(2).dateObj, 
            "dayOfWeek": getDateInfo(2).dayOfWeek, 
            "MonthName": getDateInfo(2).MonthName, 
            "day": getDateInfo(2).day,
            "weatherList": [],
            "minTemp": -100,
            "maxTemp" : -100,
            "maxHumidity" : 0, 
        },

        "day3": {
            "date": getDateInfo(3).dateObj,
            "dayOfWeek": getDateInfo(3).dayOfWeek,
            "MonthName": getDateInfo(3).MonthName, 
            "day": getDateInfo(3).day,
            "weatherList": [],
            "minTemp": -100,
            "maxTemp" : -100,
            "maxHumidity" : 0,
        }, 

        "day4": {
            "date": getDateInfo(4).dateObj, 
            "dayOfWeek": getDateInfo(4).dayOfWeek, 
            "MonthName": getDateInfo(4).MonthName, 
            "day": getDateInfo(4).day,
            "weatherList": [],
            "minTemp": -100,
            "maxTemp" : -100,
            "maxHumidity" : 0,
        }, 

        "day5": {
            "date": getDateInfo(5).dateObj, 
            "dayOfWeek": getDateInfo(5).dayOfWeek, 
            "MonthName": getDateInfo(5).MonthName, 
            "day": getDateInfo(5).day,
            "weatherList": [],
            "minTemp": -100,
            "maxTemp" : -100,
            "maxHumidity" : 0,
        }
    }


    if (forecastData){

        //populates weatherList in followingDays object, once api response is complete
        forecastData.list.forEach((listItem: any) => {
            
            const unixEpochTimeMS: number = listItem.dt * 1000; 
            const dateObj: Date = new Date(unixEpochTimeMS);
            // console.log(`api listItem date ${dateObj}`)

            if (dateObj.toDateString() === currentDate.todayDateObj.toDateString())
            {
                return;
            }
            (Object.keys(followingDays) as Array<keyof typeof followingDays>).forEach((key) => {
                if (dateObj.toDateString() === followingDays[key].date.toDateString())
                {
        
                    followingDays[key].weatherList.push(listItem);
                }
            })
        })

        //sets max temp and max humidity for each of the following days, once api response is complete and weatherlist has been populated
        //then populates icon URLs for each day
        if (forecastData && followingDays.day1.weatherList.length > 0){
            (Object.keys(followingDays) as Array<keyof typeof followingDays>).forEach ((day) => {
                let minTemp = 100;
                let maxTemp = -100;
                let maxHumidity = 0;
                followingDays[day].weatherList.forEach((listItem: any) => {
                    
                    if (listItem.main.temp_min < minTemp)
                    {
                        minTemp = listItem.main.temp_min;
                    }
                    if (listItem.main.temp_max > maxTemp)
                    {
                        maxTemp = listItem.main.temp_max;
                    }
                    if (listItem.main.humidity > maxHumidity)
                    {
                        maxHumidity = listItem.main.humidity;
                    }
                })
                followingDays[day].minTemp = minTemp;
                followingDays[day].maxTemp = maxTemp;
                followingDays[day].maxHumidity = maxHumidity;
            });

        }
        else{
            console.log(`missing weatherlist forecast data`);
        }

        //prints out final followingDays object (length 5)
        console.log(followingDays);
    }

    
    //functional horizontal scrolling with mouse wheel
    const scrollbarRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const scrollbarElement = scrollbarRef.current;
    
        if (scrollbarElement) {
          scrollbarElement.addEventListener('wheel', handleWheel, { passive: true });
        }
    
        return () => {
          if (scrollbarElement) {
            scrollbarElement.removeEventListener('wheel', handleWheel);
          }
        };
      }, []);
    
      const handleWheel = (event: WheelEvent) => {
        const { deltaY } = event;
    
        if (scrollbarRef.current) {
            scrollbarRef.current.scrollLeft += deltaY*1.5;
        }
      };

    const handleMouseEnter = () => {
        document.body.classList.add('no-scrollbar');
    };
    
    const handleMouseLeave = () => {
        document.body.classList.remove('no-scrollbar');
    };

   //----------------------------------------------------------------------------------//      

    return( 
            <div className="accordion accordion-flush p-0" id="accordionFlushExample">
                
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            {`${followingDays.day1.dayOfWeek}, ${followingDays.day1.MonthName} ${followingDays.day1.day} `}
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body p-0"> 
                            
                            <div className="row ms-0 me-0">
                                <div className="col-5 ps-2 pe-2 pt-3 pb-3 border-light border-1 border-end ">
                                    
                                    <div className="row ms-2">
                                        Max:
                                    </div>
                                    <div className="row display-6 pb-2 ms-2">
                                        {forecastData? `${Math.round(followingDays.day1.maxTemp)}°C` : "Not available"}
                                    </div>

                                    <div className="row ms-2">
                                        Min:
                                    </div>
                                    <div className="row fs-4 pb-2 ms-2">
                                        {forecastData? `${Math.round(followingDays.day1.minTemp)}°C` : "Not available"}
                                    </div>

                                    <div className="row ms-2">
                                        Max Humidity:
                                    </div>
                                    <div className="row fs-5 ms-2">
                                        {forecastData? `${Math.round(followingDays.day1.maxHumidity)}%` : "N/A"}
                                    </div>

                                </div>

                                <div className="col text-center d-flex overflow-x-scroll horizScrollBar" ref={scrollbarRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    <div className="row flex-nowrap">
                                        {followingDays.day1.weatherList.map((item: any, index: number) => (
                                            <>
                                            
                                            
                                            {/* <div className="fs-6">
                                                {forecastData? `${new Date(followingDays.day1.weatherList[index].dt * 1000).toLocaleTimeString(undefined, {hour: "2-digit",minute: "2-digit",})}`: "N/A"}
                                            </div> */}

                                            <div className="col border-end border-light d-flex justify-content-center align-items-center" key={index}>
                                                <div className="fs-5">
                                                    
                                                    <div className="mt-4 mb-2">
                                                        <img id="forecastImg" src={ `https://openweathermap.org/img/wn/${followingDays.day1.weatherList[index].weather[0].icon}@2x.png` } alt="icon"></img>
                                                    </div>
                                                    {forecastData? `${followingDays.day1.weatherList[index].weather[0].description}`: "N/A"}
                                                </div>
                                            </div>
                                            </>
                                        ))}
                                    </div>
                                      
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            {`${followingDays.day2.dayOfWeek}, ${followingDays.day2.MonthName} ${followingDays.day2.day} `}
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body p-0"> 
                            
                        <div className="row ms-4 me-4">
                                <div className="col-5 border-light border-end pt-2 pb-2">
                                    Max:
                                    <div className="display-6 pb-2 ">
                                        {forecastData? `${Math.round(followingDays.day2.maxTemp)}°C` : "Not available"}
                                    </div>
                                    Max Humidity:
                                    <div className="fs-5 d-flex">
                                        {forecastData? `${Math.round(followingDays.day2.maxHumidity)}%` : "N/A"}
                                    </div>

                                </div>

                                <div className="col text-center align-self-center">
                                    <div className="fs-1">icon here</div>
                                    <div className="fs-4">
                                        {forecastData? `${followingDays.day2.weatherList[0].weather[0].description}` : "N/A"}
                                    </div>    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            {`${followingDays.day3.dayOfWeek}, ${followingDays.day3.MonthName} ${followingDays.day3.day} `}
                        </button>
                    </h2>
                    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body p-0"> 
                            
                            <div className="row ms-4 me-4">
                                <div className="col-5 border-light border-end pt-2 pb-2">
                                    Max:
                                    <div className="display-6 pb-2 ">
                                        {forecastData? `${Math.round(forecastData.list[1].main.temp_max)}°C` : "Not available"}
                                    </div>
                                    Humidity:
                                    <div className="fs-5 d-flex">
                                        {forecastData? `${Math.round(forecastData.list[1].main.humidity)}%` : "N/A"}
                                    </div>

                                </div>

                                <div className="col text-center align-self-center">
                                    <div className="fs-1">icon here</div>
                                    <div className="fs-4">
                                        {forecastData? `${forecastData.list[1].weather[0].description}` : "N/A"}
                                    </div>    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                            {`${followingDays.day4.dayOfWeek}, ${followingDays.day4.MonthName} ${followingDays.day4.day} `}
                        </button>
                    </h2>
                    <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body p-0"> 
                            
                            <div className="row ms-4 me-4">
                                <div className="col-5 border-light border-end pt-2 pb-2">
                                    Max:
                                    <div className="display-6 pb-2 ">
                                        {forecastData? `${Math.round(forecastData.list[1].main.temp_max)}°C` : "Not available"}
                                    </div>
                                    Humidity:
                                    <div className="fs-5 d-flex">
                                        {forecastData? `${Math.round(forecastData.list[1].main.humidity)}%` : "N/A"}
                                    </div>

                                </div>

                                <div className="col text-center align-self-center">
                                    <div className="fs-1">icon here</div>
                                    <div className="fs-4">
                                        {forecastData? `${forecastData.list[1].weather[0].description}` : "N/A"}
                                    </div>    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                            {`${followingDays.day5.dayOfWeek}, ${followingDays.day5.MonthName} ${followingDays.day5.day} `}
                        </button>
                    </h2>
                    <div id="flush-collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body p-0"> 
                            
                            <div className="row ms-4 me-4">
                                <div className="col-5 border-light border-end pt-2 pb-2">
                                    Max:
                                    <div className="display-6 pb-2 ">
                                        {forecastData? `${Math.round(forecastData.list[1].main.temp_max)}°C` : "Not available"}
                                    </div>
                                    Humidity:
                                    <div className="fs-5 d-flex">
                                        {forecastData? `${Math.round(forecastData.list[1].main.humidity)}%` : "N/A"}
                                    </div>

                                </div>

                                <div className="col text-center align-self-center">
                                    <div className="fs-1">icon here</div>
                                    <div className="fs-4">
                                        {forecastData? `${forecastData.list[1].weather[0].description}` : "N/A"}
                                    </div>    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>


            </div>

    )

}

export default FutureForecast;