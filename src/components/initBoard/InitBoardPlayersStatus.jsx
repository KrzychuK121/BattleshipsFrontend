import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';

const getOpponentReadyDesc = (isOpponentConnected, isOpponentReady) => {
    let content = '';
    if (!isOpponentConnected)
        content = 'brak';
    else
        content = isOpponentReady
            ? <span style={{ color: 'green' }}>gotowy</span>
            : <span style={{ color: 'red' }}>niegotowy</span>;

    return (
        <div>
            Status: {
                content
            }
        </div>
    );
}

const isOpponentConnected = (opponentNick) => {
    return opponentNick !== '';
}

function InitBoardPlayersStatus({ conn }) {
    const [opponentNick, setOpponentNick] = useState('');
    const [isOpponentReady, setIsOpponentReady] = useState(false);

    const setOpponent = (username, status) => {
        setOpponentNick(username);
        setIsOpponentReady(status);
    }

    useEffect(
        () => {
            async function processReadyData() {
                if (conn == null)
                    return;

                conn.on(
                    'UpdateOpponentsStatus',
                    async (username, status) => {
                        setOpponent(username, status);
                    }
                );
                if(conn.state !== 'Disconnected')
                    await conn.invoke('CheckOpponentsStatus');
            }
            if(conn != null)
                processReadyData();
        }, [conn]
    );

    return (
        <Row className='justify-content-center'>
            <Col md={6}>
                <h2>
                    Przeciwnik: {
                        isOpponentConnected(opponentNick)
                        ? opponentNick
                        : 'brak'
                    }
                </h2>
                {getOpponentReadyDesc(opponentNick !== '', isOpponentReady)}
            </Col>
        </Row>
    );
}

export default InitBoardPlayersStatus