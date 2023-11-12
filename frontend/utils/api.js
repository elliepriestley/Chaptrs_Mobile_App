class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  signupUser = async (formData) => {
    try {
      const response = await fetch(`${this._baseUrl}/users`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      return new Promise.reject(error);
    }
  };
  loginUser = async (formData) => {
    try {
      const response = await fetch(`${this._baseUrl}/tokens`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      return new Promise.reject(error);
    }
  };
}

export default new Api({
  baseUrl: 'http://192.168.1.124:8080',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
