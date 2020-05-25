import React from 'react';
import m from './common.module.css';

const CloseX = (props) => <span className={m.closeX} onClick={props.close}>&times;</span>
export default CloseX;