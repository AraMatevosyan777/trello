import React, { useState } from 'react';
import m from '../BoarderPage.module.css';
import CloseX from '../../common/closeX';
import Note from './Note';

const NotesList = (props) => {
  const [value, setValue] = useState('');
  const deleteNotesList = () => {
    props.deleteNotesList(props.listId, props.boardId)
  }
  const addNote = (e) => {
    e.preventDefault();
    if(value.trim()){
      props.addNewNote(value,props.listId, props.boardId);
      setValue('');
    }
  }
  const onNoteDelete = (noteId) => {
      props.deleteNote(noteId,props.listId, props.boardId);
  }
  const onCheck = (toggle,noteId) => {
      props.onCheckedToggle(toggle,noteId,props.listId, props.boardId);
  }
  
  return (
    <div className={m.NotesList}>
      <div className={m.NotesListBody}>
        <CloseX close={deleteNotesList} />
      <div className={m.NotesListHeader}>
        <h4>
          {props.list.title}
        </h4>
      </div>
      <form className={m.NotesForm} onSubmit={addNote}>
        <input type="text" value={value} onChange={(e)=> setValue(e.currentTarget.value)}/>
      </form>
      { props.list.notes && Object.keys(props.list.notes).map(note =>
          <Note key={note} id={note} onNoteDelete={onNoteDelete} onCheck={onCheck} note={props.list.notes[note]}/>)
      }
      </div>
      
    </div>
  );
}

export default NotesList;
