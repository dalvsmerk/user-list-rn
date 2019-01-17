import isEmpty from 'lodash/isEmpty';

function createApi(baseApiUrl) {
  return class Api {
    constructor() {
      ['get', 'post', 'put', 'patch', 'delete'].forEach(method => {
        this[method] = Api.base(method);
      });
    }

    static base = method => ({ url, query = {}, body }) => {
      const options = {
        method,
        body,
      };

      return new Promise((resolve, reject) => {
        const queryUrl = setUrlQuery(url, query);
        const apiUrl = `${baseApiUrl}${queryUrl}`;

        fetch(apiUrl, options)
        .then(response => response.json())
        .then(json => resolve(json.results)) // randomuser.me specific field
        .catch(error => reject(error));
      });
    }
  }
}

export function setUrlQuery(url, query = {}) {
  if (isEmpty(query)) {
    return url;
  }

  const urlQuery = Object.entries(query)
    .reduce(
      // convert query object to url encoded query
      (params, [key, value]) => `${params}${key}=${value}&`,
      '?'
    )
    .slice(0, -1); // remove last ampersand symbol

  return `${url}${urlQuery}`;
}

const Api = createApi('https://randomuser.me/api');

export default new Api();
