class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  signupUser = async (formData) => {
    console.log(baseUrl);
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
  createSession = async (formData, token) => {
    try {
      const response = await fetch(`${this._baseUrl}/sessions`, {
        method: 'POST',
        headers: { ...this._headers, Authorization: 'Bearer ' + token },
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
  createBook = async (formData, token) => {
    try {
      const response = await fetch(`${this._baseUrl}/books`, {
        method: 'POST',
        headers: { ...this._headers, Authorization: 'Bearer ' + token },
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
  joinSession = async (sessionId, token) => {
    try {
      const response = await fetch(
        `${this._baseUrl}/sessions/${sessionId}/join`,
        {
          method: 'PATCH',
          headers: { ...this._headers, Authorization: 'Bearer ' + token },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      return new Promise.reject(error);
    }
  };
  createBookclub = async (formData, token) => {
    try {
      const response = await fetch(`${this._baseUrl}/bookclubs`, {
        method: 'POST',
        headers: { ...this._headers, Authorization: 'Bearer ' + token },
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
  joinBookclub = async (bookclubId, token) => {
    try {
      const response = await fetch(
        `${this._baseUrl}/bookclubs/${bookclubId}/join`,
        {
          method: 'PATCH',
          headers: { ...this._headers, Authorization: 'Bearer ' + token },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      return new Promise.reject(error);
    }
  };
  getSessions = async (token) => {
    try {
      const response = await fetch(`${this._baseUrl}/sessions`, {
        headers: { ...this._headers, Authorization: 'Bearer ' + token },
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
  getBookclubs = async (token) => {
    try {
      const response = await fetch(`${this._baseUrl}/bookclubs`, {
        headers: { ...this._headers, Authorization: 'Bearer ' + token },
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
  findBooks = async (query) => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`,
      );
      const data = await res.json();
      console.log(data);
      const books = data.items.map((book) => {
        return {
          title: book.volumeInfo.title || 'No title',
          authors: book.volumeInfo.authors || [],
          published: new Date(book.volumeInfo.publishedDate) || null,
          description: book.volumeInfo.description || 'No description',
          cover_photo: book.volumeInfo.imageLinks?.thumbnail || null,
          categories: book.volumeInfo.categories || null,
          isbn: book.volumeInfo.industryIdentifiers[0].identifier || null,
        };
      });
      return books;
    } catch (error) {
      return new Promise.reject(error);
    }
  };
}

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export default new Api({
  baseUrl: baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
