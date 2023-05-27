import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import NavBar from './components/Navbar'
import FutureForecast from './components/FutureForecast';

function App() {

  return (
    <>
      
      
      <div className="container">
        <NavBar/>
        <div className="row border rounded ms-0 me-0 mb-5 contentBox ">
          <div className="col-xl-1 t"></div>

          <div className="col pt-3 pb-5 ">
            <h2 className="display-3">18c</h2>
            <h3 className="fs-4">Toronto, Ontario</h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nesciunt 
          quia reiciendis nihil neque ex, omnis maxime, tempora similique fuga aliquid quibusdam aperiam 
          hic ullam delectus enim alias aliquam, nisi facilis unde consequatur voluptatum quae nobis? Consequuntur,
           
          </div>

          <div className="col-xl-1"></div>

        </div>
      
        <div className="row border rounded ms-0 me-0">
          <FutureForecast/>
        </div>
      
      </div>
    </>
    
  )
}

export default App
