import dayBackground from '../assets/sky-clouds.jpg'

const DayCSS: string = `
  body {
    background-image: url(${dayBackground});
    backround-repeat: no-repeat;
    background-size: cover; 
    background-attachment: fixed;

  }
  
  .navCustomized {
      background-color:rgba(255, 255, 255, 0.637) !important;
      
  }
  
  .nav-link:hover {
    color:rgb(153, 204, 255) !important;
    
    }

  .ico-WiDayCloudy{
      display:inline-block;
      margin-left:10px;
      color:yellow;
      border-radius:80px;
      padding-left:8px;
      padding-right:8px;
  }

  .weatherDescription {
    transform: translateY(-30%);
  }

  .accordion-item {
      background: rgba(255, 255, 255, 0.432) !important;
      -webkit-backdrop-filter: blur(10px) !important;
      backdrop-filter: blur(10px) !important;
      -webkit-box-shadow: 0px 5px 17px 9px rgba(0,0,0,0.20); 
      box-shadow: 0px 10px 20px 5px rgba(0,0,0,0.10);
  }
  
  .accordion-button:not(.collapsed){
      background-color:white !important;
  }
  
  .contentBox {
      background: rgba(255, 255, 255, 0.432) !important; 
      -webkit-backdrop-filter: blur(10px) !important;
      backdrop-filter: blur(10px) !important;

      -webkit-box-shadow: 0px 5px 17px 9px rgba(0,0,0,0.20); 
      box-shadow: 0px 3px 20px 5px rgba(0,0,0,0.10);
      
  }
  
  .search-bar-container {
      position: relative;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 100;
      
    }
    
    .search-results {
      position: absolute;
      width:100%;
      max-height: 270px;
      overflow-y: auto;
      margin-top: 7px;
      background-color: rgba(255, 255, 255, 0.432);
      backdrop-filter: blur(10px);
      
    }
  
    sup {
      font-size: 0.6em !important;
    }
  
    #forecastImg {
      max-width:80px;
    }
  
  ::-webkit-scrollbar {
      width: 0px !important;
  }
  
  .horizScrollBar {
      scroll-behavior:smooth;  
  }
  
  
  .horizScrollBar::-webkit-scrollbar {
      height: 8px !important;
  }
      
  .horizScrollBar::-webkit-scrollbar-track {
      border-radius: 0px !important;
      background-color:rgba(184, 183, 183, 0.808) !important;
      
  }
      
  .horizScrollBar::-webkit-scrollbar-thumb {
      border-radius: 0px;
      background-color:rgba(255, 255, 255, 0.938) !important;
  }
  
  
  .no-scrollbar {
      overflow-y: hidden !important;
  }
  
  .hourlyTemp {
      transform: translateY(-80%);
      
  }
  
  `

  export default DayCSS;