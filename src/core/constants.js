import base64 from "base-64";
import { DOMAIN } from '../variables/general';

const noCredentials = {
  login: "",
  password: "",
};

const credentials = sessionStorage.getItem("userData")
  ? JSON.parse(sessionStorage.getItem("userData"))
  : noCredentials;

const fetchInit = (method = "GET") => ({
  method,
  headers: {
    Authorization:
      "Basic " + base64.encode(`${credentials.login}:${credentials.password}`),
  },
});
const authFetchInit = (credentials) => ({
  method: "GET",
  headers: {
    Authorization:
      "Basic " + base64.encode(`${credentials.login}:${credentials.password}`),
  },
});

export const fetcher = (url, method, query) =>
  fetch(`${DOMAIN}${url}?${query}`, fetchInit(method)).then((res) =>
    res.json()
  );

export const authFetcher = (url, credentials) =>
  fetch(`${DOMAIN}${url}`, authFetchInit(credentials)).then((res) =>
    res
  );
