import React from 'react';
import turkeyFlag from '../image/turkey-flag.jpg';
import ukFlag from '../image/uk-flag.jpg';

const Footer = () => {
    return(
        <div className="container-md">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p className="col-md-4 mb-0 text-muted">© 2021 Company, Inc</p>

                <div className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto">
                    <img src={turkeyFlag} className="img-fluid" alt="turkey flag" width="40px" />
                    <img src={ukFlag}  className="img-fluid ms-2" alt="uk flag" width="40px" />
                </div>

                <ul className="nav col-md-4 justify-content-end">
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Home</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Features</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Pricing</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">FAQs</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">About</a></li>
                </ul>
            </footer>
        </div>
    );
};

export default Footer;