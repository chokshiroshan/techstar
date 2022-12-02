import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css'
import Button from '@mui/material/Button';


const Hero = () => {
    return (
        <div className='hero'>
            <div className='content'>
                <p>Find Your TechStar</p>
                <p>A Social Networking Site for Developers!</p>
                <Button variant="contained" className='create-button' component = {Link} to="/signup">Create Account</Button>
                
            </div>
        </div>
    );
};

export default Hero;