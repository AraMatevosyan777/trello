import { HomeApi } from '../api/api';

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
    const response = await HomeApi.requestBoards();
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
        title: title
    };
    const response = await HomeApi.addNewBoard(newBoard);
    const board = {
        ...newBoard,
        id: response.data.name
    }
    dispatch(setNewBoard(board))

}
export const deleteBoard = (id) => async(dispatch) => {
    await HomeApi.deleteBoard(id);
    dispatch(onDeleteBoard(id))
}
