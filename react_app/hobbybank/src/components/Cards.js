import React from 'react'
import CardItem from './CardItem'
import'./Cards.css';

function Cards() {
    return (
        <div className = 'cards'>
            <h1>Check on my collection</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem 
                        src='images/Lock.jpg'
                        text='My Collection'
                        path='/collection'
                        />
                        <CardItem 
                        src='images/Star.jpg'
                        text='Favorites'
                        path='/favorites'
                        />
                        <CardItem 
                        src='images/Binoculars.jpg'
                        text='Watch List'
                        path='/watch-list'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards
