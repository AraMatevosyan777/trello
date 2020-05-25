import React from 'react';
import { connect } from 'react-redux';
import BoardPage from './BoardPage';
import { withRouter } from 'react-router-dom';
import { requestBoard,addNewNoteList,deleteNotesList,addNewNote,deleteNote,onCheckedToggle } from '../../redux/BoardPageReducer';

class BoardPageContainer extends React.Component {
    componentDidMount(){
        let id = this.props.match.params.id;
        if(!id){
            this.props.history.push('/home');
          }
          this.props.requestBoard(id);
      }
    componentDidUpdate(prevProps,prevState){
      if(prevProps.board && prevProps.board.notesLists !== this.props.board.notesLists){
        let id = this.props.match.params.id;
        if(!id){
            this.props.history.push('/home');
          }
          this.props.requestBoard(id);
      }
    }

  render() {
    return (
     <BoardPage board={this.props.board}
     addNewNoteList={this.props.addNewNoteList}
     id={this.props.match.params.id}
     deleteNotesList={this.props.deleteNotesList}
     addNewNote={this.props.addNewNote}
     deleteNote={this.props.deleteNote}
     onCheckedToggle={this.props.onCheckedToggle}
     />
    );
  }
}

const mstp = (state) => ({
    board: state.boardPage.board,
})

export default withRouter(
  connect(mstp, 
    {requestBoard,addNewNoteList,
      deleteNotesList,addNewNote,
      deleteNote,onCheckedToggle})(BoardPageContainer));
