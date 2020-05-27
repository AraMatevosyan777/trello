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
                {props.lists && props.lists.map(list => 
                    <NotesList key={list.id} list={list} 
                    deleteList={props.deleteList}
                    addNewNote={props.addNewNote}
                    deleteNote={props.deleteNote}
                    onChecked={props.onChecked}/>)
                }
                <AddList addNewList={props.addNewList}/>
            </div>
        </div>
    )
}

export default BoardPage;
