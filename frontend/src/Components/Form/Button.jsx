import React, { useEffect } from 'react'
import styles from './Button.module.css';
import { GlobalContext } from '../../Contexts/GlobalContext';
import { BiLoaderAlt } from 'react-icons/bi';


const Button = ({loading, text, id,...rest}) => {
  const { setOpenPecaModal, setEditMat } = React.useContext(GlobalContext);

  const handleClick = (id) => {
    
    switch(id) {
      case 'criarPeca':
        setOpenPecaModal(true);
        break;
      case 'addMatToPeca':
        setEditMat(true);
        break;
      default:
        return;
    }
  }
  
  return (
    <button
    className={styles.button}
    onClick={(e) => {handleClick(e.target.id)}}
    disabled={loading}
    id={id}
    {...rest}
    >
      {loading ? <BiLoaderAlt color="#FAFAFA" size={18} className={styles.load}/> : text}</button>

  )
}

export default Button