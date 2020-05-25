import *as axios from 'axios';

const SET_BOARDS = 'SET_BOARDS';
const SET_NEW_BOARD = 'SET_NEW_BOARD';
const ON_DELETE_BOARD = 'ON_DELETE_BOARD'; 

const initialState = {
    boards:[],
}

export const homePageReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_BOARDS:
            return{
                ...state,
                boards: action.payload
            }
        case SET_NEW_BOARD:
            return{
                ...state,
                boards: [...state.boards, action.newBoard]
            }
        case ON_DELETE_BOARD:
            return{
                ...state,
                boards: state.boards.filter(board => board.id !== action.id)
            }
        default:
            return state
    }
}

const setBoards = (payload) => ({type: SET_BOARDS, payload});
const setNewBoard = (newBoard) => ({type: SET_NEW_BOARD, newBoard});
const onDeleteBoard = (id) => ({type: ON_DELETE_BOARD, id});

export const requestBoards = () => async(dispatch) => {
    const response = await axios.get(`https://trello-9593c.firebaseio.com/boards.json`);
    if(response.data !== null){
        const payload = Object.keys(response.data).map(key => {
        return{
            ...response.data[key],
            id: key
        }
    })
    dispatch(setBoards(payload));
    }
}
export const addNewBoard = (title) => async(dispatch) => {
    let newBoard = {
        notesLists: '',
        id: Date.now(),
        title: title
    };
    const response = await axios.post(`https://trello-9593c.firebaseio.com/boards.json`, newBoard);
    const board = {
        ...newBoard,
        id: response.data.name
    }
    dispatch(setNewBoard(board))

}
export const deleteBoard = (id) => async(dispatch) => {
    await axios.delete(`https://trello-9593c.firebaseio.com/boards/${id}.json`);
    dispatch(onDeleteBoard(id))
}
