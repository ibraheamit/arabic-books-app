import { useQuery } from '@tanstack/react-query';
import { fetchBooksBySubject, fetchBookById, fetchDailyRecommendations, fetchBooksBySearch } from './api';

export const useBooksSearch = (query: string, maxResults = 20) => {
  return useQuery({
    queryKey: ['books', 'search', query, maxResults],
    queryFn: () => fetchBooksBySearch(query, maxResults),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
  });
};

export const useBooksBySubject = (subject: string, maxResults = 10) => {
  return useQuery({
    queryKey: ['books', 'subject', subject, maxResults],
    queryFn: () => fetchBooksBySubject(subject, maxResults),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

export const useBookDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => fetchBookById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 15, // 15 minutes cache
  });
};

export const useDailyRecommendations = () => {
  return useQuery({
    queryKey: ['books', 'daily-recommendations'],
    queryFn: fetchDailyRecommendations,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
