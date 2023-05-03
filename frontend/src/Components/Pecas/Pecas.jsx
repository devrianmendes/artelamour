import React from 'react';
import PecaHeader from '../PecaHeader/PecaHeader';
import Peca from '../Peca/Peca';
import { GlobalContext } from '../../Contexts/GlobalContext';

const Pecas = () => {
  const { getPeca, changed, setChanged, setArrayPecas, arrayPecas, user } =
    React.useContext(GlobalContext);

  // Pegando todas as peças cadastradas no primeiro render
  React.useEffect(() => {
    getPeca(user.id)
      .then((res) => setArrayPecas(res.data))
      .catch((err) => console.log(err));
  }, [getPeca, setArrayPecas, user]);

  //Atualizando a lista de peça ao criar ou deletar uma
  React.useEffect(() => {
    if (changed) {
      getPeca(user.id)
        .then((res) => setArrayPecas(res.data))
        .catch((err) => console.log(err));
    }
    setChanged(false);
  }, [changed, setChanged, getPeca, setArrayPecas, user]);

  return (
    <div>
      <PecaHeader
        title="Minhas peças"
        button={true}
        buttonTitle={'Criar nova peça'}
        id="criarPeca"
      />

      <div>
        {arrayPecas.map((eachData, index) => (
          <Peca data={eachData} key={index}/>
        ))}
      </div>
    </div>
  );
};

export default Pecas;
