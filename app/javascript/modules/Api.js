import axios from 'axios';

export const REQUEST_SUCCESS = 'ok'
export const REQUEST_ERROR = 'error'

const base_url = '/api/v1';

const path = {
  item: `${base_url}/items`,
  draft: `${base_url}/draft`,
  user: `${base_url}/users`,
  reservation: (itemToken) => `${base_url}/items/${itemToken}/reservations`,
  memorandum: (itemToken) => `${base_url}/items/${itemToken}/memorandums`,
};

const getCsrfToken = () => {
  if (!(axios.defaults.headers.common['X-CSRF-Token'])) {
    return (
      document.getElementsByName('csrf-token')[0].getAttribute('content')
    )
  } else {
    return (
      axios.defaults.headers.common['X-CSRF-Token']
    )
  }
};

const setAxiosDefaults = () => {
  axios.defaults.headers.common['X-CSRF-Token'] = getCsrfToken();
  axios.defaults.headers.common['Accept'] = 'application/json';
};

setAxiosDefaults();

const updateCsrfToken = (csrf_token) => {
  axios.defaults.headers.common['X-CSRF-Token'] = csrf_token;
};

const axiosGet = ({url}) => {
  return (
    axios.get(url)
      .then(
        response => {
          console.log('success');
          return (response);
        }
      )
      .catch(
        error => {
          console.log('error')
          return (error.response)
        }
      )
  )
};

const axiosPost = ({url, data}) => {
  return (
    axios.post(url, data)
      .then(
        response => {
          console.log('success');
          if (response.data.csrf_token) {
            updateCsrfToken(response.data.csrf_token);
          }
          return (response);
        }
      )
      .catch(
        error => {
          console.log('error')
          return (error.response)
        }
      )
  )
};

const axiosPut = ({url, data}) => {
  return (
    axios.put(url, data)
      .then(
        response => {
          console.log('success');
          if (response.data.csrf_token) {
            updateCsrfToken(response.data.csrf_token);
          }
          return (response);
        }
      )
      .catch(
        error => {
          console.log('error')
          return (error.response)
        }
      )
  )
};

const axiosDelete = ({url, data}) => {
  return (
    axios.delete(url, data)
      .then(
        response => {
          console.log('success');
          if (response.data.csrf_token) {
            updateCsrfToken(response.data.csrf_token);
          }
          return (response);
        }
      )
      .catch(
        error => {
          console.log('error')
          return (error.response)
        }
      )
  )
};

// Item
export const getItem = (itemToken) => axiosGet({url: `${path.item}/${itemToken}`});
export const deleteItem = (itemToken) => axiosDelete({url: `${path.item}/${itemToken}`});
export const createItem = (data) => axiosPost({url: `${path.item}`, data: data});
export const putItem = (data) => axiosPut({url: `${path.item}/${data.itemToken}`, data: data});
// Reservation
export const createReservation = (data) => axiosPost({url: `${path.reservation(data.item_token)}`, data: data});
export const deleteReservation = (data) => axiosDelete({
  url: `${path.reservation(data.item_token)}/${data.token}`,
  data: data
});
// Memorandum
export const createMemorandum = (data) => axiosPost({url: `${path.memorandum(data.item_token)}`, data: data});
// export const deleteMemorandum = (data) => axiosDelete({
//   url: `${path.memorandum(data.item_token)}/${data.token}`,
//   data: data
// });
export const putMemorandum = (data) => axiosPut({url: `${path.memorandum(data.item_token)}/${data.token}`, data: data});


