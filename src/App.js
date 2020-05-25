import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import HomeContainer from './components/Home/HomeContainer';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import BoardPageContainer from './components/BoardPage/BoardPageContainer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className='app-wrapper'>
          <Route exact path="/" render={() => <Redirect to='/home'/>} />
          <Route path='/home' render={() => <HomeContainer />} />
          <Route path='/board/:id?' render={() => <BoardPageContainer/>} />
        </div>
      </div>
    );
  }
}

export default connect()(App);
