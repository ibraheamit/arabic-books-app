import { Link } from 'react-router-dom';
import { useDailyRecommendations, useBooksBySubject } from '../features/books/hooks';
import BookCard from '../components/ui/BookCard';
import { BookCardSkeleton } from '../components/ui/Loader';
import type { Book } from '../features/books/types';

function BookScrollSection({ title, books, isLoading, linkTo }: { title: string, books: Book[] | undefined, isLoading: boolean, linkTo?: string }) {
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
        {linkTo && (
          <Link to={linkTo} className="text-primary-600 text-sm font-medium hover:underline">
            عرض الكل
          </Link>
        )}
      </div>
      
      <div className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x md:grid md:grid-cols-4 lg:grid-cols-5 md:overflow-visible">
        {isLoading 
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="snap-start shrink-0 w-40 md:w-auto">
                <BookCardSkeleton />
              </div>
            ))
          : books?.map((book) => (
              <div key={book.id} className="snap-start shrink-0 w-40 md:w-auto h-full">
                <BookCard book={book} compact={true} />
              </div>
            ))
        }
      </div>
    </section>
  );
}

export default function Home() {
  const { data: dailyBooks, isLoading: dailyLoading } = useDailyRecommendations();
  const { data: popularBooks, isLoading: popularLoading } = useBooksBySubject('novel', 10);
  const { data: newestBooks, isLoading: newestLoading } = useBooksBySubject('history', 10); // Treating history as newest for variety

  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-8 p-6 md:p-10 bg-primary-50 rounded-[32px] border border-primary-100/50 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-900 mb-4 leading-tight">مرحباً بك في مكتبتك</h1>
          <p className="text-primary-600 md:text-lg font-medium max-w-lg mb-6">اكتشف عوالم جديدة واستمتع بتجربة قراءة لا تنسى مع ترشيحاتنا المصممة خصيصاً لك.</p>
          <Link to="/categories" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-md inline-block">تصفح التصنيفات</Link>
        </div>
      </header>

      <BookScrollSection title="ترشيحات اليوم" books={dailyBooks?.slice(0, 5)} isLoading={dailyLoading} linkTo="/categories" />
      <BookScrollSection title="الكتب الأكثر قراءة" books={popularBooks?.slice(0, 5)} isLoading={popularLoading} linkTo="/categories" />
      <BookScrollSection title="وصل حديثاً" books={newestBooks?.slice(0, 5)} isLoading={newestLoading} linkTo="/categories" />
    </div>
  );
}
