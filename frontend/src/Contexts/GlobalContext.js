import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { destroyCookie, setCookie } from 'nookies';

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
  const [openListaMaterialModal, setOpenListaMaterialModal] =  React.useState(false);
  const [editMat, setEditMat] = React.useState(false);
  const isSelected = !!selected;
  
  const [arrayPecas, setArrayPecas] = React.useState([]);
  const [allMaterial, setAllMaterial] = React.useState([]);

  //LOGIN E AUTH
  const signUp = async (nome, apelido, email, passw) => {
    try {
      setLoading(true);
      await axios
        .post('http://localhost:7070/user/create', {
          nome: nome,
          apelido: apelido,
          email: email,
          senha: passw,
        })
        .then(() => {
          toast.success('Conta criada com sucesso!');
          navigate('/');
        });
    } catch (err) {
      setLoading(false);
      console.log('Erro ao criar a conta.', err);
      toast.error('Erro ao criar a conta.');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async ({ email, senha }) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:7070/user/auth', {
        email,
        senha,
      });
      const { id, nome, apelido, token } = response.data;

      //Guardando o token em um cookie
      setCookie(undefined, '@artelamour.token', token, {
        maxAge: 60 * 60 * 24 * 30, //Tempo pro token expirar (30 dias)
        path: '/', //Aqui diz que todas as rotas terão acesso ao cookie
      });

      setUser({
        //Guardando as informações do usuário
        id,
        nome,
        email,
      });

      //Permitindo o token ser utilizado por todas as próximas requisições
      axios.defaults.headers['Authorization'] = `Bearer ${token}`;
      toast.success(`Bem-vinda, ${apelido}!`);
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
      toast.error('Erro ao logar');
      console.log('Erro ao acessar', err);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      destroyCookie(undefined, '@artelamour.token');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  //PEÇAS
  const createPeca = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:7070/peca/create', {
        nome: data.nome,
        desc: data.desc,
        hrProd: data.hrProd,
        minProd: data.minProd,
        lucroDesejado: data.lucroDesejado,
      });

      setChanged(true);
      const { nome } = response.data;
      await getPeca();
      toast.success(`Peça ${nome} criada!`);
    } catch (err) {
      setLoading(false);
      toast.error(`Erro ao criar ${data.nome}.`);
      console.log('Erro ao criar a peça', err);
    } finally {
      setLoading(false);
    }
  };

  const deletePeca = async (id, nome) => {
    try {
      setLoading(true);
      await axios.delete('http://localhost:7070/peca/delete', {
        data: {
          peca_id: id,
        },
      });
      setChanged(true);
      toast.success(`${nome} deletada.`);
    } catch (err) {
      setLoading(false);
      toast.error(`Erro ao deletar ${nome}.`);
      console.log('Erro ao deletar a peça', err);
    } finally {
      setLoading(false);
    }
  };

  const getPeca = React.useCallback(async () => {
    // Função que carrega a lista de todas as peças
    // Ela tá sendo executada duas vezes quando chamada, não sei o porque
    // Antes de usar o useCallback, estava sendo chamada mais de duas vezes (quando passado a função como dependencia no useEffect que chama ela)
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:7070/peca/list');
      return response;
    } catch (err) {
      console.log('Erro ao carregar as peças', err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  //MATERIAIS ----------------------------------------
  //Função que carrega os materiais da peça clicada
  const getMaterials = React.useCallback(async (id) => {
    //Estava sendo chamada entre 50 e 80 vezes antes de usar o callback
    try {
      setLoading(true);
      const response = await axios.get(
        'http://localhost:7070/pecaMaterial/list',
        {
          params: {
            peca_id: id,
          },
        },
      );
      return response;
    } catch (err) {
      console.log('Erro ao carregar os materiais', err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  //Função que carrega todos os materiais registrados
  const getMaterialList = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:7070/material/list');
      return res;
    } catch (err) {
      setLoading(false);
      console.log('Erro ao carregar a lista de materiais', err);
    } finally {
    }
  }, []);

  //Função que cria um novo material
  const createMaterials = async ({
    nome,
    desc,
    qtdCusto,
    unMedCusto,
    custo,
  }) => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:7070/material/create', {
        nome,
        desc,
        qtdCusto,
        unMedCusto,
        custo,
      });

      toast.success(`${nome} registrado(a).`)
      return res;
    } catch (err) {
      setLoading(false);
      toast.success(`Erro ao registrar ${nome}.`)
      console.log(`Erro ao registrar ${nome}`, err);
    } finally {
      setLoading(false);
    }
  };

  //Função que deleta um material
  const deleteMaterial = async (id) => {
    let matName = '';
    try {
      setLoading(true);
      const res = await axios.delete('http://localhost:7070/material/delete', {
        data: {
          material_id: id,
        },
      });
      matName = res.data.nome;
      toast.success(`${matName} deletado(a).`);
      return res;
    } catch (err) {
      setLoading(false);
      toast.error(`Erro ao deletar ${matName}.`)
      console.log(`Erro ao deletar ${matName}`, err);
    } finally {
      setLoading(false);
    }
  };

  //Função que edita um material
  const updateMaterial = async ({id, nome, desc, qtdCusto, unMedCusto, custo}) => {
    try {
      setLoading(true);
      const res = await axios.put('http://localhost:7070/material/update', {
        material_id: id,
        nome: nome,
        desc: desc,
        qtdCusto: qtdCusto,
        unMedCusto: unMedCusto,
        custo: custo
      });
      toast.success('Material atualizado.');
      return res;
    } catch (err) {
      setLoading(false);
      toast.success('Erro ao atualizar material.');
      console.log('Erro ao editar o material.', err);
    } finally {
      setLoading(false);
    }
  }

  //Função que carrega os materiais usados por uma peça
  const getPecaMaterial = async (id) => {
    try {
      const res = axios.get('http://localhost:7070/pecaMaterial/list', {
        peca_id: id
      })

      return res;
    } catch (err) {
      console.log('Não foi possível carregar os materiais da peça.', err)
    } finally {

    }
  }

  //Função que adciona material na peça
  const updatePecaMateriais = async ({qtdMatUsado, unMedidaUsado, peca_id, material_id}) => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:7070/pecaMaterial/create', {
        qtdMatUsado: qtdMatUsado,
        unMedidaUsado: unMedidaUsado,
        peca_id: peca_id,
        material_id: material_id
      });

      setLoading(false);
      toast.success('Peça atualizada.');
      return res;
    } catch (err) {
      setLoading(false);
      toast.success('Erro ao atualizar a peça.')
      console.log('Erro ao atualizar a peça', err)
    } finally {
      setLoading(false);
    }
  }

  //Função que deleta o material da peça
  const deletePecaMaterial = async (id) => {
    try {
      setLoading(true);
      const res = await axios.delete('http://localhost:7070/pecaMaterial/delete', {
          data: {
            id: id
          }
      })

      setLoading(false);
      toast.success('Peça atualizada.');
      return res;
    } catch (err) {
      setLoading(false);
      toast.success('Erro ao atualizar a peça.')
      console.log('Erro ao atualizar a peça', err)
    } finally {
      setLoading(false);
    }
  }

  const updateMaterialPeca = async ({id, qtdMatUsado, unMedidaUsado}) => {
    try {
      const res = await axios.put('http://localhost:7070/pecaMaterial/update', {
        id: id,
        qtdMatUsado: qtdMatUsado,
        unMedidaUsado: unMedidaUsado
      })

      return res;
    } catch (err) {
      
    } finally {

    }
  }

  return (
    <GlobalContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        setLoading,
        signIn,
        signUp,
        signOut,
        setSelected,
        selected,
        isSelected,
        changed,
        setChanged,
        openPecaModal,
        setOpenPecaModal,
        openListaMaterialModal,
        setOpenListaMaterialModal,
        createPeca,
        getPeca,
        deletePeca,
        getMaterials,
        getMaterialList,
        createMaterials,
        deleteMaterial,
        updateMaterial,
        setArrayPecas,
        arrayPecas,
        editMat,
        setEditMat,
        getPecaMaterial,
        updatePecaMateriais,
        deletePecaMaterial,
        updateMaterialPeca
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};