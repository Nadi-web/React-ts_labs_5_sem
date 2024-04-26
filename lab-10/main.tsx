import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Catalog from './Catalog.js';
import MoviePage from './MoviePage.js';

import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Catalog />,
    },
    {
        path: '/:id',
        element: <MoviePage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <main>
            <RouterProvider router={router} />
        </main>
        <footer>(c) BeBedok Nadia</footer>
    </React.StrictMode>
);
