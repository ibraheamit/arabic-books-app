import { useFavoritesStore } from '../store/favorites';
import BookCard from '../components/ui/BookCard';
import { HeartCrack } from 'lucide-react';

export default function Favorites() {
  const { favorites } = useFavoritesStore();

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        المفضلة
        <span className="text-base font-medium bg-primary-100 text-primary-700 py-1 px-3 rounded-full">
          {favorites.length} كتاب
        </span>
      </h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white rounded-3xl border border-gray-100">
          <HeartCrack size={64} className="mb-4 text-primary-200" />
          <p className="text-xl font-medium text-gray-600 mb-2">قائمتك فارغة</p>
          <p>أضف بعض الكتب إلى مفضلتك لتصل إليها بسهولة.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {favorites.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
