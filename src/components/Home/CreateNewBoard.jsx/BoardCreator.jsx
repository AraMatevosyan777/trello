import React, { useState } from 'react';
import m from '../home.module.css';
import CloseX from '../../common/closeX';

const BoardCreator = (props) => {
  const [value, setValue] = useState('');
  const addNewBoard = (value) => {
    if(value.trim()){
      props.addNewBoard(value);
      props.close();
      setValue('');
    }
  }

  return (
      <div className={m.BoardCreator}>
        <div className={m.header}>
          <h3 className={m.title}>Creating a board</h3>
          <CloseX close={props.close}/>
        </div>
        <div className={m.body}>
          <span className={m.subtitle}>What shall we call the board?</span>
          <input value={value} onChange={(e)=> setValue(e.currentTarget.value)}/>
          <div className={m.buttons}>
            <span onClick={()=> props.close()}>Cencel</span>
            <button onClick={() => addNewBoard(value)}>Create</button>
          </div>
        </div>
      </div>
  );
}

export default BoardCreator;
