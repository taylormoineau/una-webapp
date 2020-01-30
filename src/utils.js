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
