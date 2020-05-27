import React, { useState } from 'react';
import m from '../BoarderPage.module.css';
import CloseX from '../../common/closeX';
import Note from './Note';
import Error from '../../common/Error';

const NotesList = (props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const deleteList = () => {
    props.deleteList(props.list.id)
  }
  const addNote = (e) => {
    e.preventDefault();
    if(value.trim()){
      if(value.length > 20){
        setError('Max length is 20 symbols');
      }else{
      props.addNewNote(value,props.list.id);
      setValue('');
      setError('');
      }
    }else{
      setError('add a note...')
    }
  }
  const onNoteDelete = (noteId) => {
      props.deleteNote(props.list.id, noteId);
  }
  const onCheck = (noteId, check) => {
      props.onChecked(props.list.id, noteId, check);
  }
  
  return (
    <div className={m.NotesList}>
      <div className={m.NotesListBody}>
        <CloseX close={deleteList} />
      <div className={m.NotesListHeader}>
        <h4>
          {props.list.title}
        </h4>
      </div>
      <form className={m.NotesForm} onSubmit={addNote}>
        <input type="text" value={value} onChange={(e)=> setValue(e.currentTarget.value)} autoFocus='on'/>
        {error && <Error error={error}/>}
      </form>
      { props.list.notes && Object.keys(props.list.notes).map(note =>
          <Note key={note} id={note} onNoteDelete={onNoteDelete} onCheck={onCheck} note={props.list.notes[note]}/>)
      }
      </div>
      
    </div>
  );
}

export default NotesList;
