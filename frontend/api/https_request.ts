var axios = require("axios");
const url = "http://localhost:8080/api";

type ITypeApi = {
  path: string;
  body?: any;
};

const api = {
  async post({ path, body }: ITypeApi) {
    let payload;
    await axios
      .post(`${url}${path}`, body)
      .then(function (response: { data: any }) {
        payload = response.data;
      })
      .catch(function (error: any) {
        console.log(error);
      });
    return payload;
  },

  async get({ path }: ITypeApi) {
    let payload;
    await axios
      .get(`${url}${path}`)
      .then(function (response: { data: any }) {
        payload = response.data;
      })
      .catch(function (error: any) {
        console.log(error);
      });
    return payload;
  },
};

export default api;
