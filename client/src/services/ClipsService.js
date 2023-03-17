import axios from "axios";
import { apiUrl } from "../constans";

export const fetchClip = async (gameFetch) => {
  const arrClipId = JSON.parse(localStorage.getItem(gameFetch)) || [];
  try {
    const response = await axios
      .post(`${apiUrl}/clips/getclip/`, {
        game_id: gameFetch,
        takenIds: arrClipId,
      })
      .then((res) => res.data);
    if (response.isNullClip) {
      return { isNullClip: true };
    }
    if (response.success) {
      return response.clip;
    }
  } catch (error) {
    if (error.response) return error.response;
    else return { success: false, message: error.message, loi: "client" };
  }
};
