import React from 'react';
import m from './common.module.css';

const Error = (props) => <div className={m.error}>{props.error}</div>
export default Error;