import { DOMAIN } from '../variables/general';
import base64 from "base-64";

const handleFetch = ({login, password}) => {
  return fetch(`${DOMAIN}/auth`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Basic " +
            base64.encode(`${login}:${password}`),
        },
      }
    )
}

export const authLogin = (values) => {
    return handleFetch(values)
};