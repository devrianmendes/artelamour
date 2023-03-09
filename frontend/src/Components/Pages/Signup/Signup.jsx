import React from 'react';

import { GlobalContext } from '../../../Contexts/GlobalContext';

import Button from '../../Form/Button';
import Input from '../../Form/Input';

import styles from '../../../Main.module.css';

import logoImg from '../../../img/logo.png';

import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';

const Login = () => {
  const { signUp, loading } = React.useContext(GlobalContext);
  const [nome, setNome] = React.useState('');
  const [apelido, setApelido] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [passw, setPassw] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNome(nome);
    setApelido(apelido);
    setEmail(email);
    setPassw(passw);

    if (!nome || !apelido || !email || !passw) {
      toast.warning('Preencha os dados');
      return;
    }
    await signUp(nome, apelido, email, passw);
  };

  return (
    <div className={styles.main}>
      <div>
        <img src={logoImg} alt="Logo da artelamour" />
      </div>
      <form action="" onSubmit={handleSubmit}>
        <Input
          name="nome"
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
          }}
        />
        <Input
          name="apelido"
          type="text"
          placeholder="Como podemos te chamar?"
          value={apelido}
          onChange={(e) => {
            setApelido(e.target.value);
          }}
        />
        <Input
          name="email"
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          name="passw"
          placeholder="Digite sua senha"
          value={passw}
          onChange={(e) => {
            setPassw(e.target.value);
          }}
        />
        <Button type="submit" loading={loading} text="Criar conta"></Button>
      </form>
      <Link to="/">Já possui conta? Acesse aqui.</Link>
    </div>
  );
};

export default Login;
