import React from "react";

import styles from "./NoRecords.module.css";
const NoRecords: React.FC = () => {
  return (
    <div className={styles.noRecordsContainer}>
      <p>No Notes added</p>
    </div>
  );
};

export default NoRecords;
