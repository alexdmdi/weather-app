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

function AccordionItem({ day, followingDays }: { day: keyof typeof followingDays; followingDays: { [key: string]: DayData } }, forecastData: any) {
  const scrollbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollbarElement = scrollbarRef.current;

    if (scrollbarElement) {
      scrollbarElement.addEventListener("wheel", handleWheel, {passive: true,});
    }

    return () => {
      if (scrollbarElement) {
        scrollbarElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const handleWheel = (event: WheelEvent) => {
    const { deltaY } = event;

    if (scrollbarRef.current) {
      scrollbarRef.current.scrollLeft += deltaY * 1.5;
    }
  };

  const handleMouseEnter = () => {
    document.body.classList.add("no-scrollbar");
  };

  const handleMouseLeave = () => {
    document.body.classList.remove("no-scrollbar");
  };

  return (
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${String(day)}`} aria-expanded="false" aria-controls={`flush-collapse${String(day)}`}>
            {`${followingDays[day].dayOfWeek}, ${followingDays[day].MonthName} ${followingDays[day].day} `}
          </button>
        </h2>
        <div id={`flush-collapse${String(day)}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body p-0">
            
            <div className="row ms-0 me-0">
              <div className="col-5 ps-2 pe-2 pt-3 pb-3 border-end border-light border-1">
                <div className="row ms-2">
                  Max:
                </div>
                <div className="row display-6 pb-2 ms-2">
                  {forecastData ? `${Math.round(followingDays[day].maxTemp)}°C` : "Not available"}
                </div>
  
                <div className="row ms-2">
                  Min:
                </div>
                <div className="row fs-5 pb-2 ms-2">
                  {forecastData ? `${Math.round(followingDays[day].minTemp)}°C` : "Not available"}
                </div>
  
                <div className="row ms-2">
                  Max Humidity:
                </div>
                <div className="row fs-5 ms-2">
                  {forecastData ? `${Math.round(followingDays[day].maxHumidity)}%` : "N/A"}
                </div>
              </div>
  
              <div className="col text-center d-flex overflow-x-scroll horizScrollBar" ref={scrollbarRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="row flex-nowrap">
                  {followingDays[day].weatherList.map((item: any, index: number) => (
                    <div className="col border-end border-gray border-1" key={index}>
                      <div className="row fs-6 d-flex justify-content-center pt-2">
                        {forecastData ? `${new Date(followingDays[day].weatherList[index].dt * 1000).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}` : "N/A"}
                      </div>
  
                      <div className="row">
                        <div className="fs-5 d-flex justify-content-center align-items-center" >
                          <div className="mt-4 mb-2">
                            <img id="forecastImg" src={`https://openweathermap.org/img/wn/${followingDays[day].weatherList[index].weather[0].icon}@2x.png`} alt="icon" />
                          </div>
                        </div>
                      </div>
  
                      <div className="row fs-6 justify-content-center ps-2 pe-2 hourlyTemp">
                        {forecastData ? `${Math.round(followingDays[day].weatherList[index].main.temp)}°C` : "N/A"}
                      </div>
                      
                      <div className="row fs-6 justify-content-center ps-2 pe-2">
                        {forecastData ? `${followingDays[day].weatherList[index].weather[0].description}` : "N/A"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
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

    
   //-----------------------------------------------------------------------------------------//      

   //prevents accordion list items (forecast) from rendering until data is ready
   if (forecastData){
     return( 
          <div className="accordion accordion-flush p-0" id="accordionFlushExample">
              {Object.keys(followingDays).map((day: keyof typeof followingDays, index: number) => (
              <AccordionItem key={index} day={day} followingDays={followingDays}/>
              ))}
          </div>
      
      )

   }
   else return (<></>)

}

export default FutureForecast;