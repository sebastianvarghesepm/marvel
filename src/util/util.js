import{ GET_ALL_CHARACTERS,
  GET_ALL_STORIES_BY_ID,
  GET_ALL_EVENTS_BY_ID,
  GET_ALL_SERIES_BY_ID,
  GET_CHARACTER_PROFILE_DATA_BY_ID} from '../config/urls'
import { getHash} from './helperFunctions'
import axios from 'axios';
let ts = Date.now().toString();
let hash = getHash(ts,process.env.REACT_APP_API_PRIVATEKEY,process.env.REACT_APP_API_PUBLICKEY);
let configQuery = `ts=${ts}&apikey=${process.env.REACT_APP_API_PUBLICKEY}&hash=${hash}`
export const getAllCharacters = (
    query = '',
    data = {},
    headers = {},
  ) => {
    console.log('MY QUERY',query)
    query = `?${query}&${configQuery}`
    return new Promise((resolve, reject) => {
      apiGet(GET_ALL_CHARACTERS + query, data, headers)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getAllStoriesById = (
    query = '',
    data = {},
    headers = {},
  ) => {
    query = `?${query}&${configQuery}`
    let url = GET_ALL_STORIES_BY_ID.replace('_userId',data.userId);
    return new Promise((resolve, reject) => {
      apiGet(url + query, data, headers)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getAllEventsById = (
    query = '',
    data = {},
    headers = {},
  ) => {
    query = `?${query}&${configQuery}`
    let url = GET_ALL_EVENTS_BY_ID.replace('_userId',data.userId);
    return new Promise((resolve, reject) => {
      apiGet(url + query, data, headers)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  export const getAllSeriesById = (
    query = '',
    data = {},
    headers = {},
  ) => {
    query = `?${query}&${configQuery}`
    let url = GET_ALL_SERIES_BY_ID.replace('_userId',data.userId);
    return new Promise((resolve, reject) => {
      apiGet(url + query, data, headers)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };


  export const getCharacterProfileDataById = (
    query = '',
    data = {},
    headers = {},
  ) => {
    query = `?${query}&${configQuery}`
    let url = GET_CHARACTER_PROFILE_DATA_BY_ID.replace('_userId',data.userId);
    return new Promise((resolve, reject) => {
      apiGet(url + query, data, headers)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export function apiGet(endPoint, data, headers = {}, requestOptions) {
    return apiReq(endPoint, data, 'get', headers, requestOptions);
  }

  export async function apiReq(
    endPoint,
    data,
    method,
    headers,
    requestOptions = {},
  ) {
    console.log(endPoint, 'endPoint');
  
    return new Promise(async (res, rej) => {
  
      headers = {
        ...headers,
      };
  
      if (method === 'get' || method === 'delete') {
        data = {
          ...requestOptions,
          ...data,
          headers,
        };
      }
      //
      axios[method](endPoint, data, {headers})
        .then((result) => {
          const {data} = result;
  
          if (data.status === false) {
            return rej(data);
          }
  
          return res(data);
        })
        .catch((error) => {
          if (error && error.response && error.response.status === 401) {
            console.log('erro raised', error);
            return rej(error);
          }
          if (error && error.response && error.response.data) {
            if (!error.response.data.error) {
              return rej({
                ...error.response.data,
                error: error.response.data.error || 'Network Error',
              });
            }
            return rej(error.response.data);
          } else {
            return rej({error: 'Network Error', message: 'Network Error'});
          }
          return rej(error);
        });
    });
  }
  