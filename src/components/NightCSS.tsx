
const NightCSS: string = `

body {
    background-image: url("/src/assets/nightSkyBackground.jpg");
    backround-repeat: no-repeat;
    background-size:cover; 
    background-attachment: fixed;
}

.navbar-brand, .active {
    color: white !important;
}

.navCustomized {
    background: rgba(90, 105, 120, 0.604) !important;  
}

.nav-link:hover {
    color:rgba(255, 255, 255, 0.8) !important;
    
}

h1, div {
    color:white !important;
}


.ico-WiDayCloudy{
    display:inline-block;
    margin-left:10px;
    color:yellow;
    border-radius:80px;
    padding-left:8px;
    padding-right:8px;
}

.locationText {
    color: rgb(192, 200, 226) !important;
}

.weatherSummary {
    border-right-color: rgba(150, 161, 184, 0.993) !important;
}

.weatherDescription {
    transform: translateY(-30%);
}

.accordion-item {
    background: rgba(90, 105, 120, 0.404) !important; 
    -webkit-backdrop-filter: blur(10px) !important;
    backdrop-filter: blur(10px) !important;
    border-bottom-color: rgb(111, 120, 139) !important;
}

/* closed */
.accordion-button {
    background-color:rgba(46, 49, 61, 0.575) !important;
    color: white !important;
}

/* for opened item */
.accordion-button:not(.collapsed){
    background-color:rgba(109, 116, 139, 0.685) !important;
    color:white !important;  
}


.forecastItem {
    border-color: rgba(150, 161, 184, 0.432) !important;
}

.forecastDaySummary {
    border-color: rgba(150, 161, 184, 0.993) !important;
}

.contentBox {
    background: rgba(90, 105, 120, 0.304) !important; 
    -webkit-backdrop-filter: blur(10px) !important;
    backdrop-filter: blur(10px) !important;
    border-color: rgb(142, 146, 172) !important;
    
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

export default NightCSS;