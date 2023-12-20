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
  createSessionNote = async (formData, sessionId, token) => {
    try {
      const response = await fetch(
        `${this._baseUrl}/sessions/${sessionId}/notes`,
        {
          method: 'POST',
          headers: { ...this._headers, Authorization: 'Bearer ' + token },
          body: JSON.stringify(formData),
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
  deleteSessionNote = async (noteId, sessionId, token) => {
    try {
      const response = await fetch(
        `${this._baseUrl}/sessions/${sessionId}/notes/${noteId}`,
        {
          method: 'DELETE',
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
  updateSessionNote = async (formData, noteId, sessionId, token) => {
    try {
      const response = await fetch(
        `${this._baseUrl}/sessions/${sessionId}/notes/${noteId}`,
        {
          method: 'PATCH',
          headers: { ...this._headers, Authorization: 'Bearer ' + token },
          body: JSON.stringify(formData),
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
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&maxResults=40&langRestrict=en`,
      );
      const data = await res.json();
      // console.log(data.items);
      let books = [];
      data.items.forEach((book) => {
        books.push({
          googleId: book.id,
          title: book.volumeInfo.title || 'No title',
          authors: book.volumeInfo.authors || [],
          published: new Date(book.volumeInfo.publishedDate) || null,
          description: book.volumeInfo.description || 'No description',
          cover_photo: book.volumeInfo.imageLinks?.thumbnail || null,
          categories: book.volumeInfo.categories || null,
          isbn: book.volumeInfo.industryIdentifiers
            ? book.volumeInfo.industryIdentifiers[0].identifier
            : null,
        });
      });
      console.log('books', books);
      return books;
    } catch (error) {
      return new Promise.reject(error);
    }
  };
  editUserInfo = async (userId, formData, token) => {
    try {
      const response = await fetch(`${this._baseUrl}/users/${userId}`, {
        method: 'PATCH',
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
}

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export default new Api({
  baseUrl: baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const test = {
  accessInfo: {
    accessViewStatus: 'SAMPLE',
    country: 'GB',
    embeddable: true,
    epub: {
      acsTokenLink:
        'http://books.google.co.uk/books/download/The_Alchemist-sample-epub.acsm?id=2aA4EAAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
      isAvailable: true,
    },
    pdf: {
      acsTokenLink:
        'http://books.google.co.uk/books/download/The_Alchemist-sample-pdf.acsm?id=2aA4EAAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
      isAvailable: true,
    },
    publicDomain: false,
    quoteSharingAllowed: false,
    textToSpeechPermission: 'ALLOWED',
    viewability: 'PARTIAL',
    webReaderLink:
      'http://play.google.com/books/reader?id=2aA4EAAAQBAJ&hl=&source=gbs_api',
  },
  etag: 'Eip3jq2vNOc',
  id: '2aA4EAAAQBAJ',
  kind: 'books#volume',
  saleInfo: {
    buyLink:
      'https://play.google.com/store/books/details?id=2aA4EAAAQBAJ&rdid=book-2aA4EAAAQBAJ&rdot=1&source=gbs_api',
    country: 'GB',
    isEbook: true,
    listPrice: { amount: 0.18, currencyCode: 'GBP' },
    offers: [[Object]],
    retailPrice: { amount: 0.18, currencyCode: 'GBP' },
    saleability: 'FOR_SALE',
  },
  searchInfo: {
    textSnippet:
      'Dive into the world of dark comedy with The Alchemist by Ben Jonson.',
  },
  selfLink: 'https://www.googleapis.com/books/v1/volumes/2aA4EAAAQBAJ',
  volumeInfo: {
    allowAnonLogging: false,
    authors: ['Ben Jonson'],
    canonicalVolumeLink:
      'https://play.google.com/store/books/details?id=2aA4EAAAQBAJ',
    categories: ['Fiction'],
    contentVersion: 'preview-1.0.0',
    description:
      "The Alchemist The Comedy Of Errors is one of William Shakespeare's early plays, as well as his shortest. It tells the story of two sets of identical twins that were accidentally separated at birth. Antipholus of Syracuse and his servant, Dromio of Syracuse, arrive in Ephesus, which turns out to be the home of their twin brothers, Antipholus of Ephesus and his servant, Dromio of Ephesus. When the Syracusans encounter the friends and families of their twins, a series of wild mishaps based on mistaken identities lead to wrongful beatings, a near-seduction, the arrest of Antipholus of Ephesus, and false accusations of infidelity, theft, madness, and demonic possession. Combining magic, mysticism, wisdom and wonder into an inspiring tale of self-discovery, The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations.",
    imageLinks: {
      smallThumbnail:
        'http://books.google.com/books/content?id=2aA4EAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
      thumbnail:
        'http://books.google.com/books/content?id=2aA4EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    },
    infoLink:
      'https://play.google.com/store/books/details?id=2aA4EAAAQBAJ&source=gbs_api',
    language: 'en',
    maturityRating: 'MATURE',
    pageCount: 403,
    panelizationSummary: {
      containsEpubBubbles: false,
      containsImageBubbles: false,
    },
    previewLink:
      'http://books.google.co.uk/books?id=2aA4EAAAQBAJ&printsec=frontcover&dq=The+alchemist&hl=&cd=4&source=gbs_api',
    printType: 'BOOK',
    publishedDate: '2021-01-01',
    publisher: 'BEYOND BOOKS HUB',
    readingModes: { image: true, text: true },
    subtitle:
      'Popular Books by Ben Jonson : All times Bestseller Demanding Books',
    title: 'The Alchemist',
  },
};
