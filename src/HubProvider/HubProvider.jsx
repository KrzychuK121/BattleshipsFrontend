import React, { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { HubContext } from './HubContext';

const HubProvider = ({ children }) => {
    const [conn, setConnection] = useState();

    const joinLobby = async (username, chatConnection) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl('http://localhost:5292/lobby')
                .configureLogging(LogLevel.Information)
                .build();

            connection.on(
                'JoinSpecificLobby',
                (username, msg) => {
                    console.log("msg: ", msg);
                }
            );

            await connection.start();
            await connection.invoke(
                'JoinSpecificLobby',
                { username, chatConnection }
            );

            setConnection(connection);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <HubContext.Provider value={{ conn, joinLobby }}>
            {children}
        </HubContext.Provider>
    );
};

export default HubProvider;
