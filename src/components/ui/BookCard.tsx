import { Link } from 'react-router-dom';
import { Heart, BookOpen } from 'lucide-react';
import type { Book } from '../../features/books/types';
import { useFavoritesStore } from '../../store/favorites';

interface BookCardProps {
  book: Book;
  compact?: boolean;
}

export default function BookCard({ book, compact = false }: BookCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const favorite = isFavorite(book.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent triggering Link
    if (favorite) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
  };

  return (
    <Link 
      to={`/book/${book.id}`}
      className={`group flex flex-col bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-primary-600/10 transition-all duration-500 hover:-translate-y-2 ${compact ? 'w-40 min-w-40 md:w-full md:min-w-0' : 'w-full'}`}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-primary-50/50">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        {book.thumbnail ? (
          <img 
            src={book.thumbnail} 
            alt={book.title} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-primary-100/50 p-4 text-center transition-transform duration-700 ease-out group-hover:scale-110 border-b border-primary-100">
            <BookOpen size={48} className="mb-3 text-primary-300 drop-shadow-sm" />
            <span className="text-sm font-bold text-primary-700 line-clamp-3 leading-snug opacity-80">{book.title}</span>
          </div>
        )}
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-3 start-3 p-2.5 z-20 bg-white/90 backdrop-blur-md shadow-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white hover:scale-110 transition-all duration-300"
          aria-label={favorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
        >
          <Heart size={18} className={favorite ? 'fill-red-500 text-red-500' : ''} />
        </button>
      </div>

      <div className="p-4 md:p-5 flex flex-col flex-grow bg-white">
        <h3 className="font-bold text-gray-800 text-sm md:text-base line-clamp-2 leading-snug mb-1.5 group-hover:text-primary-600 transition-colors" title={book.title}>
          {book.title}
        </h3>
        <p className="text-xs md:text-sm font-medium text-gray-500 mb-3 line-clamp-1">
          {book.authors.join('، ')}
        </p>
        
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-dashed border-gray-100">
          <span className="font-extrabold text-primary-600 text-sm md:text-base">
            {book.price}
          </span>
          <div className="bg-primary-50 text-primary-600 p-1.5 rounded-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <BookOpen size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}
