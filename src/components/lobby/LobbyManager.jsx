import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import CreateLobby from './CreateLobby';

function LobbyManager() {
    const [conn, setConnection] = useState();

    const joinLobby = async (username, chatConnection) => {
        try {
            const conn = new HubConnectionBuilder()
                .withUrl('http://localhost:5292/lobby')
                .configureLogging(LogLevel.Information)
                .build();

            conn.on(
                'JoinSpecificLobby',
                (username, msg) => {
                    console.log("msg: ", msg);
                }
            );

            await conn.start();
            await conn.invoke(
                'JoinSpecificLobby',
                { username, chatConnection }
            );

            setConnection(conn);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Modal
            show={true}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Tworzenie lobby
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Stworz lobby lub dolacz do przyjaciela</h4>
                <div>
                    <CreateLobby joinLobby={ joinLobby } />
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default LobbyManager;