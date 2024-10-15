import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
           <h1 className="company-name">EliteEats</h1>
           <p>Your ultimate destination for delicious food delivered to your doorstep. Discover a world of flavors, delivered with care to your doorstep.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
           <h2>COMPANY</h2>
           <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivary</li>
            <li>privacy policy</li>
           </ul>
        </div>
        <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 -987-654-3210</li>
                    <li>contact : fake@gmail.com</li>
                </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copy-right">CopyRight 2024 @EliteEats.com  All Right Reservied</p>
    </div>
  );
};

export default Footer;
