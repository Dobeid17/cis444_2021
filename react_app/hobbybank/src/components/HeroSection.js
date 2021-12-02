import React from 'react'
import { Button } from './Button'
import './HeroSection.css';
import '../App.css';

function HeroSection() {
    return (
        <div className='hero-container'>
            <video src="/videos/Leo-Messi.mp4" autoPlay loop muted />
            <h1>What You Got?</h1>
            <div className='hero-btns'>
                <Button
                    className='btns'
                    buttonStyle='btn--primary'
                    buttonSize='btn--large'
                >
                    GET STARTED
                </Button>
                {/* <Button
                className ='btns'
                buttonStyle='btn--primary'
                buttonSize ='btn--large'
                >
                 Watch Trailer <i className='far fa-play-circle'/>
                </Button> */}
            </div>
        </div>
    )
}

export default HeroSection
