import React from "react";
import styles from "./RankSelect.module.css";

function RankSelect(props) {
  const { rank, isSelect } = props;
  return (
    <>
      <div
        className={`${styles.rank_card} ${
          isSelect === rank.order ? styles.selected : ""
        }`}
      >
        <img
          className={styles.rank_img}
          src={rank.rankImage}
          alt={rank.rankName}
        />
      </div>
      {isSelect === rank.order ? (
        <span className={styles.rank_title}>{rank.rankName}</span>
      ) : (
        ""
      )}
    </>
  );
}

export default RankSelect;
