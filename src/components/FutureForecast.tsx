import React from "react";

interface FutureForecastProps {
    weatherData: any;
}

function FutureForecast( {weatherData}: FutureForecastProps) {
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const getCurrentDate = () => {
        const today = new Date();
        const currentMonthName: string = monthNames[today.getMonth()];
        const currentDayOfWeek: string = weekdayNames[today.getDay()];

        const currentDateObject = {today, currentMonthName, currentDayOfWeek}
        return currentDateObject;
    }

    //offset of 1 means tomorrow, one day after the currentDate, passing 2 means 2 days after today, etc
    const getFollowingDate = (dayOffset: number) => {
        if (dayOffset < 7){
            const date = new Date(getCurrentDate().today);
            date.setDate(date.getDate() + dayOffset);
            
            const day: number = date.getDate()
            const MonthName: string = monthNames[date.getMonth()];
            const dayOfWeek: string = weekdayNames[date.getDay()];

            const dateObject = {day, MonthName, dayOfWeek}
            return dateObject;
        }
        else {
            throw new Error (`dayOffset can be a maximum of 6`)
        }
    
    }


    return(
        <>
            
            <div className="accordion accordion-flush p-0" id="accordionFlushExample">
                
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            {`${getFollowingDate(2).dayOfWeek}, ${getFollowingDate(2).MonthName} ${getFollowingDate(2).day} `}
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body pt-0 pb-0"> 
                            
                            <div className="row ms-2 me-2 align-self-center">
                                <div className="col-3">
                                    <p className="display-6 pt-3 pb-3">
                                        {weatherData? `${Math.round(weatherData.list[1].main.temp)}°C` : "Data not available"}
                                    </p>
                                    Will feel like:
                                    <p className="fs-5">
                                        {weatherData? `${Math.round(weatherData.list[1].main.feels_like)}°C` : ""}
                                    </p>

                                </div>
                                    

                                
                                <div className="col ms-2 me-2 align-self-center pt-3 border-end border-light">
                                    <div className="row">Humidity:</div>
                                    <div className="row">
                                        <p className="fs-5 ps-0 d-flex">
                                        {weatherData? `${Math.round(weatherData.list[1].main.humidity)}%` : "N/A"}
                                        </p>
                                    </div>

                                    <div className="row">Min:</div>
                                    <div className="row ">
                                        <p className="fs-6 mb-1 ps-0 d-flex">
                                            {weatherData? `${Math.round(weatherData.list[1].main.temp_min)}°C` : "N/A"}
                                        </p>
                                    </div>
                                    
                                
                                    <div className="row">Max:</div>
                                    <div className="row">
                                        <p className="fs-6 mb-1 ps-0 pb-3 d-flex">
                                            {weatherData? `${Math.round(weatherData.list[1].main.temp_max)}°C` : "N/A"}
                                        </p>
                                    </div>
                                </div>

                                <div className="col ms-2 me-2 align-self-center pt-3">
                                    yo

                                </div>
                            </div>
                           
                            
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        {`${getFollowingDate(3).dayOfWeek}, ${getFollowingDate(3).MonthName} ${getFollowingDate(3).day} `}
                        </button>
                    </h2>
                    <div id="flush-collapse2" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Placeholder content for this accordion</div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        {`${getFollowingDate(4).dayOfWeek}, ${getFollowingDate(4).MonthName} ${getFollowingDate(4).day} `}
                        </button>
                    </h2>
                    <div id="flush-collapse3" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Placeholder content for this accordion</div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        {`${getFollowingDate(5).dayOfWeek}, ${getFollowingDate(5).MonthName} ${getFollowingDate(5).day} `}
                        </button>
                    </h2>
                    <div id="flush-collapse4" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Placeholder content for this accordion</div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        {`${getFollowingDate(6).dayOfWeek}, ${getFollowingDate(6).MonthName} ${getFollowingDate(6).day} `}
                        </button>
                    </h2>
                    <div id="flush-collapse5" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Placeholder content for this accordion</div>
                    </div>
                </div>

            </div>
        </>

    )

}

export default FutureForecast;