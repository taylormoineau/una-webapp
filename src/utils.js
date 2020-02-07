export const loadJson = async endPoint => {
  try {
    const response = await fetch('/' + endPoint, {
      credentials: 'include'
    });
    if (response && !response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  } catch (error) {
    //console.error(error);
    return {error: error.message};
  }
};

export const sendJson = async (endPoint, data) => {
  try {
    const response = await fetch('/' + endPoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
      credentials: 'include'
    });
    if (response && !response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  } catch (error) {
    return {error: error.message};
  }
};

export const loadData = async (endpoint, onLoad, setError) => {
  const result = await loadJson(endpoint);
  if (result.error) {
    setError(result.error);
  } else {
    onLoad(result);
  }
};

export const assocPath = ([first, ...rest], value, data) => {
  const copy = Array.isArray(data) ? [...data] : {...data};
  copy[first] = rest.length ? assocPath(rest, value, copy[first]) : value;
  return copy;
};

export const swap = (arr, index, dir) => {
  const otherIndex = dir === 'down' ? index + 1 : index - 1;
  [arr[index], arr[otherIndex]] = [arr[otherIndex], arr[index]];
};
