import React, { useState } from 'react';
import m from './BoarderPage.module.css';
import CloseX from '../common/closeX';

const AddList = (props) => {
    const [value, setValue] = useState('');
    const [editMode, setEditMode] = useState(false);
    const addNote = () => {
        if(value.trim()){
            props.addNewNoteList(value,props.id)
            setEditMode(false);
            setValue('')
        }
    }
    const close = () => {
        setEditMode(false);
        setValue('');
    }

    return(
        <div className={m.AddList}>
            {editMode
               ?<form className={m.form} onSubmit={addNote}>
                    <CloseX close={close}/>
                    <input value={value} onChange={(e)=> setValue(e.currentTarget.value)}/>
                </form>
               :<div className={m.AddListItem} onClick={()=> setEditMode(true)}>Add list...</div>
            }
            
        </div>
    )
}

export default AddList;
