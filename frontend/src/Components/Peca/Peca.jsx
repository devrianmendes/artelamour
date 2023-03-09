import React from 'react';
import styles from './Peca.module.css';

import { BsTrash } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { GlobalContext } from '../../Contexts/GlobalContext';

const Peca = ({ data }) => {
  const { id, nome, desc, hrProd, minProd, lucroDesejado } = data;
  const { setSelected, deletePeca } = React.useContext(GlobalContext);

  const handleClick = () => {
    setSelected(data);
  };

  const handleDelete = async () => {
    await deletePeca(id, nome);
  };

  return (
    <div className={styles.mainContainer} onClick={handleClick}>
      <div className={styles.field}></div>
      <div className={styles.field}>
        <h5>Nome</h5>
        <p>{nome}</p>
        <p>{desc}</p>
        <p>Valor de venda</p>
      </div>
      <div className={styles.field}>
        <h5>Tempo de produção</h5>
        <p>
          {hrProd}h:{minProd}m
        </p>
      </div>
      <div className={styles.field}>
        <h5>Lucro desejado</h5>
        <p>{lucroDesejado}%</p>
      </div>
      <div className={styles.field}>
        <h5>Ações</h5>
        <div>
          <CiEdit size="35" className={styles.action}/>
          <BsTrash size="35" onClick={handleDelete} className={styles.action} />
        </div>
      </div>
    </div>
  );
};

export default Peca;
