import useSessionStorage from "./useSessionStorage";
import base64 from "base-64";
import Query from "./query-builder";
import { DOMAIN } from '../variables/general';

const useFetch = endpoint => {
  const [credentials] = useSessionStorage('userData');
  const defaultHeader = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization:
      "Basic " + base64.encode(`${credentials.login}:${credentials.password}`),
  };
  const customFetch = (
    url,
    method = "GET",
    body = false,
    headers = defaultHeader
  ) => {
    const options = {
      method,
      headers
    };
    if (body) options.body = JSON.stringify(body);
    return fetch(`${DOMAIN}/${url}`, options)
      .then(response => response.json())
      .catch(err => {
        // throw new Error(err);
        return {aa: ''}
      });
  };
  const get = query => {
    const url = `${endpoint}${query ? `${query}` : ""}`;
    return customFetch(url);
  };
  
  const post = (body = false) => {
    if (!body) throw new Error("to make a post you must provide a     body");
    return customFetch(endpoint, "POST", body);
  };

  const put = (id = false, body = false) => {
    if (!id || !body)
      throw new Error("to make a put you must provide the id and the   body");
    const url = `${endpoint}/${id}`;
    return customFetch(url, "PUT", body);
  };
  const del = (id = false) => {
    if (!id)
      throw new Error("to make a delete you must provide the id and the body");
    const url = `${endpoint}/${id}`;
    return customFetch(url, "DELETE");
  };
  return {
    get,
    post,
    put,
    del
  };
};
export default useFetch;