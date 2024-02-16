import React from 'react';
import { Link } from 'react-router-dom';
import {HiOutlineArrowNarrowRight} from "react-icons/hi"

const About = () => {
  return (
    <section className='about' id='about'>
        <div className="container">
            <div className="banner">
                <div className="top">
                    <h1 className="heading">ABOUT US</h1>
                    <p>The only thing we are serious about is food.</p>
                </div>
                <p className='mid'>“Welcome to our restaurant, a culinary haven where flavors meet. We offer an exquisite blend of traditional and contemporary dishes, crafted with love and precision. Our chefs use the freshest ingredients, ensuring a memorable dining experience. Join us for a gastronomic journey that promises to delight your senses.”</p>
                <Link to={"/"}>Explore Menu
                 <span>
                    <HiOutlineArrowNarrowRight/>
                 </span>
                 </Link>

            </div>
            <div className="banner">
                <img src="/about.png" alt="about" />
            </div>
        </div>
    </section>
  )
}

export default About