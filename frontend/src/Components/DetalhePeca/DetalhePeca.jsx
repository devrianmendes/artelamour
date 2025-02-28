import React, { useEffect } from "react";
import styles from "./DetalhePeca.module.css";
import { toast } from "react-toastify";
import { GlobalContext } from "../../Contexts/GlobalContext";

import { CiEdit } from "react-icons/ci";
import { BsTrash } from "react-icons/bs";
import { AiOutlineSave } from "react-icons/ai";

import PecaHeader from "../PecaHeader/PecaHeader";
import Input from "../Form/Input";

import { possibleOptions } from "../../constants/possibleOptions";

const DetalhePeca = () => {
  const {
    getMaterials,
    getMaterialList,
    selected,
    isSelected,
    arrayPecas,
    editMat,
    setEditMat,
    deletePecaMaterial,
    updatePecaMateriais,
    updateMaterialPeca,
    user,
  } = React.useContext(GlobalContext);

  const [arrayMaterials, setArrayMaterials] = React.useState([]);

  const [edit, setEdit] = React.useState(false);
  const [selectList, setSelectList] = React.useState([]);
  const [peca, setPeca] = React.useState("");
  const [qtdMatUsado, setQtdMatUsado] = React.useState("");
  const [unMedidaUsado, setUnMedidaUsado] = React.useState("Selecione...");
  const [newMat, setNewMat] = React.useState({});
  const [options, setOptions] = React.useState([]);

  const unitConversions = {
    mililitros: 1,
    litros: 1000,
    gramas: 1,
    quilos: 1000,
    centimetros: 1,
    metros: 100,
    unidades: 1,
  };

  const calcConsumo = (eachMaterial) => {
    const qntComprada = eachMaterial.material.quantidadeCusto.includes(",")
      ? Number(eachMaterial.material.quantidadeCusto.replace(",", "."))
      : Number(eachMaterial.material.quantidadeCusto);

    const valorComprado = Number(eachMaterial.material.custo);

    const fatorCompra =
      unitConversions[eachMaterial.material.unidadeMedidaCusto.toLowerCase()];
    const fatorUso = unitConversions[eachMaterial.unMedidaUsado.toLowerCase()];

    const qntCompradaBase = qntComprada * fatorCompra;
    const qtdMatUsadoBase = eachMaterial.qtdMatUsado * fatorUso;

    const calcValorGasto = (valorComprado / qntCompradaBase) * qtdMatUsadoBase;

    return calcValorGasto;
  };

  let calcConsumoTotal = arrayMaterials.reduce(
    (acc, curr) => {
      const materialCusto = Number(calcConsumo(curr).toFixed(2));

      return {
        custoTotal: acc.custoTotal + materialCusto,
        materiais: [
          ...acc.materiais,
          { ...curr, custo: materialCusto.toFixed(2) },
        ],
      };
    },
    { custoTotal: 0, materiais: [] }
  );

  //Função que carrega a lista de todos os materiais para aparecer no select
  const getList = React.useCallback(() => {
    getMaterialList(user.id)
      .then((res) => setSelectList(res.data))
      .catch((err) => console.log(err.message, err));
  }, [getMaterialList, user]);

  //Carrega a lista de materiais registrados ao clicar para adicionar um material a peça
  React.useEffect(() => {
    editMat && getList();
  }, [editMat, getList]);

  //Função que atualiza a lista de materiais usados na peça
  const getMatList = async (id) => {
    getMaterials(id)
      .then((res) => setArrayMaterials(res.data))
      .catch((err) => console.log(err.message, err));
  };

  //Carrega os materiais da peça inicial ou da selecionada
  React.useEffect(() => {
    const main = async () => {
      if (arrayPecas.length === 0) return;
      if (!isSelected) {
        const res = await getMaterials(arrayPecas[0].id);
        setPeca(arrayPecas[0]);
        setArrayMaterials(res.data);
      } else {
        const res = await getMaterials(selected.id);
        const selectedPeca = arrayPecas.find(
          (eachPeca) => eachPeca.id === selected.id
        );
        if (selectedPeca) {
          setPeca(selectedPeca);
        }

        setArrayMaterials(res.data);
      }
    };
    main();
  }, [arrayPecas, getMaterials, isSelected, selected]);

  //Adiciona um material na peça ao preencher os campos e salvar
  const addMaterialToPeca = async () => {
    if (isSelected) {
      setPeca(selected);
    } else {
      if (!peca) {
        toast.warning("Crie uma peça para adicionar materiais.");
        return;
      } else {
        toast.warning("Selecione uma peça primeiro.");
        return;
      }
    }

    let data = {
      qtdMatUsado,
      unMedidaUsado,
      peca_id: peca.id,
      material_id: newMat,
    };

    await updatePecaMateriais(data);

    getMatList(peca.id);
    setQtdMatUsado("");
    setEditMat(false);
  };

  const handleDelete = async (id) => {
    await deletePecaMaterial(id);
    getMatList(peca.id);
  };

  //Edita o material da peça
  const handleEditMat = async (id) => {
    if (
      qtdMatUsado === "" ||
      unMedidaUsado === "" ||
      unMedidaUsado === "Selecione..."
    ) {
      toast.warning("Preencha todos os campos");
    } else {
      let data = {
        id,
        qtdMatUsado,
        unMedidaUsado: unMedidaUsado,
        pecaId: peca.id,
      };

      try {
        await updateMaterialPeca(data);
        toast.success("Material atualizado.")
      } catch (err) {
        toast.error("Erro ao atualizar material. Verifique o log.");
        console.log(err.response.data.message);
      }

      setQtdMatUsado(""); //Limpando os campos de edição
      setUnMedidaUsado(""); //Limpando os campos de edição
      setEdit(false); //Fechando os campos de edição
      getMatList(peca.id);
    }
  };

  useEffect(() => {
    const opt = possibleOptions;
    const loadOptions = (item) => {
      setOptions(
        opt.filter((eachTeste) => eachTeste.value.startsWith(item.tipoMedida))
      );
    };

    selectList.forEach((eachItem) => {
      eachItem.id === newMat && loadOptions(eachItem);
    });
  }, [newMat, edit, selectList]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.eachContainer}>
        <PecaHeader title="Valor final da peça" button={false} content={peca} />
        <div className={styles.innerEachContainer}>
          <div>
            <h4>Custo da peça</h4>
            <p>R${calcConsumoTotal.custoTotal.toFixed(2).replace(".", ",")}</p>
          </div>
          <div>
            <h4>Valor sugerido para venda</h4>
            <p>
              {!peca
                ? "R$0,00"
                : "R$" +
                  (
                    calcConsumoTotal.custoTotal +
                    (calcConsumoTotal.custoTotal * peca.lucroDesejado) / 100
                  )
                    .toFixed(2)
                    .replace(".", ",")}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.eachContainer}>
        <PecaHeader
          title="Materiais usados na peça"
          button={true}
          buttonTitle="Adicionar material"
          id="addMatToPeca"
        />
        <div className={styles.innerEachContainer}>
          <table className={styles.materialTable}>
            <thead>
              <tr className={styles.tableTr}>
                <th className={styles.tableTh}>Nome</th>
                <th className={styles.tableTh}>Quantidade</th>
                <th className={styles.tableTh}>Un. de medida</th>
                <th className={styles.tableTh}>Custo por peça</th>
                <th className={styles.tableTh}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {editMat ? (
                //Essa parte é quando está adicionando um novo material na peça
                <tr className={styles.materialContent}>
                  <td>
                    <select
                      onChange={(e) => {
                        setNewMat(e.target.value);
                      }}
                    >
                      <option>Selecione...</option>
                      {selectList.map((eachMat, index) => (
                        <option value={eachMat.id} key={index}>
                          {eachMat.nome}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <Input
                      editinput="newMat"
                      name="qtdMatUsado"
                      type="number"
                      min="0"
                      value={qtdMatUsado}
                      onChange={(e) => setQtdMatUsado(e.target.value)}
                    />
                  </td>
                  <td>
                    <select
                      onChange={(e) => {
                        setUnMedidaUsado(e.target.value);
                      }}
                    >
                      <option default>Selecione...</option>
                      {options.length > 0 &&
                        options.map((eachOptions, index) => (
                          <option key={index} value={eachOptions.label}>
                            {eachOptions.label}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td> </td>
                  <td>
                    <AiOutlineSave
                      className={styles.action}
                      size="35"
                      onClick={() => {
                        addMaterialToPeca();
                      }}
                    />
                    <BsTrash
                      className={styles.action}
                      size="35"
                      // style={{ marginLeft: "15px" }}
                      onClick={() => setEditMat(false)}
                    />
                  </td>
                </tr>
              ) : null}
              {/* Aqui é editando um material na peça */}
              {calcConsumoTotal.materiais.map((eachMaterial, index) => (
                <tr className={styles.materialContent} key={index}>
                  {eachMaterial.id === edit ? (
                    <>
                      <td>{eachMaterial.material.nome}</td>
                      <td>
                        <Input
                          editinput="newMat"
                          name="name"
                          type="number"
                          min="0"
                          value={qtdMatUsado}
                          onChange={(e) => setQtdMatUsado(e.target.value)}
                        />
                      </td>
                      <td>
                        <select
                          onChange={(e) => {
                            setUnMedidaUsado(e.target.value);
                          }}
                        >
                          <option default>Selecione...</option>
                          {options.length > 0 &&
                            options.map((eachOptions, index) => (
                              <option key={index} value={eachOptions.label}>
                                {eachOptions.label}
                              </option>
                            ))}
                        </select>
                      </td>
                      <td>R${eachMaterial.custo.replace(".", ",")}</td>
                      <td>
                        <AiOutlineSave
                          className={styles.action}
                          size="35"
                          onClick={() => {
                            handleEditMat(eachMaterial.id);
                          }}
                        />
                        <BsTrash
                          className={styles.action}
                          size="35"
                          // style={{ marginLeft: "15px" }}
                          onClick={() => setEdit(false)}
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{eachMaterial.material.nome}</td>
                      <td>{eachMaterial.qtdMatUsado}</td>
                      <td>{eachMaterial.unMedidaUsado}</td>
                      <td>R${eachMaterial.custo.replace(".", ",")}</td>
                      <td>
                        <CiEdit
                          className={styles.action}
                          size="35"
                          onClick={() => setEdit(eachMaterial.id)}
                        />
                        <BsTrash
                          className={styles.action}
                          size="35"
                          // style={{ marginLeft: "15px" }}
                          onClick={() => handleDelete(eachMaterial.id)}
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <table className={styles.materialTableMobile}>
            <tbody>
              {/* Aqui é um novo material na peça mobile */}
              {editMat ? (
                <>
                  <tr className={styles.materialContent}>
                    <td className={styles.tdTitle}>Nome</td>
                    <td>
                      <select
                        onChange={(e) => {
                          setNewMat(e.target.value);
                        }}
                      >
                        <option>Selecione...</option>
                        {selectList.map((eachMat, index) => (
                          <option value={eachMat.id} key={index}>
                            {eachMat.nome}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>Qtd. usada</td>
                    <td>
                      <Input
                        editinput="newMat"
                        name="qtdMatUsado"
                        type="number"
                        min="0"
                        value={qtdMatUsado}
                        onChange={(e) => setQtdMatUsado(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>Medida</td>
                    <td>
                      <select
                        onChange={(e) => {
                          setUnMedidaUsado(e.target.value);
                        }}
                      >
                        <option default>Selecione...</option>
                        {options.length > 0 &&
                          options.map((eachOptions, index) => (
                            <option key={index} value={eachOptions.label}>
                              {eachOptions.label}
                            </option>
                          ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.tdTitle}>Ações</td>
                    <td>
                      <AiOutlineSave
                        className={styles.action}
                        size="35"
                        onClick={() => {
                          addMaterialToPeca();
                        }}
                      />
                      <BsTrash
                        className={styles.action}
                        size="35"
                        // style={{ marginLeft: "15px" }}
                        onClick={() => setEditMat(false)}
                      />
                    </td>
                  </tr>
                </>
              ) : null}
              {calcConsumoTotal.materiais.map((eachMaterial, index) => (
                <React.Fragment key={eachMaterial.id || index}>
                  {/* Editando material já na peça mobile*/}
                  {eachMaterial.id === edit ? (
                    <>
                      <tr className={styles.materialContent}>
                        <td className={styles.tdTitle}>Nome</td>
                        <td>{eachMaterial.material.nome}</td>
                      </tr>
                      <tr>
                        <td className={styles.tdTitle}>Qtd. usada</td>
                        <td>
                          <Input
                            editinput="newMat"
                            name="name"
                            type="number"
                            min="0"
                            value={qtdMatUsado}
                            onChange={(e) => setQtdMatUsado(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.tdTitle}>Medida</td>
                        <td>
                          <select
                            onChange={(e) => {
                              setUnMedidaUsado(e.target.value);
                            }}
                          >
                            <option default>Selecione...</option>
                            {options.length > 0 &&
                              options.map((eachOptions, index) => (
                                <option key={index} value={eachOptions.label}>
                                  {eachOptions.label}
                                </option>
                              ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.tdTitle}>Custo</td>
                        <td>R${eachMaterial.custo.replace(".", ",")}</td>
                      </tr>
                      <tr>
                        <td className={styles.tdTitle}>Ações</td>
                        <td>
                          <AiOutlineSave
                            className={styles.action}
                            size="35"
                            onClick={() => {
                              handleEditMat(eachMaterial.id);
                            }}
                          />
                          <BsTrash
                            className={styles.action}
                            size="35"
                            // style={{ marginLeft: "15px" }}
                            onClick={() => setEdit(false)}
                          />
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr className={styles.materialContent} key={index}>
                        <td className={styles.tdTitle}>Nome</td>
                        <td>{eachMaterial.material.nome}</td>
                      </tr>
                      <tr>
                        <td className={styles.tdTitle}>Qtd. usada</td>
                        <td>{eachMaterial.qtdMatUsado}</td>
                      </tr>
                      <tr>
                        <td className={styles.tdTitle}>Medida</td>
                        <td>{eachMaterial.unMedidaUsado}</td>
                      </tr>
                      <tr>
                        <td className={styles.tdTitle}>Custo</td>
                        <td>R${eachMaterial.custo.replace(".", ",")}</td>
                      </tr>
                      <tr>
                        <td className={styles.tdTitle}>Ações</td>
                        <td>
                          <CiEdit
                            className={styles.action}
                            size="35"
                            onClick={() => setEdit(eachMaterial.id)}
                          />
                          <BsTrash
                            className={styles.action}
                            size="35"
                            // style={{ marginLeft: "15px" }}
                            onClick={() => handleDelete(eachMaterial.id)}
                          />
                        </td>
                      </tr>
                    </>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetalhePeca;
