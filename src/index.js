import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import DefaultTemplate from './routes/DefaultTemplate';
import LobbyManager from './components/lobby/LobbyManager';
import Board from './components/board/Board';

const router = createBrowserRouter(
    [
        {
            path: '/', element: <DefaultTemplate />, children: [
                {
                    path: '/lobby', element: <LobbyManager />
                },
                {
                    path: '/board', element: <Board />
                }
            ]
        }
    ]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
