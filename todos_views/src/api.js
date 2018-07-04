const API_URL = '/api/todos/';

const fetchAPI = function(api_url, obj) {
  return fetch(api_url, obj)
  .then(resp => {
    if(!resp.ok) {
      if(resp.status >= 400 && resp.status < 500) {
        return resp.json().then(data => {
          let err = {errorMessage: data.message};
          throw err;
        });
      } else {
        let err = {errorMessage: "Please try again later, server is not responding."};
        throw err;
      }
    }
    return resp.json();
  });
}

export async function getTodos() {
  return fetchAPI(API_URL);
}

export async function createTodo(val) {
  return fetchAPI(API_URL, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({name: val})
  });
}

export async function deleteTodo(id) {
  return fetchAPI(API_URL + id, {method: 'DELETE'});
}

export async function updateTodo(todo) {
  return fetchAPI(API_URL + todo._id, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({completed: !todo.completed})
  });
}