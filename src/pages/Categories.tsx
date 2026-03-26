import { useState } from 'react';
import { useBooksBySubject } from '../features/books/hooks';
import BookCard from '../components/ui/BookCard';
import { BookCardSkeleton } from '../components/ui/Loader';

const categories = [
  { id: 'novel', name: 'روايات' },
  { id: 'self-help', name: 'تطوير الذات' },
  { id: 'islamic', name: 'إسلاميات' },
  { id: 'history', name: 'تاريخ' },
];

export default function Categories() {
  const [selected, setSelected] = useState(categories[0].id);
  const { data: books, isLoading } = useBooksBySubject(selected, 200);

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">التصنيفات</h1>
      
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 snap-x">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelected(cat.id)}
            className={`snap-start shrink-0 px-6 py-2 rounded-full font-medium transition-all ${
              selected === cat.id 
                ? 'bg-primary-500 text-white shadow-md' 
                : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {isLoading 
          ? Array.from({ length: 20 }).map((_, i) => <BookCardSkeleton key={i} />)
          : books?.map((book) => <BookCard key={book.id} book={book} />)
        }
      </div>
    </div>
  );
}
