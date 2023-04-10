import React from 'react';
import styles from './Peca.module.css';

import { BsTrash } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { FcAddImage } from 'react-icons/fc';
import { GlobalContext } from '../../Contexts/GlobalContext';

const Peca = ({ data }) => {
  const { id, nome, desc, hrProd, minProd, lucroDesejado } = data;
  const { setSelected, deletePeca, uploadImg } = React.useContext(GlobalContext);

  const handleClick = () => {
    setSelected(data);
  };

  const handleDelete = async () => {
    await deletePeca(id, nome);
  };

  const handleFile = (e) => {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if (!image) {
      return;
    }

    const newData = new FormData();
    newData.append('peca_id', id);
    newData.append('nome', nome);
    newData.append('desc', desc);
    newData.append('hrProd', hrProd);
    newData.append('minProd', minProd);
    newData.append('lucroDesejado', lucroDesejado);
    newData.append('file', image);

    uploadImg(newData);
  };

  return (
    <div
      className={styles.mainContainer}
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <div className={styles.field}>
        <label className={styles.upload}>
          <input type="file" id="sendFile" accept="image/png, image/jpg" onChange={(e) => handleFile(e)} hidden/>
          {typeof(data.banner) !== 'string' && data.banner === '' ? (
            <FcAddImage className={styles.uploadImg} />
            ) : (
            <img src={`http://localhost:7070/images/${data.banner}`} alt="Foto da peça" className={styles.preview} />
          )}
        </label>
      </div>
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
          <CiEdit size="35" className={styles.action} />
          <BsTrash size="35" onClick={handleDelete} className={styles.action} />
        </div>
      </div>
    </div>
  );
};

export default Peca;
