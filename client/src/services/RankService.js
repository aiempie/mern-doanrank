import axios from "axios";
import { apiUrl } from "../constans";

export const fetchRank = async (gameFetch) => {
  try {
    const response = await axios
      .get(`${apiUrl}/ranks/getrank/${gameFetch}`)
      .then((res) => res.data);
    if (response.success) {
      return response.listRanks;
    }
  } catch (error) {
    if (error.response) return error.response;
    else return { success: false, message: error.message, loi: "client" };
  }
};
