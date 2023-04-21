import React from 'react';
import styles from './Loading.module.css'
import { BiLoaderAlt } from 'react-icons/bi';
import { GlobalContext } from '../../Contexts/GlobalContext';


const Loading = () => {
  const {loading} = React.useContext(GlobalContext)
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadBox}>
        <div className={styles.boxLine}>
          <BiLoaderAlt color="#55C1F6" className={styles.load}/>
          <p>{loading[1]}</p>
        </div>

      </div>
    </div>
  )
}

export default Loading