import * as React from "react";
import styles from "./draw.module.scss";

interface DrawProps {
  action(): void;
}

const Draw: React.FC<DrawProps> = ({ action }) => {
  return (
    <div className={styles.wrapper}>
      <h1>Draw!</h1>
      <button onClick={action}>Restart</button>
    </div>
  );
};

export default Draw;