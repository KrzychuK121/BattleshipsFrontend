import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import DefaultTemplate from './routes/DefaultTemplate';
import HubProvider from './HubProvider/HubProvider';
import LobbyManager from './components/lobby/LobbyManager';
import InitBoardPanel from './components/initBoard/InitBoardPanel';
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
                },
                {
                    path: '/initBoard', element: <InitBoardPanel />
                }
            ]
        }
    ]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HubProvider>
            <RouterProvider router={router} />
        </HubProvider>
    </React.StrictMode>
);
