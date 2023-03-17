import axios from "axios";
import { apiUrl } from "../constans";

export const submitRank = async (clipId, chooseOrder, game_id) => {
  try {
    const response = await axios
      .post(`${apiUrl}/submitclip/`, {
        _id: clipId,
        chooseOrder,
      })
      .then((res) => res.data);
    if (response.success) {
      logClip(clipId, game_id);
      return response;
    }
  } catch (error) {
    if (error.response) return error.response;
    else return { success: false, message: error.message, loi: "client" };
  }
};

export const logClip = (clipId, game_id) => {
  const arrClipId = JSON.parse(localStorage.getItem(game_id)) || [];
  const isExist = arrClipId.includes(clipId);
  if (!isExist) {
    arrClipId.push(clipId);
    const arrClipIdToString = JSON.stringify(arrClipId);
    localStorage.setItem(game_id, arrClipIdToString);
  }
};
