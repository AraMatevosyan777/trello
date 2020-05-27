import React, { useState } from 'react';
import m from './BoarderPage.module.css';
import CloseX from '../common/closeX';
import Error from '../common/Error';

const AddList = (props) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const addNote = () => {
        if(value.trim()){
            if(value.length > 20){
                setError('Max length is 20 symbols');
              }else{
                props.addNewList(value)
                setEditMode(false);
                setValue('');
                setError('');
              }
        }else{
            setError('giv me a name!');
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
                    <input value={value} onChange={(e)=> setValue(e.currentTarget.value)} autoFocus='on'/>
                    {error && <Error error={error}/>}
                </form>
               :<div className={m.AddListItem} onClick={()=> setEditMode(true)}>Add list...</div>
            }
            
        </div>
    )
}

export default AddList;
