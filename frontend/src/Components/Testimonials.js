import React from 'react';
import user1 from '../assets/user1.jpeg'
import user2 from '../assets/user2.jpeg'
import user3 from '../assets/user3.jpeg'
import user5 from '../assets/user5.jpg'

import './Testimonials.css'

const Testimonials = () => {
    return (
        <div className='testimonials' id='testimonials'>
            \\hdfnkjnf
            <div className='container'>
                <h2>Testimonials</h2>
                <span className='line'></span>
                <div className='content'>
                    <div className='card'>
                        <img src={user1} alt='user1'/>
                        <p>Wonderful platform to find extra-ordinary talent! We sourced people from various backgrounds and unconventional profile just on the basis of the projects they developed.</p>
                        <p><span>Johnson.M.J.</span></p>
                        <p>VP at Jump Trading</p>
                    </div>
                    <div className='card'>
                        <img src={user2} alt='user1'/>
                        <p>TechStar helped me get this job! My Manager found my profile on FindYourTechStar and was impressed by my contributions to answering questions on StackOverflow and Reddit.</p>
                        <p><span>Carol Harper</span></p>
                        <p>SDE-2 At Salesforce</p>
                    </div>
                    <div className='card'>
                        <img src={user3} alt='user1'/> 
                        <p>I met Brad Rose on this platform. He was looking for a junior/sophomore to join his team when I matched with him. He has been an amazing mentor to me. Thank you TechStar!</p>
                        <p><span>Alex Prince</span></p>
                        <p>Incoming SWE Intern at IBM   </p>
                        <p><span>Brad Rose</span></p>
                        <p>Engineering Manager at IBM   </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;