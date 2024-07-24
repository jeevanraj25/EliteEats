import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from "../../context/StoreContext";

const NavBar = ({setShowLogin}) => {

   const [menu,setMenu] = useState("home ");
   const {getTotalCartAmount, token,setToken} = useContext(StoreContext);
   const [searchQuery, setSearchQuery] = useState("");
   const [searchButton,setSearchButton] =useState(false);
   const [isHovered, setIsHovered] = useState(false);
   const navigate = useNavigate(); 
   

   const logout = () => {
    // console.log(token);
      localStorage.removeItem("token");
     
      setToken("");
      // console.log(token);
      navigate("/")
      
   }
  
    const SearchHandler = (e) =>{
        // e.preventDefault(); // Prevent form submission
        if (searchQuery.trim() !== "") {
          navigate("/search", { state: { query: searchQuery } });
        }
        // console.log(searchQuery);
        // navigate("/search");
    }

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    useEffect(() => {
      SearchHandler();
    },[searchQuery])


  return ( 
    <div className="navbar">
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link> 
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""} >home</Link>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""} >menu</a>
        <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""} >mobile-app</a>
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""} >contact us</a>
      </ul>
      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="" /> */}
        <div className="navbar-search "  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          { !isHovered &&(
                <button><img src={assets.search_icon} alt="" /></button> 
          )}
         
       {isHovered && (
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
      />
    )}
        
        </div>
         <div className="navbar-search-icon">
            <Link to= '/cart'><img src={assets.basket_icon} alt="" /></Link> 
            <div className={getTotalCartAmount() === 0?"":"dot"}></div>
         </div>
         {!token ? <button onClick={() => setShowLogin(true)}>sigin in</button> : 
          <div className="navbar-profile">
             <img src={assets.profile_icon} alt="" />
             <ul className="nav-profile-dropdown">
                <li onClick={() => navigate("/myorders")} ><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logout}><img  src={assets.logout_icon} alt="" /><p>Logout</p></li>
             </ul>
          </div>
         }
        {/* <button onClick={() => setShowLogin(true)}>sigin in</button> */}
      </div>
    </div>
  );
};

export default NavBar;
