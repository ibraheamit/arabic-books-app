import axios from 'axios';
import type { Book, GoogleBooksResponse, GoogleBookItem } from './types';

export const fetchBooksBySearch = async (query: string, maxResults = 20): Promise<Book[]> => {
  const response = await axios.get<GoogleBooksResponse>(BASE_URL, {
    params: {
      q: query,
      langRestrict: 'ar',
      maxResults,
      key: import.meta.env.VITE_GOOGLE_BOOKS_API_KEY,
    },
  });
  
  if (!response.data.items) return [];
  return response.data.items.map(normalizeBook);
};

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

const normalizeBook = (item: GoogleBookItem): Book => {
  const volumeInfo = item.volumeInfo || {};
  const saleInfo = item.saleInfo;

  return {
    id: item.id,
    title: volumeInfo.title || 'بدون عنوان',
    authors: volumeInfo.authors || ['كاتب غير معروف'],
    description: volumeInfo.description || 'لا يوجد وصف متاح.',
    thumbnail: (volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail || '').replace(/^http:/, 'https:'),
    price: saleInfo?.retailPrice ? `${saleInfo.retailPrice.amount} ${saleInfo.retailPrice.currencyCode}` : 'متاح مجاناً',
    previewLink: volumeInfo.previewLink || '',
    infoLink: volumeInfo.infoLink || '',
  };
};

export const fetchBooksBySubject = async (subject: string, maxResults = 10): Promise<Book[]> => {
  const requests = [];
  const maxPerRequest = 40;
  const numRequests = Math.ceil(maxResults / maxPerRequest);
  
  for (let i = 0; i < numRequests; i++) {
    const fetchCount = Math.min(maxResults - i * maxPerRequest, maxPerRequest);
    requests.push(
      axios.get<GoogleBooksResponse>(BASE_URL, {
        params: {
          q: `subject:${subject}`,
          langRestrict: 'ar',
          maxResults: fetchCount,
          startIndex: i * maxPerRequest,
          key: import.meta.env.VITE_GOOGLE_BOOKS_API_KEY,
        },
      }).catch(() => null)
    );
  }

  const responses = await Promise.all(requests);
  let allBooks: Book[] = [];
  
  for (const response of responses) {
    if (response?.data?.items) {
      allBooks = [...allBooks, ...response.data.items.map(normalizeBook)];
    }
  }

  // Remove duplicate IDs from different pages just in case
  return Array.from(new Map(allBooks.map(b => [b.id, b])).values());
};

export const fetchBookById = async (id: string): Promise<Book> => {
  const response = await axios.get<GoogleBookItem>(`${BASE_URL}/${id}`, {
    params: {
      key: import.meta.env.VITE_GOOGLE_BOOKS_API_KEY,
    },
  });
  return normalizeBook(response.data);
};

export const fetchDailyRecommendations = async (): Promise<Book[]> => {
  // We can just fetch some general Arabic books or a specific broad topic
  const response = await axios.get<GoogleBooksResponse>(BASE_URL, {
    params: {
      q: 'subject:fiction',
      langRestrict: 'ar',
      orderBy: 'relevance',
      maxResults: 5,
      key: import.meta.env.VITE_GOOGLE_BOOKS_API_KEY,
    },
  });
  if (!response.data.items) return [];
  return response.data.items.map(normalizeBook);
};
