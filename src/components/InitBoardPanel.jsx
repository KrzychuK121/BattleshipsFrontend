import { useState } from 'react';

import Board from './board/Board';
import ShipPanel from './board/shipControl/ShipPanel';
import InitBoardPlayersStatus from './InitBoardPlayersStatus';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';

function InitBoardPanel() {
    const [lastSelected, setLastSelected] = useState('');
    const [selectedShipLength, setSelectedShipLength] = useState(0);

    const onSelectedShipHandler = (event) => {
        const clicked = event.currentTarget.id;
        const shipLength = event.currentTarget.value;

        setLastSelected(
            lastSelected === clicked
            ? ''
            : clicked
        );

        setSelectedShipLength(
            lastSelected === clicked
            ? 0
            : shipLength
        );
    }

    return (
        <Row className='justify-content-center'>
            <Col md={7}>
                <Row as='main' className='justify-content-center py-5'>
                    <Col xs={1} sm='auto'>
                        <Board shipLength={selectedShipLength} />
                    </Col>
                    
                    <div className='my-5'></div>
                    <Col xs={1} sm='auto'>
                        <ShipPanel
                            lastSelected={lastSelected}
                            onSelectedShipHandler={onSelectedShipHandler}
                        />
                    </Col>
                </Row>
            </Col>
            <Col md={3}>
                <aside>
                    <InitBoardPlayersStatus />
                </aside>
            </Col>
        </Row>
    );
}

export default InitBoardPanel;