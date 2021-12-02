import React, { useState } from 'react';
//import CardList from './components/pages/CardList';
//import '../../App.css';

function Collection(props) {
    const [input, setInput] = useState('');

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = e => {
    e.preventDefault();

    /* props.onSubmit({
        id: Math.floor(Math.random() * 10000),      // SOMETHING STILL WRONG WITH THIS FUNCTION OR HOW ITS BEING USED
        text: input
    }); */
 
     setInput('');
    };




    return (
        <form className="card-list" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add a card"
                value={input} name='text'
                className='card-input'
                onChange={handleChange}
            />
            <button className="card-button">Add Card</button>
        </form>
    );


    //return <h1 className='collection'>COLLECTION</h1>;

}


export default Collection;
