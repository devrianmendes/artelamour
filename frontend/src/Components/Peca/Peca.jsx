import React from 'react';
import styles from './Peca.module.css';

import { BsTrash } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { FcAddImage } from 'react-icons/fc';
import { GlobalContext } from '../../Contexts/GlobalContext';

const Peca = ({ data }) => {
  const { id, nome, desc, hrProd, minProd, lucroDesejado } = data;
  const { setSelected, deletePeca, uploadImg } = React.useContext(GlobalContext);
  const [fileUrl, setFileUrl] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [imageOptions, setImageOptions] = React.useState(false);

  const handleClick = () => {
    setSelected(data);
  };

  const handleDelete = async () => {
    await deletePeca(id, nome);
  };

  const handleImage = () => {
    setImageOptions(!imageOptions);
  };

  const handleFile = (e) => {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === 'image/jpg' || image.type === 'image/png') {
      setFile(image);
      setFileUrl(URL.createObjectURL(image));
    }

    const data = new FormData();
    data.append('peca_id', id);
    data.append('nome', nome);
    data.append('desc', desc);
    data.append('hrProd', hrProd);
    data.append('minProd', minProd);
    data.append('lucroDesejado', lucroDesejado);
    data.append('file', image);

    uploadImg(data);
  };

  return (
    <div
      className={styles.mainContainer}
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <div className={styles.field} onClick={(e) => handleImage(e)}>
        <label
          htmlFor="sendFile"
          className={styles.upload}
          onClick={(e) => handleImage(e)}
        >
          <input
            type="file"
            id="sendFile"
            accept="image/png, image/jpg"
            onChange={(e) => handleFile(e)}
            hidden
          />
          {fileUrl ? (
            <img src={fileUrl} alt="Foto da peça" className={styles.preview} />
          ) : (
            <FcAddImage className={styles.uploadImg} />
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
