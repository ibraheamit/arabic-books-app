import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen pb-16 md:pb-0 flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
