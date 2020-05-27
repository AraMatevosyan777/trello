import React from 'react';
import { connect } from 'react-redux';
import BoardPage from './BoardPage';
import { withRouter } from 'react-router-dom';
import { requestBoard,addNewList,deleteList,addNewNote,deleteNote,onChecked } from '../../redux/BoardPageReducer';

class BoardPageContainer extends React.Component {
    componentDidMount(){
        let id = this.props.match.params.id;
        if(!id){
            this.props.history.push('/home');
          }
          this.props.requestBoard(id);
      }

  render() {
    return (
     <BoardPage 
     board={this.props.board}
     lists={this.props.lists}
     boardId={this.props.match.params.id}
     addNewList={this.props.addNewList}
     deleteList={this.props.deleteList}
     addNewNote={this.props.addNewNote}
     deleteNote={this.props.deleteNote}
     onChecked={this.props.onChecked}
     />
    );
  }
}

const mstp = (state) => ({
    board: state.boardPage.board,
    lists: state.boardPage.lists,
})

export default withRouter(
  connect(mstp, 
    {requestBoard,addNewList,
      deleteList,addNewNote,
      deleteNote,onChecked})(BoardPageContainer));
