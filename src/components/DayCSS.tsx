const DayCSS: string = `
  body {
    background-image: url("/src/assets/sky-clouds.jpg");
    backround-repeat: no-repeat;
    background-size:cover; 
    background-attachment: fixed;

  }
  
  .navCustomized {
      background-color:rgba(255, 255, 255, 0.637) !important;
  }
  
  .nav-link:hover {
      background-color:rgba(255, 255, 255, 0.479);
      border-radius:12px;
  }

  .ico-WiDayCloudy{
      display:inline-block;
      margin-left:10px;
      color:yellow;
      border-radius:80px;
      padding-left:8px;
      padding-right:8px;
  }
  .accordion-item {
      background: rgba(255, 255, 255, 0.432) !important;
      -webkit-backdrop-filter: blur(10px) !important;
      backdrop-filter: blur(10px) !important;
  }
  
  .accordion-button:not(.collapsed){
      background-color:white !important;
  }
  
  .contentBox {
      background: rgba(255, 255, 255, 0.432) !important; 
      -webkit-backdrop-filter: blur(10px) !important;
      backdrop-filter: blur(10px) !important;
      
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
      /* -webkit-box-shadow: inset 0 0 6px rgb(0, 0, 0);  */
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