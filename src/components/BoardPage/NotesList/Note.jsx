import React from 'react';
import m from '../BoarderPage.module.css';
import { ReactComponent as Check } from '../../../assets/check.svg';
import CloseX from '../../common/closeX';
import classNames from 'classnames';

const Note = (props) => {
  const onNoteDelete = () => {
    props.onNoteDelete(props.id);
  }
  const onCheck = () => {
    let toggle = !props.note.checked
    props.onCheck(toggle,props.id);
  }

  return (
    <div className={classNames(m.note, !props.note.checked &&  m.disabledNote)}>
      <h4>
        {props.note.title}
      </h4>
      <div className={m.noteSettings}>
        <Check className={m.checkIcon} onClick={onCheck}/>
        <CloseX close={onNoteDelete}/>
      </div>
    </div>
  );
}

export default Note;
