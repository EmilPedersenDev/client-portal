import axios from "axios";
import api from "./api/index";
import store from "../store/index";
import Cookies from "js-cookie";

const login = async (ssn) => {
  if (!ssn) return;

  const ipAddress = await axios.get("https://www.cloudflare.com/cdn-cgi/trace");
  const ipFormatted = ipAddress.data
    .split(/\r?\n/)
    .filter((x) => x.indexOf("ip=") !== -1)[0];

  if (!ipFormatted) return;

  const reqBody = {
    ip: ipFormatted.split("=")[1],
    ssn: ssn,
  };

  const { data } = await api.post("/auth", reqBody);

  const collectUser = await api.post(
    "/collect",
    { orderRef: data },
    { withCredentials: true }
  );

  if (collectUser.status === 200) {
    return collectUser.data;
  } else {
    throw new Error("Something went wrong");
  }
};

const logout = async () => {
  await api.get("/logout");
  Cookies.remove("access_token");
  store.commit("setToken", "");
};

export default {
  login,
  logout,
};
