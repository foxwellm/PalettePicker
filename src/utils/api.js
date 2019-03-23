export const fetchData = async (path, method, data = null) => {
  let options;
  switch (method) {
    case 'DELETE':
      options = { method };
      break
    case 'GET':
      options = data;
      break
    default:
      options = {
        method,
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json'
        }
      };
  };

  const url = process.env.REACT_APP_BACKEND_URL + path;
  const response = await fetch(url, options);
  const json = await response.json();

  if (response.status === 204) {
    return
  } else if (response.ok) {
    return json;
  } else {
    throw Error(json);
  }
}