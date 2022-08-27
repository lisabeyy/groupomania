import React from "react";
import Logo from "../../img/icon-left-font.png";
import './LogoSearch.css'
import { UilSearch } from '@iconscout/react-unicons'
const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img src={Logo} width="100%" alt="" />
    </div>
  );
};

export default LogoSearch;
