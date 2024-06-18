import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function ReadyStatus({ conn }) {
    const onClickHandler = async () => {
        /*await conn.invoke(
            'JoinSpecificLobby',
            {
                
            }
        );*/
    }

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