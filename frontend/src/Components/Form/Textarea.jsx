import React from 'react';
import styles from './Textarea.module.css';

const Textarea = ({...rest}) => {
  return (
    <textarea className={styles.inputTextarea} {...rest}/>
  )
}

export default Textarea