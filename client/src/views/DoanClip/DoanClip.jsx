import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { selectGameContext } from "../../contexts/selectGameContext";
import { fetchClip } from "../../services/ClipsService";
import styles from "./DoanClip.module.css";
import CustomizedDialogs from "../../components/Dialog/OpenDialog";
import { GameContext } from "../../contexts/gameContext";
import { fetchRank } from "../../services/RankService";
import { Button, CardMedia } from "@mui/material";
import RankSelect from "../../components/RankSelect/RankSelect";
import { logClip, submitRank } from "../../services/ChooseRankService";
import NoClipDialog from "../../components/Dialog/NoClipDialog";
import { useLocation } from "react-router-dom";
import ResultClip from "../../components/Dialog/ResultClip";

function DoanClip() {
  //context
  const { selectGameState, setSelectGameState } = useContext(selectGameContext);
  const { findGame } = useContext(GameContext);
  const {
    authState: { user },
    loadUser,
  } = useContext(AuthContext);

  const [clip, setClip] = useState({});
  const location = useLocation().pathname.split("/")[2];
  const [select, setSelect] = useState(0);
  const [ranks, setRanks] = useState([
    {
      rankName: "rankName",
    },
  ]);
  const [game, setGame] = useState({
    gameName: "Game",
  });
  const [result, setResult] = useState();

  useEffect(() => {
    if (location !== selectGameState) {
      setSelectGameState(location);
      setSelect(0);
      fetchClip(location)
        .then((data) => setClip(data))
        .catch((error) => console.error(error));
      findGame(location)
        .then((data) => setGame(data))
        .catch((error) => console.error(error));
      fetchRank(location)
        .then((data) => {
          setRanks(data);
        })
        .catch((error) => console.error(error));
    } else {
      setSelect(0);
      fetchClip(selectGameState)
        .then((data) => setClip(data))
        .catch((error) => console.error(error));
      findGame(selectGameState)
        .then((data) => setGame(data))
        .catch((error) => console.error(error));
      fetchRank(selectGameState)
        .then((data) => {
          setRanks(data);
        })
        .catch((error) => console.error(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const selectRank = (e) => {
    if (e === select) {
      setSelect(0);
    } else {
      setSelect(e);
    }
  };

  const submit = () => {
    if (user.timesNumber > 0) {
      submitRank(clip._id, select, selectGameState)
        .then((data) => setResult(data))
        .then(() => loadUser())
        .catch((error) => console.error(error));
    } else {
      setResult({
        PlusScore: -2,
        message: "Bạn đã hết lượt chơi! Kiếm thêm lượt chơi để tiếp tục.",
        isNoTimes: true,
      });
    }
  };

  const refreshClipLog = () => {
    logClip(clip._id, selectGameState);
    fetchClip(selectGameState)
      .then((data) => setClip(data))
      .catch((error) => console.error(error));
    setSelect(0);
    setResult();
  };
  const refreshNoLog = () => {
    setSelect(0);
    setResult();
  };

  return (
    <div className={styles.page_view_container}>
      <div className={styles.gutter_container}>
        <aside className={styles.left_gutter}></aside>
        <div className={styles.clip_view}>
          <div className={styles.rule}>
            <CustomizedDialogs gameName={game.gameName} />
          </div>
          <h2 className={styles.score}>Điểm của bạn: {user.guessRankScore}</h2>
          {!result ? (
            <></>
          ) : (
            <>
              <ResultClip
                isOpen={true}
                result={result}
                refreshClipLog={refreshClipLog}
                refreshNoLog={refreshNoLog}
              />
            </>
          )}
          {clip.isNullClip ? (
            <>
              <NoClipDialog isOpen={true} />{" "}
            </>
          ) : (
            <>
              <div className={styles.clip_player_wrapper}>
                <div className={styles.youtube_player_wrapper}>
                  <CardMedia
                    className={styles.youtube_media}
                    component="iframe"
                    src={clip.linkClip}
                  ></CardMedia>
                </div>
              </div>
              <h4>Credit: {clip.creditBy}</h4>
              <div className={styles.ranks}>
                <div className={styles.ranks_container}>
                  {ranks.map((item, index) => {
                    return (
                      <div
                        className={styles.rank_card_wrapper}
                        onClick={() => selectRank(item.order)}
                        key={index}
                      >
                        <RankSelect rank={item} isSelect={select} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={styles.buttons_wrapper}>
                <Button
                  size="large"
                  variant="contained"
                  color="error"
                  sx={{ borderRadius: "20px", width: "clamp(75px,18vw,150px)" }}
                  onClick={() => refreshClipLog()}
                >
                  Đã Xem Clip
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  color="success"
                  sx={{ borderRadius: "20px", width: "clamp(75px,18vw,150px)" }}
                  disabled={select === 0}
                  onClick={() => submit()}
                >
                  Xác Nhận
                </Button>
              </div>
            </>
          )}
        </div>
        <aside className={styles.right_gutter}></aside>
      </div>
    </div>
  );
}

export default DoanClip;
