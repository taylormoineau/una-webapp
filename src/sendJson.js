const base = 'http://localhost:3001/';

const sendJson = (endPoint, data) =>

    fetch(base + endPoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

export default sendJson