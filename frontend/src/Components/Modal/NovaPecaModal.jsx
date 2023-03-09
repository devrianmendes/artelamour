import React from 'react';
import styles from './NovaPecaModal.module.css';
import {toast} from 'react-toastify';

import Button from '../Form/Button';
import Input from '../Form/Input';
import Textarea from '../Form/Textarea';

import { GlobalContext } from '../../Contexts/GlobalContext';

const NovaPecaModal = () => {
  const [nome, setNome] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [hrProd, setHrProd] = React.useState('');
  const [minProd, setMinProd] = React.useState('');
  const [lucro, setLucro] = React.useState('');

  const { createPeca, loading, openPecaModal, setOpenPecaModal } =
    React.useContext(GlobalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !hrProd || !minProd || !lucro) {
      toast.error('Preencha todos os campos.');
    } else {
      let data = {
        nome: nome,
        desc: desc,
        hrProd: Number(hrProd),
        minProd: Number(minProd),
        lucroDesejado: Number(lucro),
      };
      await createPeca(data);
      setNome('');
      setDesc('');
      setHrProd('');
      setMinProd('');
      setLucro('');
      setOpenPecaModal(false);
    }
  };

  const closeModal = () => {
    setOpenPecaModal(false);
  };

  if (openPecaModal)
    return (
      <div className={styles.outterContainer}>
        <div className={styles.container}>
          <header className={styles.modalHeader}>
            <h3>Dados da peça</h3>
            <div className={styles.closeModal} onClick={closeModal}>
              <div className={styles.line1}></div>
              <div className={styles.line2}></div>
            </div>
          </header>
          <hr className={styles.row} />
          <main className={styles.modalBody}>
            <form action="" onSubmit={handleSubmit}>
              <div className={styles.modalRow}>
                <label htmlFor="nome">
                  <p>Nome da peça:</p>
                  <Input
                    name="nome"
                    type="text"
                    style={{ border: '1px solid #000' }}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </label>
              </div>
              <div className={styles.modalRow}>
                <label htmlFor="desc">
                  <p>Descrição:</p>
                  <Textarea
                    name="desc"
                    type="textarea"
                    rows="4"
                    style={{ border: '1px solid #000', resize: 'none' }}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </label>
              </div>
              <div className={styles.modalRow}>
                <label htmlFor="hrProd">
                  <p>Horas gastas:</p>
                  <Input
                    name="hrProd"
                    type="number"
                    style={{ border: '1px solid #000' }}
                    value={hrProd}
                    onChange={(e) => setHrProd(e.target.value)}
                  />
                </label>
              </div>
              <div className={styles.modalRow}>
                <label htmlFor="minProd">
                  <p>Minutos gastos:</p>
                  <Input
                    name="minProd"
                    type="number"
                    style={{ border: '1px solid #000' }}
                    value={minProd}
                    onChange={(e) => setMinProd(e.target.value)}
                  />
                </label>
              </div>
              <div className={styles.modalRow}>
                <label htmlFor="lucroDesejado">
                  <p>Lucro desejado:</p>
                  <Input
                    name="lucroDesejado"
                    type="number"
                    style={{ border: '1px solid #000' }}
                    value={lucro}
                    onChange={(e) => setLucro(e.target.value)}
                  />
                </label>
              </div>
              <Button type="submit" loading={false} text="Cadastrar Peça" />
            </form>
          </main>
        </div>
      </div>
    );
};

export default NovaPecaModal;
