import React, { useState } from 'react';
import m from './home.module.css';
import BoardCreator from './CreateNewBoard.jsx/BoardCreator';
import Board from './CreateNewBoard.jsx/Board';

const Home = (props) => {
  const [editMode, setEditMode] = useState(false);
    const onEditMode = () => {
      setEditMode(true);
    }
    const closeEditMode = () => {
      setEditMode(false);
    }
    
  return (
    <div className={m.home}>
      {!editMode
        ? <Board action={onEditMode} title='Create a new board...'/>
        : <BoardCreator close={closeEditMode} addNewBoard={props.addNewBoard}/>
      }

      { props.boards &&
         props.boards.map(board => 
         <Board key={board.id} title={board.title} id={board.id} action={props.toBoard} deleteBoard={props.deleteBoard}/>)
      }
    </div>
  );
}

export default Home;