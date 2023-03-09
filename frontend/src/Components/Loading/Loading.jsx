import React from 'react';
import styles from './Loading.module.css'
import { BiLoaderAlt } from 'react-icons/bi';


const Loading = ({size, loadingText}) => {
  return (
    <div className={styles.loadingContainer}>
      {loadingText && <p>Carregando...</p>}
      <BiLoaderAlt color="#55C1F6" size={size} className={styles.load}/>
    </div>
  )
}

export default Loading