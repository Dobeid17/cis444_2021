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
                        src='https://i.imgur.com/WN7BQJ3.png' // lock
                        text='My Collection'
                        path='/collection'
                        />
                        <CardItem 
                        src='https://i.imgur.com/5QPIO8G.jpeg' //star
                        text='Favorites'
                        path='/favorites'
                        />
                        <CardItem 
                        src='https://i.imgur.com/KmfSqob.jpeg' //binoculars
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
