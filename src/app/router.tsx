import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/Home';
import Categories from '../pages/Categories';
import BookDetails from '../pages/BookDetails';
import Favorites from '../pages/Favorites';
import Search from '../pages/Search';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'book/:id',
        element: <BookDetails />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
      {
        path: 'search',
        element: <Search />,
      },
    ],
  },
]);
