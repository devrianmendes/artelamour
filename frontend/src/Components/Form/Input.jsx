import React from 'react';
import styles from './Input.module.css';
import { BsEye } from 'react-icons/bs';

const Input = ({ ...rest }) => {
  const [eye, setEye] = React.useState(false);
  const [style, setStyle] = React.useState(false);
  const [type, setType] = React.useState('password');
  const [toggle, setToggle] = React.useState(false);

  const { value, name, editinput } = { ...rest };

  //Aqui define se o campo do olho irá ser rederizado ou não dependendo do tipo do input
  React.useEffect(() => {
    if (name === 'passw') {
      setEye(true);
    }
  }, [name]);

  //Aqui irá renderizar o olho apenas se tiver algo escrito na senha
  React.useEffect(() => {
    const { length } = value;
    if (name === 'passw' && length >= 1) {
      setStyle({ opacity: 1, transition: '.3s' });
    }
    if (length < 1) {
      setStyle({ opacity: 0, transition: '.3' });
    }
  }, [value, name]);

  //Aqui muda o controlador para a função abaixo
  const handleClick = () => {
    setToggle(!toggle);
  };

  // Aqui vai mudar o tipo do input de senha pra texto caso o olho seja clicado e mostrar a senha escrita
  React.useEffect(() => {
    if (!toggle) {
      setType('password');
    } else {
      setType('text');
    }
  }, [toggle]);

  return (
    <>
      {eye ? (
        <div className={styles.passwInput}>
          <input className={styles.inputText} type={type} {...rest} />
          <BsEye
            size="20"
            color="#55C1F6"
            style={style}
            onClick={handleClick}
          />
        </div>
      ) : (
        <input
          className={
            editinput === 'newMat' ? styles.modalInput : styles.inputText
          }
          {...rest}
        />
      )}
    </>
  );
};

export default Input;
