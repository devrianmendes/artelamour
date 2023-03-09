import React from 'react';
import styles from './Dashboard.module.css';

import Header from '../../Header/Header';
import DetalhePeca from '../../DetalhePeca/DetalhePeca';
import Pecas from '../../Pecas/Pecas';
import Loading from '../../Loading/Loading';

import NovaPecaModal from '../../Modal/NovaPecaModal';
import ListaMateriaisModal from '../../Modal/ListaMateriaisModal';

import { GlobalContext } from '../../../Contexts/GlobalContext';

const Dashboard = () => {
  const { openPecaModal, openListaMaterialModal, loading } =
    React.useContext(GlobalContext);

  return (
    <main className={styles.dashboard}>
      {loading && <Loading />}

      {openPecaModal && <NovaPecaModal />}
      {openListaMaterialModal && <ListaMateriaisModal />}
      <Header />
      <section className={styles.sides}>
        <section className={styles.leftSide}>
          <Pecas />
        </section>
        <aside className={styles.rightSide}>
          <DetalhePeca />
        </aside>
      </section>
    </main>
  );
};

export default Dashboard;
