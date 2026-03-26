import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBooksSearch } from '../features/books/hooks';
import BookCard from '../components/ui/BookCard';
import { BookCardSkeleton } from '../components/ui/Loader';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(query);
  const { data: books, isLoading } = useBooksSearch(query);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue });
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="mb-8 md:hidden">
        <form onSubmit={handleSearch} className="relative w-full">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="ابحث عن كتاب، كاتب..." 
            className="w-full bg-white border border-gray-200 shadow-sm rounded-2xl py-3 px-5 pe-12 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-medium"
          />
          <button type="submit" className="absolute end-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white transition-colors">
            <SearchIcon size={18} />
          </button>
        </form>
      </div>

      {query && (
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          نتائج البحث عن: <span className="text-primary-600">"{query}"</span>
        </h1>
      )}

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 10 }).map((_, i) => <BookCardSkeleton key={i} />)}
        </div>
      ) : books && books.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : query ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100">
          <div className="bg-primary-50 p-6 rounded-full text-primary-300 mb-6">
            <SearchIcon size={64} />
          </div>
          <p className="text-2xl font-bold text-gray-700 mb-2">عذراً، لم نجد نتائج لبحثك</p>
          <p className="text-gray-500 text-center">جرب البحث بكلمات مختلفة أو اسم كتاب آخر.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-gray-50 p-6 rounded-full text-gray-300 mb-6">
            <SearchIcon size={64} />
          </div>
          <p className="text-xl font-medium text-gray-500 text-center">اكتب اسم الكتاب أو اسم الكاتب للبحث</p>
        </div>
      )}
    </div>
  );
}
