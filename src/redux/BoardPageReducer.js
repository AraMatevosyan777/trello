import { BoardApi } from '../api/api';
const SET_BOARD = 'SET_BOARD';
const SET_LISTS = 'SET_LISTS';
const SET_NEW_LIST = 'SET_NEW_LIST';
const ON_LIST_DELETE = 'ON_LIST_DELETE';
const ON_NOTE_DELETE = 'ON_NOTE_DELETE';
const SET_CHECK_TOGGLE = 'SET_CHECK_TOGGLE';

const initialState = {
    board: null,
    lists: [],
}

export const boardPageReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_BOARD:
            return{
                ...state,
                board: action.payload,

            }
        case SET_LISTS:
            return{
                ...state,
                lists: action.payload,
            }
        case SET_NEW_LIST:
            return{
                ...state,
                lists: [...state.lists, action.payload]
            }
        case ON_LIST_DELETE:
            return{
                ...state,
                lists: state.lists.filter(list => list.id !== action.listId),
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
const setLists = (payload) => ({type: SET_LISTS, payload});
const setNewList = (payload) => ({type: SET_NEW_LIST, payload});
const onListDelete = (listId) => ({type: ON_LIST_DELETE, listId});
const onNoteDelete = (id) => ({type: ON_NOTE_DELETE, id});
const setCheckToggle = (noteId) => ({type: SET_CHECK_TOGGLE, noteId});


export const requestBoard = (boardId) => async(dispatch) => {
    const response = await BoardApi.requestBoard(boardId);
    const payload = {
        title: response.data.title,
        id: boardId
    }
    dispatch(setBoard(payload));
    dispatch(requestLists(boardId));
}
const requestLists = (boardId) => async(dispatch) => {
    const response = await BoardApi.requestLists(boardId);
    if (response.data != null) {
        const payload = Object.keys(response.data).map(key => {
            return {
                ...response.data[key],
                id: key
            }
        })
        dispatch(setLists(payload))
    }
}

export const addNewList = (value) => async(dispatch, getState) => {
    let boardId = getState().boardPage.board.id;
    let list = {
        title: value,
    }
    const response = await BoardApi.addNewList(list,boardId)
    const payload = {
        ...list,
        id: response.data.name
    }
    dispatch(setNewList(payload))
}

export const deleteList= (listId) => async(dispatch, getState) => {
    let boardId = getState().boardPage.board.id;
    await BoardApi.deleteList(boardId,listId);
    dispatch(onListDelete(listId))
}


export const addNewNote = (value,listId) => async(dispatch, getState) => {
    let boardId = getState().boardPage.board.id;
    const note = {
        checked: true,
        title: value,
    }
    await BoardApi.addNewNote(boardId,listId,note);
    dispatch(requestLists(boardId))
}


export const onChecked = (listId, noteId, check) => async(dispatch, getState) => {
    let boardId = getState().boardPage.board.id;
    await BoardApi.onChecked(boardId,listId,noteId,check)
    dispatch(requestLists(boardId));
}

export const deleteNote = (listId, noteId) => async(dispatch,getState) => {
    let boardId = getState().boardPage.board.id;
    await BoardApi.deleteNote(boardId,listId,noteId);
    dispatch(requestLists(boardId))
}



