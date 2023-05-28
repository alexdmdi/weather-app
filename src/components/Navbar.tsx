import styles from "../App.css"

function NavBar() {

    return (
        <>
            <nav className="navbar navbar-expand-lg mb-5 rounded mt-3 navCustomized">
                <div className="container-fluid">
                    <a className="navbar-brand" href="https://www.alexdiamandi.com">www.alexdiamandi.com</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 me-5 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="https://www.alexdiamandi.com">Creator Home page</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="https://github.com/alexdmdi/weather-app">Source Code</a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </>

    )

}

export default NavBar