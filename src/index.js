import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';

import DefaultTemplate from './routes/DefaultTemplate';
import HubProvider from './HubProvider/HubProvider';
import LobbyManager from './components/lobby/LobbyManager';
import InitBoardPanel from './components/initBoard/InitBoardPanel';
import GameBoardPanel from './components/gameBoard/GameBoardPanel';
import Board from './components/board/Board';

const router = createBrowserRouter(
    [
        {
            path: '/', element: <DefaultTemplate />, children: [
                {
                    index: true, element: <Navigate to='/lobby' replace />
                },
                {
                    path: '/lobby', element: <LobbyManager />
                },
                {
                    path: '/board', element: <Board />
                },
                {
                    path: '/initBoard', element: <InitBoardPanel />
                },
                {
                    path: '/gameBoard', element: <GameBoardPanel />
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
