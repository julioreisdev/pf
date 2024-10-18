import axios from "axios";

export async function fetcher(url) {
  return axios
    .get(url, {})
    .then((res) => res.data)
    .catch((err) => {
      return err.response.status;
    });
}
