import *as axios from 'axios';

const instance = axios.create({
    baseURL: (`https://trello-9593c.firebaseio.com/`),
})

export const HomeApi = {
    requestBoards(){
        return instance.get(`boards.json`)
    },
    addNewBoard(newBoard){
        return instance.post(`boards.json`,newBoard)
    },
    deleteBoard(id){
        return instance.delete(`boards/${id}.json`)
    }
}

export const BoardApi = {
    requestBoard(id){
        return instance.get(`boards/${id}.json`)
    },
    requestLists(boardId){
        return instance.get(`boards/${boardId}/lists.json`)
    },
    addNewList(list,boardId){
        return instance.post(`boards/${boardId}/lists.json`,list)
    },
    deleteList(boardId,listId){
        return instance.delete(`boards/${boardId}/lists/${listId}.json`);
    },
    addNewNote(boardId,listId,note){
        return instance.post(`boards/${boardId}/lists/${listId}/notes.json`, note);
    },
    onChecked(boardId,listId,noteId,check){
        return instance.put(`boards/${boardId}/lists/${listId}/notes/${noteId}/checked.json`, check);
    },
    deleteNote(boardId,listId,noteId){
        return instance.delete(`boards/${boardId}/lists/${listId}/notes/${noteId}.json`);
    }
}