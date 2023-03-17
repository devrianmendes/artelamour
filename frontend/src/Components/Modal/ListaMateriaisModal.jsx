import React from 'react';
import styles from './ListaMateriaisModal.module.css';
import { toast } from 'react-toastify';

import Button from '../Form/Button';
import Input from '../Form/Input';

import { GlobalContext } from '../../Contexts/GlobalContext';

import { BsTrash } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineSave } from 'react-icons/ai';

const NovaPecaModal = () => {
  const [materialData, setMaterialData] = React.useState([]);
  const [newMaterial, setNewMaterial] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  const [nome, setNome] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [qtdCusto, setQtdCusto] = React.useState('');
  const [unMedCusto, setUnMedCusto] = React.useState('');
  const [custo, setCusto] = React.useState('');

  const {
    getMaterialList,
    createMaterials,
    updateMaterial,
    setOpenListaMaterialModal,
    openListaMaterialModal,
    deleteMaterial,
  } = React.useContext(GlobalContext);

  // Função que atualiza o estado com a lista completa de materiais
  const getList = React.useCallback(() => {
    getMaterialList()
      .then((res) => setMaterialData(res.data))
      .catch((err) => console.log(err.message, err));
  }, [getMaterialList]);

  //Carregando a lista de todos os materiais ao abrir o modal
  React.useEffect(() => {
    getList();
  }, [getList]);

  //Habilita o campo para criar material
  const handleClick = () => {
    setNewMaterial(true);
  };

  //Função que registra um novo material
  const handleSave = async () => {
    if (!nome || !qtdCusto || !unMedCusto || !custo) {
      toast.error('Preencha todos os campos');
    } else {
      let data = {
        nome,
        desc,
        qtdCusto,
        unMedCusto,
        custo: custo.includes(',') ? custo.replace(',', '.') : null,
      };
      console.log(data);
      await createMaterials(data);
      setNewMaterial(false);

      setNome('');
      setDesc('');
      setQtdCusto('');
      setUnMedCusto('');
      setCusto('');

      getList();
    }
  };

  //Deleta um material da lista
  const handleDelete = async (id) => {
    await deleteMaterial(id);
    getList();
  };

  //Edita um material
  const handleEdit = async (id) => {
    if (!nome || !qtdCusto || !unMedCusto || !custo) {
      toast.error('Preencha todos os campos');
    } else {
      let data = {
        id,
        nome,
        desc,
        qtdCusto,
        unMedCusto,
        custo: custo.includes(',') ? custo.replace(',', '.') : null,
      };

      await updateMaterial(data);

      setNome('');
      setDesc('');
      setQtdCusto('');
      setUnMedCusto('');
      setCusto('');

      setEdit(null);

      getList();
    }
  };

    //Fecha o modal ao clicar no X
    const closeModal = () => {
      setOpenListaMaterialModal(false);
    };

  return (
    <div className={`${styles.outterContainer} ${openListaMaterialModal && styles.opened}`}>
      <div className={styles.modalWrapper}>
        <div className={styles.container}>
          <div className={`${styles.contentWrapper} `}>
            <header className={styles.modalHeader}>
              <h3>Cadastrar materiais</h3>
              <div className={styles.closeModal} onClick={closeModal}>
                <div className={styles.line1}></div>
                <div className={styles.line2}></div>
              </div>
            </header>
            <hr className={styles.row} />
            <main className={styles.modalBody}>
              <table className={styles.materialTable}>
                <thead>
                  <tr className={styles.tableTr}>
                    <th className={styles.tableTh}>Nome</th>
                    <th className={styles.tableTh}>Descrição</th>
                    <th className={styles.tableTh}>Quantidade</th>
                    <th className={styles.tableTh}>Medida</th>
                    <th className={styles.tableTh}>Custo</th>
                    <th className={styles.tableTh}>Ações</th>
                  </tr>
                </thead>

                <tbody className={styles.tableBody}>
                  {newMaterial ? (
                    <tr className={styles.tableTr}>
                      <td>
                        <Input
                          editinput="newMat"
                          name="name"
                          type="text"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                        />
                      </td>
                      <td>
                        <Input
                          editinput="newMat"
                          name="desc"
                          type="text"
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                        />
                      </td>
                      <td>
                        <Input
                          editinput="newMat"
                          name="qtdCusto"
                          type="number"
                          value={qtdCusto}
                          onChange={(e) => setQtdCusto(e.target.value)}
                        />
                      </td>
                      <td>
                        <select
                          onChange={(e) => {
                            setUnMedCusto(e.target.value);
                          }}
                        >
                          <option>Selecione...</option>
                          <option disabled style={{ fontWeight: 'bold' }}>
                            Volume
                          </option>
                          <option value="mililitros">Mililitros</option>
                          <option value="litros">Litros</option>
                          <option disabled style={{ fontWeight: 'bold' }}>
                            Peso
                          </option>
                          <option value="gramas">Gramas</option>
                          <option value="quilo">Quilos</option>
                          <option disabled style={{ fontWeight: 'bold' }}>
                            Comprimento
                          </option>
                          <option value="centimetros">Centímetros</option>
                          <option value="metros">Metros</option>
                          <option disabled style={{ fontWeight: 'bold' }}>
                            Outros
                          </option>
                          <option value="unidades">Unidades</option>
                        </select>
                      </td>
                      <td>
                        <Input
                          editinput="newMat"
                          name="name"
                          type="text"
                          value={custo}
                          onChange={(e) => setCusto(e.target.value)}
                        />
                      </td>
                      <td>
                        <AiOutlineSave
                          size="35"
                          className={styles.action}
                          onClick={handleSave}
                        />
                        <BsTrash
                          size="35"
                          className={styles.action}
                          style={{ marginLeft: '15px' }}
                          onClick={() => setNewMaterial(false)}
                        />
                      </td>
                    </tr>
                  ) : null}
                  {materialData.map((eachMaterial, index) => (
                    <tr key={index} className={styles.tableTr}>
                      {eachMaterial.id === edit ? (
                        <>
                          <td>
                            <Input
                              editinput="newMat"
                              name="name"
                              type="text"
                              value={nome}
                              onChange={(e) => setNome(e.target.value)}
                            />
                          </td>
                          <td>
                            <Input
                              editinput="newMat"
                              name="desc"
                              type="text"
                              value={desc}
                              onChange={(e) => setDesc(e.target.value)}
                            />
                          </td>
                          <td>
                            <Input
                              editinput="newMat"
                              name="qtdCusto"
                              type="number"
                              value={qtdCusto}
                              onChange={(e) => setQtdCusto(e.target.value)}
                            />
                          </td>
                          <td>
                            <select
                              onChange={(e) => {
                                setUnMedCusto(e.target.value);
                              }}
                            >
                              <option>Selecione...</option>
                              <option disabled style={{ fontWeight: 'bold' }}>
                                Volume
                              </option>
                              <option value="mililitros">Mililitros</option>
                              <option value="litros">Litros</option>
                              <option disabled style={{ fontWeight: 'bold' }}>
                                Peso
                              </option>
                              <option value="gramas">Gramas</option>
                              <option value="quilo">Quilos</option>
                              <option disabled style={{ fontWeight: 'bold' }}>
                                Comprimento
                              </option>
                              <option value="centimetros">Centímetros</option>
                              <option value="metros">Metros</option>
                              <option disabled style={{ fontWeight: 'bold' }}>
                                Outros
                              </option>
                              <option value="unidades">Unidades</option>
                            </select>
                          </td>
                          <td>
                            <Input
                              editinput="newMat"
                              name="custo"
                              type="text"
                              value={custo}
                              onChange={(e) => setCusto(e.target.value)}
                            />
                          </td>
                          <td>
                            <AiOutlineSave
                              size="35"
                              className={styles.action}
                              onClick={() => handleEdit(eachMaterial.id)}
                            />
                            <BsTrash
                              size="35"
                              className={styles.action}
                              style={{ marginLeft: '15px' }}
                              onClick={() => setEdit(null)}
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{eachMaterial.nome}</td>
                          <td>{eachMaterial.desc}</td>
                          <td>{eachMaterial.quantidadeCusto}</td>
                          <td>{eachMaterial.unidadeMedidaCusto}</td>
                          <td>
                            R$
                            {Number(eachMaterial.custo)
                              .toFixed(2)
                              .replace('.', ',')}
                          </td>
                          <td>
                            <CiEdit
                              size="35"
                              className={styles.action}
                              onClick={() => setEdit(eachMaterial.id)}
                            />
                            <BsTrash
                              size="35"
                              style={{ marginLeft: '15px' }}
                              className={styles.action}
                              onClick={() => handleDelete(eachMaterial.id)}
                            />
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </main>
            <hr className={styles.row} />
            <footer className={styles.modalFooter}>
              <Button
                text="Novo material"
                id="novoMaterial"
                onClick={handleClick}
              />
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovaPecaModal;
