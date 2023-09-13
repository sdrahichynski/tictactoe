import * as React from "react";
import styles from "./winner.module.scss";

interface WinnerProps {
  name: string;
  action(): void;
}

const Winner: React.FC<WinnerProps> = ({ name, action }) => {
  return (
    <div className={styles.wrapper}>
      <h1>Winner: {name}</h1>
      <button onClick={() => action()}>Restart</button>
    </div>
  );
};

export default Winner;