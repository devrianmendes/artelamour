import React from 'react';
import { Link } from 'react-router-dom';

import { GlobalContext } from '../../../Contexts/GlobalContext';

import Button from '../../Form/Button';
import Input from '../../Form/Input';

import styles from '../../../Main.module.css';
import logoImg from '../../../img/logo.png';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signin = () => {
  const { signIn, loading } = React.useContext(GlobalContext);
  const [email, setEmail] = React.useState('');
  const [passw, setPassw] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !passw) {
      toast.warning('Preencha os dados');
      return;
    } else {
      let data = { email: email, senha: passw };
      await signIn(data);
    }
  };

  return (
    <div className={styles.main}>
      <div>
        <img src={logoImg} alt="Logo da artelamour" />
      </div>
      <form action="" onSubmit={handleSubmit}>
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
        <Button type="submit" loading={loading} text="Acessar"></Button>
      </form>
      <Link to="/create">Crie sua conta aqui.</Link>
    </div>
  );
};

export default Signin;
