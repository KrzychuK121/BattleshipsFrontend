import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function ReadyStatus(
    {
        conn,
        placedShips,
        boardSize
    }
) {
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();

    const onClickHandler = async () => {
        setIsClicked(true);
    }

    useEffect(
        () => {
            async function handleClickAsync() {
                if (!isClicked || conn == null)
                    return;

                await conn.invoke(
                    'SetReady',
                    placedShips
                );

                navigate('/gameBoard', { state: { placedShips: placedShips, boardSize: boardSize } });
            }

            handleClickAsync();
        }, [conn, isClicked]
    );

    return (
        <Button
            variant='primary'
            type='button'
            size='lg'
            onClick={() => onClickHandler(conn)}
        >
            Jestem gotowy
        </Button>
    );
}

export default ReadyStatus;