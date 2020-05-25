import React from 'react';
import Home from './Home';
import { connect } from 'react-redux';
import { addNewBoard,deleteBoard, requestBoards } from '../../redux/homePageReducer';
import { withRouter } from 'react-router-dom';

class HomeContainer extends React.Component{
  componentDidMount(){
    this.props.requestBoards()
  }
  toBoard = (id) => {
    this.props.history.push('/board/' + id);
  }

  render(){
    return(
      <Home addNewBoard={this.props.addNewBoard}
      boards={this.props.boards}
      deleteBoard={this.props.deleteBoard}
      toBoard={this.toBoard}
      />
    )
  }
}

const mstp = (state) => ({
  boards: state.homePage.boards,
})
export default withRouter(connect(mstp,{addNewBoard, deleteBoard,requestBoards})(HomeContainer));
