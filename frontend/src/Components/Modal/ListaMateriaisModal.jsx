import React from "react";
import styles from "./ListaMateriaisModal.module.css";
import { toast } from "react-toastify";

import Button from "../Form/Button";
import Input from "../Form/Input";

import { GlobalContext } from "../../Contexts/GlobalContext";

import { BsTrash } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { AiOutlineSave } from "react-icons/ai";

const NovaPecaModal = () => {
  const [materialData, setMaterialData] = React.useState([]);
  const [newMaterial, setNewMaterial] = React.useState(false);
  const [editMaterial, setEditMaterial] = React.useState(false);

  const [nome, setNome] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [qtdCusto, setQtdCusto] = React.useState("");
  const [unMedCusto, setUnMedCusto] = React.useState("");
  const [custo, setCusto] = React.useState("");

  const {
    getMaterialList,
    createMaterials,
    updateMaterial,
    setOpenListaMaterialModal,
    openListaMaterialModal,
    deleteMaterial,
    user,
  } = React.useContext(GlobalContext);

  // Função que atualiza o estado com a lista completa de materiais
  const getList = React.useCallback(() => {
    getMaterialList(user.id)
      .then((res) => setMaterialData(res.data))
      .catch((err) => console.log(err.message, err));
  }, [getMaterialList, user]);

  //Carregando a lista de todos os materiais ao abrir o modal
  React.useEffect(() => {
    getList();
  }, [getList]);

  //Habilita o campo para criar material
  const handleClick = () => {
    setNewMaterial(true);
  };

  //Função que salva um novo material
  const handleSave = async () => {
    let data;
    if (!nome || !qtdCusto || !unMedCusto || !custo) {
      toast.error("Preencha todos os campos");
    }

    if (!custo.includes(",") && !custo.includes(".")) {
      data = {
        nome,
        desc,
        qtdCusto,
        tipoMedida: unMedCusto.split("-")[0],
        unMedCusto: unMedCusto.split("-")[1],
        custo: Number(custo).toFixed(2),
      };
    } else {
      data = {
        nome,
        desc,
        qtdCusto,
        tipoMedida: unMedCusto.split("-")[0],
        unMedCusto: unMedCusto.split("-")[1],
        custo: custo.includes(",") ? custo.replace(",", ".") : custo,
      };
    }
    await createMaterials(data);
    setNewMaterial(false);

    setNome("");
    setDesc("");
    setQtdCusto("");
    setUnMedCusto("");
    setCusto("");

    getList();
  };

  //Edita um material
  const handleEdit = async (id) => {
    let data;
    if (!nome || !qtdCusto || !unMedCusto || !custo) {
      toast.error("Preencha todos os campos");
    }

    if (!custo.includes(",") && !custo.includes(".")) {
      data = {
        id,
        nome,
        desc,
        qtdCusto,
        tipoMedida: unMedCusto.split("-")[0],
        unMedCusto:
          unMedCusto.split("-")[1] === undefined
            ? editMaterial.med
            : unMedCusto.split("-")[1],
        custo: Number(custo).toFixed(2),
      };
    } else {
      data = {
        id,
        nome,
        desc,
        qtdCusto,
        tipoMedida: unMedCusto.split("-")[0],
        unMedCusto:
          unMedCusto.split("-")[1] === undefined
            ? editMaterial.med
            : unMedCusto.split("-")[1],
        custo: custo.includes(",") ? custo.replace(",", ".") : custo,
      };
    }

    await updateMaterial(data);

    setNome("");
    setDesc("");
    setQtdCusto("");
    setUnMedCusto("");
    setCusto("");

    setEditMaterial(false);

    getList();
  };

  React.useEffect(() => {
    if (editMaterial) {
      setNome(editMaterial.nome);
      setDesc(editMaterial.desc);
      setQtdCusto(editMaterial.qtd);
      setUnMedCusto(editMaterial.med);
      setCusto(editMaterial.custo);
    }
  }, [editMaterial]);

  //Deleta um material da lista
  const handleDelete = async (id) => {
    await deleteMaterial(id);
    getList();
  };

  //Fecha o modal ao clicar no X
  const closeModal = () => {
    setEditMaterial(false);
    setOpenListaMaterialModal(false);
    setNewMaterial(false);
  };

  return (
    <div
      className={`${styles.outterContainer} ${
        openListaMaterialModal && styles.opened
      }`}
    >
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
                    {/* <th className={styles.tableTh}>Tipo de medida</th> */}
                    <th className={styles.tableTh}>Medida</th>
                    <th className={styles.tableTh}>Custo</th>
                    <th className={styles.tableTh}>Ações</th>
                  </tr>
                </thead>

                <tbody className={styles.tableBody}>
                  {materialData.map((eachMaterial, index) => (
                    <tr key={index} className={styles.tableTr}>
                      {eachMaterial.id === editMaterial.id ? (
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
                              maxLength="20"
                              value={desc}
                              onChange={(e) => setDesc(e.target.value)}
                            />
                          </td>
                          <td>
                            <Input
                              editinput="newMat"
                              name="qtdCusto"
                              type="number"
                              min="0"
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
                              <option disabled style={{ fontWeight: "bold" }}>
                                Volume
                              </option>
                              <option value="volume-mililitros">
                                Mililitros
                              </option>
                              <option value="volume-litros">Litros</option>
                              <option disabled style={{ fontWeight: "bold" }}>
                                Peso
                              </option>
                              <option value="peso-gramas">Gramas</option>
                              <option value="peso-quilo">Quilos</option>
                              <option disabled style={{ fontWeight: "bold" }}>
                                Comprimento
                              </option>
                              <option value="comprimento-centimetros">
                                Centímetros
                              </option>
                              <option value="comprimento-metros">Metros</option>
                              <option disabled style={{ fontWeight: "bold" }}>
                                Outros
                              </option>
                              <option value="unidade-unidades">Unidades</option>
                            </select>
                          </td>
                          <td>
                            <Input
                              editinput="newMat"
                              name="custo"
                              type="number"
                              value={custo}
                              onChange={(e) => setCusto(e.target.value)}
                            />
                          </td>
                          <td className={styles.actionWrapper}>
                            <AiOutlineSave
                              size="35"
                              className={styles.action}
                              onClick={() => handleEdit(eachMaterial.id)}
                            />
                            <BsTrash
                              size="35"
                              className={styles.action}
                              style={{ marginLeft: "15px" }}
                              onClick={() => setEditMaterial(false)}
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
                              .replace(".", ",")}
                          </td>
                          <td>
                            <CiEdit
                              size="35"
                              className={styles.action}
                              onClick={() =>
                                setEditMaterial({
                                  id: eachMaterial.id,
                                  nome: eachMaterial.nome,
                                  desc: eachMaterial.desc,
                                  qtd: eachMaterial.quantidadeCusto,
                                  med: eachMaterial.unidadeMedidaCusto,
                                  custo: eachMaterial.custo,
                                })
                              }
                            />
                            <BsTrash
                              size="35"
                              style={{ marginLeft: "15px" }}
                              className={styles.action}
                              onClick={() => handleDelete(eachMaterial.id)}
                            />
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
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
                          maxLength="20"
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                        />
                      </td>
                      <td>
                        <Input
                          editinput="newMat"
                          name="qtdCusto"
                          type="number"
                          min="0"
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
                          <option disabled style={{ fontWeight: "bold" }}>
                            Volume
                          </option>
                          <option value="volume-mililitros">Mililitros</option>
                          <option value="volume-litros">Litros</option>
                          <option disabled style={{ fontWeight: "bold" }}>
                            Peso
                          </option>
                          <option value="peso-gramas">Gramas</option>
                          <option value="peso-quilo">Quilos</option>
                          <option disabled style={{ fontWeight: "bold" }}>
                            Comprimento
                          </option>
                          <option value="comprimento-centimetros">
                            Centímetros
                          </option>
                          <option value="comprimento-metros">Metros</option>
                          <option disabled style={{ fontWeight: "bold" }}>
                            Outros
                          </option>
                          <option value="unidade-unidades">Unidades</option>
                        </select>
                      </td>
                      <td>
                        <Input
                          editinput="newMat"
                          name="custo"
                          type="number"
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
                          style={{ marginLeft: "15px" }}
                          onClick={() => setNewMaterial(false)}
                        />
                      </td>
                    </tr>
                  ) : null}
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
