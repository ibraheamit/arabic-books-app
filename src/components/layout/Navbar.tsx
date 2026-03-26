import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Library, Heart, Search, BookOpen } from 'lucide-react';
import clsx from 'clsx';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { to: '/', label: 'الرئيسية', icon: Home },
    { to: '/categories', label: 'التصنيفات', icon: Library },
    { to: '/favorites', label: 'المفضلة', icon: Heart },
  ];

  const mobileNavLinks = [
    { to: '/', label: 'الرئيسية', icon: Home },
    { to: '/search', label: 'البحث', icon: Search },
    { to: '/categories', label: 'التصنيفات', icon: Library },
    { to: '/favorites', label: 'المفضلة', icon: Heart },
  ];

  return (
    <>
      {/* Desktop Top Navbar */}
      <header className="hidden md:flex sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-primary-100 shadow-sm w-full h-20 items-center justify-between px-8">
        <div className="flex items-center gap-3 text-primary-600 font-extrabold text-2xl tracking-tight cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-primary-50 p-2 rounded-xl text-primary-600">
            <BookOpen size={28} />
          </div>
          <span>مكتبتي</span>
        </div>

        <nav className="flex items-center gap-8 font-semibold">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 
                clsx(
                  "hover:text-primary-600 transition-colors flex items-center gap-2 px-3 py-2 rounded-xl",
                  isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-500 hover:bg-gray-50"
                )
              }
            >
              <link.icon size={20} />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <form onSubmit={handleSearch} className="relative w-72">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن كتاب، كاتب..." 
            className="w-full bg-gray-50/50 border border-gray-200 hover:bg-white focus:bg-white rounded-2xl py-2.5 px-4 pe-11 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-medium shadow-sm"
          />
          <button type="submit" className="absolute end-1.5 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white transition-colors">
            <Search size={16} />
          </button>
        </form>
      </header>

      {/* Mobile Bottom Navbar */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-primary-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 flex justify-around items-center h-16 pb-safe">
        {mobileNavLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => 
              clsx(
                "flex flex-col items-center gap-1 w-full translate-y-2 transition-all duration-300",
                isActive ? "text-primary-600 -translate-y-1" : "text-gray-400 hover:text-primary-400"
              )
            }
          >
            {({ isActive }) => (
              <>
                <link.icon size={22} className={isActive ? 'text-primary-600' : ''} />
                <span className="text-[10px] font-medium">{link.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
