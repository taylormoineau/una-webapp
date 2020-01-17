const base = 'http://localhost:3001/';

export const loadJson = async endPoint => {
  try {
    const response = await fetch(base + endPoint);
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
    const response = await fetch(base + endPoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    if (response && !response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  } catch (error) {
    return {error: error.message};
  }
};
