import { useParams, useNavigate } from 'react-router-dom';
import { useBookDetails, useBooksBySubject } from '../features/books/hooks';
import { useFavoritesStore } from '../store/favorites';
import Loader, { BookCardSkeleton } from '../components/ui/Loader';
import BookCard from '../components/ui/BookCard';
import { Heart, ArrowRight, Share2, BookOpen } from 'lucide-react';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading } = useBookDetails(id);
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  
  // Fetch some similar books using the first author or a broad subject
  const { data: similarBooks, isLoading: similarLoading } = useBooksBySubject('novel', 6);

  if (isLoading) return <Loader />;
  if (!book) return <div className="text-center py-20 text-xl font-bold text-gray-500">حدث خطأ.. الكتاب غير موجود.</div>;

  const favorite = isFavorite(book.id);

  const toggleFavorite = () => {
    if (favorite) removeFavorite(book.id);
    else addFavorite(book);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-primary-600 font-medium mb-6 hover:underline"
      >
        <ArrowRight size={20} />
        <span>عودة</span>
      </button>

      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-primary-50">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cover */}
          <div className="w-full md:w-1/3 max-w-[300px] mx-auto shrink-0 relative">
            <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-xl border border-primary-100 bg-primary-50">
              {book.thumbnail ? (
                <img 
                  src={book.thumbnail} 
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <BookOpen size={80} className="mb-4 text-primary-300 drop-shadow-sm" />
                  <span className="text-xl font-bold text-primary-700 leading-snug opacity-80">{book.title}</span>
                </div>
              )}
            </div>
            <button 
              onClick={toggleFavorite}
              className={`absolute -bottom-4 start-1/2 -translate-x-1/2 p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center ${
                favorite ? 'bg-red-50 text-red-500' : 'bg-primary-500 text-white'
              }`}
            >
              <Heart size={24} className={favorite ? 'fill-red-500' : ''} />
            </button>
          </div>

          {/* Details */}
          <div className="flex-1 mt-6 md:mt-0">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">{book.title}</h1>
            <p className="text-lg text-primary-600 font-medium mb-6">
              بقلم: {book.authors.join('، ')}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <span className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full font-bold text-lg border border-primary-100">
                {book.price}
              </span>
              <button className="p-3 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
                <Share2 size={24} />
              </button>
            </div>

            <div className="prose prose-lg text-gray-600 mb-8 max-w-none">
              <h3 className="text-xl font-bold text-gray-900 mb-3">نبذة عن الكتاب</h3>
              <p className="leading-relaxed">{book.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {book.previewLink && (
                <a 
                  href={book.previewLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-4 px-6 rounded-2xl font-bold transition-colors"
                >
                  <BookOpen size={20} />
                  <span>تصفح الكتاب</span>
                </a>
              )}
              {book.infoLink && (
                <a 
                  href={book.infoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-primary-200 hover:border-primary-600 text-primary-700 py-4 px-6 rounded-2xl font-bold transition-all"
                >
                  <span>مزيد من المعلومات</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">كتب مشابهة أعجبت القراء</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {similarLoading 
            ? Array.from({ length: 6 }).map((_, i) => <BookCardSkeleton key={i} />)
            : similarBooks?.map(b => (
              <BookCard key={b.id} book={b} compact={true} />
            ))
          }
        </div>
      </div>
    </div>
  );
}
