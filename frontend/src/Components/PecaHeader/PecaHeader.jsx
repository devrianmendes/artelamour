import React from 'react';
import styles from './PecaHeader.module.css';
import Button from '../Form/Button';

const PecaHeader = ({title, button, buttonTitle, content, ...rest}) => {

 return (
    <div className={styles.header}>
      <h1>{title}</h1>
      {button && <Button text={buttonTitle} {...rest}></Button> }
      {content && (<><h2>{content.nome}</h2> <h2></h2></>)}
    </div>
  );
};

export default PecaHeader;
