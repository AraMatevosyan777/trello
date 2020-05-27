import React, { useState } from 'react';
import m from '../home.module.css';
import CloseX from '../../common/closeX';
import Error from '../../common/Error';

const BoardCreator = (props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const addNewBoard = (value) => {
    if(value.trim()){
      if(value.length > 20){
        setError('Max length is 20 symbols');
      }else{
      props.addNewBoard(value);
      props.close();
      setValue('');
      setError('');
      }
    }else{
      setError('Oops! Looks like you forgot the name!');
    }
  }

  return (
      <div className={m.BoardCreator}>
        <div className={m.header}>
          <h3 className={m.title}>Creating a board</h3>
          <CloseX close={props.close}/>
        </div>
        <form className={m.body} onSubmit={() => addNewBoard(value)}>
          <span className={m.subtitle}>What shall we call the board?</span>
          <input value={value} onChange={(e)=> setValue(e.currentTarget.value)} autoFocus='on'/>
          {error && <Error error={error}/>}
          <div className={m.buttons}>
            <span onClick={()=> props.close()}>Cencel</span>
            <button onClick={() => addNewBoard(value)}>Create</button>
          </div>
        </form>
      </div>
  );
}

export default BoardCreator;
