import React from "react";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <header>
      <div className="logo"><Link to={"/"}>BidWiz</Link></div>
      <nav>
          <>
            <span>DevMode</span>
          </>
      </nav>
    </header>
  );
};

export default Header;
