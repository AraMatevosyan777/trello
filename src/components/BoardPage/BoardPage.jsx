import React from 'react';
import m from './BoarderPage.module.css';
import AddList from './AddList';
import NotesList from './NotesList/NotesList';

const BoardPage = (props) => {
    return(
        <div className={m.BoardPage}>
            <div className={m.header}>
                <div className={m.headerTitle}>
                    <h1>
                        {props.board && props.board.title}
                    </h1>
                </div>
            </div>
            <div className={m.BoardPageContent}>
                {props.board &&  props.board.notesLists && 
                    Object.keys(props.board.notesLists).map(list => 
                    <NotesList key={list} list={props.board.notesLists[list]} 
                    listId={list} boardId={props.id} deleteNotesList={props.deleteNotesList}
                    addNewNote={props.addNewNote}
                    deleteNote={props.deleteNote}
                    onCheckedToggle={props.onCheckedToggle}/>)
                }
                <AddList addNewNoteList={props.addNewNoteList} id={props.id}/>
            </div>
        </div>
    )
}

export default BoardPage;
