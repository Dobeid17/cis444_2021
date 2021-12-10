import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Collection from './components/pages/Collection';
import Favorites from './components/pages/Favorites';
import WatchList from './components/pages/WatchList'
import SignUp from './components/pages/SignUp.html';

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/collection' component={Collection} />
                    <Route path='/favorites' component={Favorites} />
                    <Route path='/watch-list' component={WatchList} />
                    <Route path='/sign-up' component={SignUp} />
                </Switch>
            </Router>

        </>
    );
}

export default App;
