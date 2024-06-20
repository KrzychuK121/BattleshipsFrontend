import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function ReadyStatus({ conn, placedShips }) {

    const onClickHandler = async () => {
        console.log('placedShips at ReadyStatus: ');
        console.log(placedShips);

        await conn.invoke(
            'SetReady',
            placedShips
        );
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