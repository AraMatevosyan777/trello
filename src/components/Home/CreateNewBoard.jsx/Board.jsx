import React from 'react';
import m from '../home.module.css';
import CloseX from '../../common/closeX';

const Board = (props) => {
  const onDelete = () => {
    props.deleteBoard(props.id)
  }
  return (
    <div className={m.board}>
      <div className={m.boardBody}>
      {props.id &&
      <CloseX close={onDelete}/>}
        <div onClick={()=> props.action(props.id)}>
          <h3>
            {props.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Board;
