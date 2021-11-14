import React from 'react';

const Navbar = () => {
    return(
        <nav className="navbar navbar-white border-bottom">
            <div className="container-md">
                <a className="navbar-brand">Buybet</a>
                <form className="d-flex">
                    <button className="btn btn-outline-info me-2" type="submit">Sign In</button>
                    <button className="btn btn-outline-dark" type="submit">Sign Up</button>
                </form>
            </div>
        </nav>
    );
};

export default Navbar;