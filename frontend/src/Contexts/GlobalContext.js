import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { destroyCookie, setCookie } from "nookies";

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState();
  const isAuthenticated = !!user;

  //Verificadores
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const [changed, setChanged] = React.useState(false);
  const [openPecaModal, setOpenPecaModal] = React.useState(false);
  const [updatePecaModal, setUpdatePecaModal] = React.useState(false);
  const [openListaMaterialModal, setOpenListaMaterialModal] =
    React.useState(false);
  const [editMat, setEditMat] = React.useState(false);
  const isSelected = !!selected;

  // const serverIp = "http://localhost:3000";
  // const serverIp = "http://localhost:5000";
  // const serverIp = 'http://67.205.172.80:5000';
  const serverIp = 'https://apizzaria.duckdns.org:5000';

  const [arrayPecas, setArrayPecas] = React.useState([]);

  //SIGNUP E AUTH
  const signUp = async (nome, apelido, email, passw) => {
    try {
      setLoading(true);
      await axios
        .post(`${serverIp}/user`, {
          nome: nome,
          apelido: apelido,
          email: email,
          senha: passw,
        })
        .then(() => {
          toast.success("Conta criada com sucesso!");
          navigate("/");
        });
    } catch (err) {
      setLoading(false);
      console.log("Erro ao criar a conta.", err.response.data.message);
      toast.error(`Erro ao criar a conta: ${err.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async ({ email, senha }) => {
    try {
      setLoading(true);

      const response = await axios.post(`${serverIp}/session`, {
        email,
        senha,
      });
      const { id, nome, apelido, token } = response.data;

      // Guardando o token em um cookie
      setCookie(undefined, "@artelamour.token", token, {
        maxAge: 60 * 60 * 24 * 30, //Tempo pro token expirar (30 dias)
        path: "/", //Aqui diz que todas as rotas terão acesso ao cookie
      });

      setUser({
        //Guardando as informações do usuário
        id,
        nome,
        email,
      });

      //Permitindo o token ser utilizado por todas as próximas requisições
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;
      toast.success(`Bem-vindo(a), ${apelido}!`);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      toast.error(`Erro ao autenticar: ${err.response.data.message}`);
      console.log("Erro ao authenticar.", err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      destroyCookie(undefined, "@artelamour.token");
      navigate("/");
    } catch (err) {
      toast.error("Erro ao deslogar, verifique o log.");
      console.log("Erro ao deslogar.", err.response.data.message);
    }
  };

  //PEÇAS -- ADICIONADO USER NO CREATEPEÇA E GETPEÇA
  const createPeca = async (data) => {
    try {
      const newPeca = {
        nome: data.nome,
        desc: data.desc,
        hrProd: data.hrProd,
        minProd: data.minProd,
        lucroDesejado: data.lucroDesejado,
        user: user.id,
      };
      setLoading([true, "Criando nova peça..."]);
      const response = await axios.post(`${serverIp}/peca`, newPeca);

      setChanged(true);
      const { nome } = response.data;
      await getPeca();
      toast.success(`Peça ${nome} criada!`);
    } catch (err) {
      setLoading(false);
      toast.error(`Erro ao criar ${data.nome}. Verifique o log.`);
      console.log(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePeca = async (data) => {
    try {
      setLoading(true, "Atualizando informações...");
      const pecaData = {
        peca_id: data.id,
        nome: data.nome,
        desc: data.desc,
        hrProd: data.hrProd,
        minProd: data.minProd,
        lucroDesejado: data.lucroDesejado,
      };
      await axios.patch(`${serverIp}/peca/${data.id}`, pecaData);
      toast.success(`Peça ${data.nome} atualizada.`);
    } catch (err) {
      toast.error(`Erro ao atualizar ${data.nome}. Verifique o log.`);
      console.log(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePeca = async (id, nome) => {
    try {
      await axios.delete(`${serverIp}/peca/${id}/delete`, {
        data: {
          peca_id: id,
        },
      });
      setChanged(true);
      toast.success(`${nome} deletada.`);
    } catch (err) {
      toast.error(`Erro ao deletar ${nome}. Verifique o log.`);
      console.log(err.response.data.message);
    }
  };

  const getPeca = React.useCallback(
    async (user) => {
      try {
        setLoading([true, "Carregando peças..."]);

        if (!user) return;
        const response = await axios.get(`${serverIp}/peca`, {
          params: {
            user: user,
          },
        });

        return response;
      } catch (err) {
        toast.error("Erro ao carregar as peças. Verifique o log.");
        console.log(err.response.data.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  //MATERIAIS ----------------------------------------
  //Função que carrega os materiais da peça clicada
  const getMaterials = React.useCallback(async (id) => {
    //Estava sendo chamada entre 50 e 80 vezes antes de usar o callback
    try {
      setLoading([true, "Carregando materiais..."]);
      const response = await axios.get(`${serverIp}/pecaMaterial`, {
        params: {
          peca_id: id,
        },
      });

      return response;
    } catch (err) {
      toast.error("Erro ao carregar os materiais. Verifique o log.");
      console.log(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }, []);

  //Função que carrega todos os materiais registrados -- ADICIONADO USER
  const getMaterialList = React.useCallback(async (user) => {
    try {
      const res = await axios.get(`${serverIp}/material`, {
        params: {
          user: user,
        },
      });
      return res;
    } catch (err) {
      toast.error("Erro ao carregar os materiais. Verifique o log.");
      console.log(err.response.data.message);
    }
  }, []);

  //Função que cria um novo material -- ADICIONADO USER
  const createMaterials = async ({
    nome,
    desc,
    qtdCusto,
    tipoMedida,
    unMedCusto,
    custo,
  }) => {
    try {
      setLoading([true, "Salvando material..."]);
      const res = await axios.post(`${serverIp}/material`, {
        nome,
        desc,
        qtdCusto,
        tipoMedida,
        unMedCusto,
        custo,
        user: user.id,
      });

      toast.success(`${nome} registrado(a).`);
      return res;
    } catch (err) {
      setLoading(false);
      toast.success(`Erro ao registrar ${nome}. Verifique o log.`);
      console.log(`Erro ao registrar ${nome}`, err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  //Função que deleta um material
  const deleteMaterial = async (id) => {
    let matName = "";
    try {
      const res = await axios.delete(`${serverIp}/material/${id}/delete`, {
        data: {
          material_id: id,
        },
      });

      matName = res.data.nome;
      toast.success(`${matName} deletado(a).`);
      return res;
    } catch (err) {
      toast.success(`Erro ao deletar ${matName}. Verifique o log.`);
      console.log(`Erro ao registrar ${matName}`, err.response.data.message);
    }
  };

  //Função que edita um material
  const updateMaterial = async ({
    id,
    nome,
    desc,
    qtdCusto,
    unMedCusto,
    custo,
    tipoMedida,
  }) => {
    try {
      const res = await axios.put(`${serverIp}/material/${id}/update`, {
        material_id: id,
        nome: nome,
        desc: desc,
        qtdCusto: qtdCusto,
        unMedCusto: unMedCusto,
        custo: custo,
        tipoMedida: tipoMedida,
      });
      toast.success("Material atualizado.");
      return res;
    } catch (err) {
      toast.error("Erro ao atualizar material. Verifique o log.");
      console.log("Erro ao atualizar o material.", err.response.data.message);
    }
  };

  //Função que carrega os materiais usados por uma peça
  const getPecaMaterial = async (id) => {
    try {
      const res = axios.get(`${serverIp}/pecaMaterial/${id}`, {
        peca_id: id,
      });

      return res;
    } catch (err) {
      toast.error("Erro ao carregar os materiais da peça. Verifique o log.");
      console.log(
        "Não foi possível carregar os materiais da peça.",
        err.response.data.message
      );
    }
  };

  //Função que adiciona material na peça
  const updatePecaMateriais = async ({
    qtdMatUsado,
    unMedidaUsado,
    peca_id,
    material_id,
  }) => {
    const data = {
      qtdMatUsado,
      unMedidaUsado,
      peca_id,
      material_id,
    };

    try {
      const res = await axios.post(`${serverIp}/pecaMaterial`, data);
      toast.success("Peça atualizada.");
      return res;
    } catch (err) {
      toast.error("Erro ao atualizar a peça.");
      console.log("Erro ao atualizar a peça", err.response.data.message);
    }
  };

  //Função que deleta o material da peça
  const deletePecaMaterial = async (id) => {
    try {
      //  console.log(`${serverIp}/pecaMaterial/${pecaId}/delete/${matId}`)
      const res = await axios.delete(`${serverIp}/pecaMaterial/${id}`, {
        data: {
          id: id,
        },
      });

      toast.success("Material excluido da peça.");
      return res;
    } catch (err) {
      toast.error("Erro ao deletar material da peça.");
      console.log(
        "Erro ao deletar material da peça",
        err.response.data.message
      );
    }
  };

  //Função que edita um material já adicionado na peça
  const updateMaterialPeca = async ({
    id,
    qtdMatUsado,
    unMedidaUsado,
    pecaId,
  }) => {
    try {
      const res = await axios.patch(`${serverIp}/pecaMaterial/${pecaId}`, {
        id: id,
        qtdMatUsado: qtdMatUsado,
        unMedidaUsado: unMedidaUsado,
      });

      return res;
    } catch (err) {
      console.log("Erro ao atualizar o material.", err.response.data.message);
      toast.error("Erro ao atualizar o material. Verifique o log.");
    }
  };

  const uploadImg = async (data) => {
    const res = await axios.put(`${serverIp}/peca/update`, data);
    setChanged(true);
    return res;
  };

  return (
    <GlobalContext.Provider
      value={{
        serverIp,
        isSelected,
        isAuthenticated,
        user,
        loading,
        selected,
        changed,
        openPecaModal,
        updatePecaModal,
        openListaMaterialModal,
        signIn,
        signUp,
        signOut,
        arrayPecas,
        editMat,
        uploadImg,
        setLoading,
        setSelected,
        setChanged,
        setOpenPecaModal,
        setUpdatePecaModal,
        setOpenListaMaterialModal,
        setEditMat,
        setArrayPecas,
        getPeca,
        getMaterials,
        getMaterialList,
        getPecaMaterial,
        createPeca,
        deletePeca,
        createMaterials,
        deleteMaterial,
        updatePeca,
        updateMaterial,
        updatePecaMateriais,
        deletePecaMaterial,
        updateMaterialPeca,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
