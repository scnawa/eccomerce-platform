import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSlider from '../../src/components/HeroSlider'; 

const LandingPage = () => {
    return (
        <div>
            <HeroSlider />
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>Landing Page</h1>
            </div>
            <div></div>
        </div>
    );
}
export default LandingPage;