import *as axios from 'axios';
const SET_BOARD = 'SET_BOARD';
const SET_NEW_NOTES_LIST = 'SET_NEW_NOTES_LIST';
const ON_NOTES_LIST_DELETE = 'ON_NOTES_LIST_DELETE';
const SET_NEW_NOTE = 'SET_NEW_NOTE';
const ON_NOTE_DELETE = 'ON_NOTE_DELETE';
const SET_CHECK_TOGGLE = 'SET_CHECK_TOGGLE';

const initialState = {
    board: null,
}

export const boardPageReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_BOARD:
            return{
                ...state,
                board: action.payload
            }
        case SET_NEW_NOTES_LIST:
            let newNotesList = action.newNotesList
            return{
                ...state,
                board: {...state.board, 
                notesLists: {...state.board.notesLists, newNotesList}},
            }
        case ON_NOTES_LIST_DELETE:
            return{
                ...state,
                board: Object.keys(state.board.notesLists).filter(key => key !== action.id),
            }
        case SET_NEW_NOTE:
            let newNote = action.note;
            return{
                ...state,
                board: {...state.board,
                notesLists: {...state.board.notesLists,
                notes: {...state.board.notesLists.notes, newNote}}},
            }
        case ON_NOTE_DELETE:
            return{
                ...state,
                board: Object.keys(state.board.notesLists).map(list => {
                    if(state.board.notesLists[list].notes){
                         Object.keys(state.board.notesLists[list].notes).filter(note => note !== action.id)
                    }
                }),
            }
        case SET_CHECK_TOGGLE:
            return{
                ...state,
                board: Object.keys(state.board.notesLists).map(list => {
                    if(state.board.notesLists[list].notes){
                        Object.keys(state.board.notesLists[list].notes).map(note =>{
                            if(note === action.noteId){
                                return{...note, checked: !note.checked}
                            }
                            return note
                        })
                   }
                })
            }
        default:
            return state
    }
}

const setBoard = (payload) => ({type: SET_BOARD, payload});
const setNewNotesList = (newNotesList) => ({type: SET_NEW_NOTES_LIST, newNotesList});
const onNotesListDelete = (id) => ({type: ON_NOTES_LIST_DELETE, id});
const setNewNote = (note) => ({type: SET_NEW_NOTE, note});
const onNoteDelete = (id) => ({type: ON_NOTE_DELETE, id});
const setCheckToggle = (noteId) => ({type: SET_CHECK_TOGGLE, noteId});


export const requestBoard = (id) => async(dispatch) => {
    const response = await axios.get(`https://trello-9593c.firebaseio.com/boards/${id}.json`);
    dispatch(setBoard(response.data));
}
export const addNewNoteList = (value,id) => async(dispatch) => {
    let notesList = {
        title: value
    }
    const response = await axios.post(`https://trello-9593c.firebaseio.com/boards/${id}/notesLists.json`, notesList);
    const newNotesList = {
        ...notesList,
        id: response.data.name
    }
    dispatch(setNewNotesList(newNotesList))
}
export const deleteNotesList= (listId,boardId) => async(dispatch) => {
    await axios.delete(`https://trello-9593c.firebaseio.com/boards/${boardId}/notesLists/${listId}.json`);
    dispatch(onNotesListDelete(listId))
}


export const addNewNote = (value,listId, boardId) => async(dispatch) => {
    let note = {
        checked: true,
        title: value,
    }
    const response = await axios.post(`https://trello-9593c.firebaseio.com/boards/${boardId}/notesLists/${listId}/notes.json`, note);
    const newNotesList = {
        ...note,
        id: response.data.name
    }
    dispatch(setNewNote(newNotesList));
}
export const onCheckedToggle = (toggle,noteId, listId, boardId) => async(dispatch) => {
    await axios.put(`https://trello-9593c.firebaseio.com/boards/${boardId}/notesLists/${listId}/notes/${noteId}/checked.json`, toggle);
    dispatch(setCheckToggle(noteId));
}
export const deleteNote = (noteId, listId, boardId) => async(dispatch) => {
    await axios.delete(`https://trello-9593c.firebaseio.com/boards/${boardId}/notesLists/${listId}/notes/${noteId}.json`);
    dispatch(onNoteDelete(noteId));
}



