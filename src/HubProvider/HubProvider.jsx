import React, { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { HubContext } from './HubContext';

const HubProvider = ({ children }) => {
    const [conn, setConnection] = useState();

    const joinLobby = async (
        username,
        chatConnection,
        successHandler,
        errorHandler
    ) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl('http://localhost:5292/lobby')
                .configureLogging(LogLevel.Information)
                .build();

            // Handling message from server.
            // The 'JoinSpecificLobby' is the 'method' parameter
            // in SendAsync in server
            connection.on(
                'JoinSpecificLobby',
                (username, msg) => {
                    console.log("msg: ", msg);
                }
            );

            connection.on(
                'JoinErrorHandler',
                async (message) => {
                    await errorHandler(message);
                }
            );

            connection.on(
                'JoinSuccessHandler',
                async () => {
                    await successHandler();
                }
            )

            // Starting connection
            await connection.start();

            // 'Sending' info (object that contains username and chatConnection)
            // to server's method 'JoinSpecificLobby'
            await connection.invoke(
                'JoinSpecificLobby',
                { username, chatConnection }
            );

            setConnection(connection);
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <HubContext.Provider value={{ conn, joinLobby }}>
            {children}
        </HubContext.Provider>
    );
};

export default HubProvider;
