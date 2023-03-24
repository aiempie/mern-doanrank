import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChampionContext } from "../../contexts/championContext";
import { GameContext } from "../../contexts/gameContext";
import styles from "./Classic.module.css";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: "#c0c0c0db",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "green",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
  "& input": {
    color: "#c0c0c0db",
    padding: "10px",
    "&::placeholder": {
      color: "#c0c0c0db",
    },
  },
}));

function Classic() {
  const {
    champState: { champions },
    getChamps,
  } = useContext(ChampionContext);
  const { findGame } = useContext(GameContext);
  const [game, setGame] = useState({
    gameName: "",
  });
  const [guess, setGuess] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [value, setValue] = useState(champions[0]);
  const [quote, setQuote] = useState();
  const [skill, setSkill] = useState();
  const [skin, setSkin] = useState();

  const location = useLocation().pathname.split("/")[3];

  useEffect(() => {
    findGame(location)
      .then((data) => {
        setGame(data);
        getChamps(data._id);
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const body = (
    <div className={styles.container}>
      <div className={styles.head}>
        <span>
          <div className={styles.whichWithBackground}>
            <div>
              <span>Đoán xem vị tướng trong {game.gameName} cần tìm là ai</span>
            </div>
            <div
              className={styles.itemHead}
              style={guess.length === 0 ? {} : { display: "none" }}
            >
              Nhập vào tướng bất kỳ để bắt đầu
            </div>
            <div
              className={styles.suggest}
              style={guess.length === 0 ? {} : { display: "none" }}
            >
              <div className={styles.suggestItems}>
                <div className={styles.item}>
                  <RecordVoiceOverIcon
                    sx={{
                      fontSize: 50,
                      margin: "5px",
                      color: !quote ? "#6c6c6c" : "#ffd600",
                    }}
                  />
                  <span
                    style={{
                      color: !quote ? "#6c6c6c" : "#ffd600",
                      fontSize: "0.6rem",
                    }}
                  >
                    {!quote
                      ? `Thoại sẽ mở sau ${6 - guess.length} lần thử`
                      : "#6c6c6c"}
                  </span>
                </div>
                <div className={styles.item}>
                  <LocalFireDepartmentIcon
                    sx={{
                      fontSize: 50,
                      margin: "5px",
                      color: !skill ? "#6c6c6c" : "#ffd600",
                    }}
                  />
                  <span
                    style={{
                      color: !skill ? "#6c6c6c" : "#ffd600",
                      fontSize: "0.6rem",
                    }}
                  >
                    {!skill
                      ? `Chiêu thức sẽ mở sau ${12 - guess.length} lần thử`
                      : "#6c6c6c"}
                  </span>
                </div>
                <div className={styles.item}>
                  <SmartToyIcon
                    sx={{
                      fontSize: 50,
                      margin: "5px",
                      color: !skin ? "#6c6c6c" : "#ffd600",
                    }}
                  />
                  <span
                    style={{
                      color: !skin ? "#6c6c6c" : "#ffd600",
                      fontSize: "0.6rem",
                    }}
                  >
                    {!skin
                      ? `Trang phục sẽ mở sau ${18 - guess.length} lần thử`
                      : "#6c6c6c"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </span>
      </div>
      <div className={styles.inputAnswer}>
        <Autocomplete
          id="champion"
          sx={{
            width: 360,
          }}
          value={value}
          inputValue={inputValue}
          options={champions}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{
                color: "#fff",
                backgroundColor: "#333333",
                margin: "0",
                "& > img": { mr: 2, flexShrink: 0 },
              }}
              {...props}
            >
              <img loading="lazy" width="35" src={option.image} alt="" />
              {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <CssTextField
              {...params}
              label="Nhập tên vị tướng"
              inputProps={{
                ...params.inputProps,
                autoComplete: "off", // disable autocomplete and autofill
              }}
            />
          )}
        />
      </div>
    </div>
  );

  return game.isDoanTenTuong ? (
    body
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
      }}
    >
      Game đang được phát triển, vui lòng quay lại sau
    </div>
  );
}

export default Classic;
