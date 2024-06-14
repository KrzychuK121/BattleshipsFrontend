import Board from './board/Board';
import ShipPanel from './board/shipControl/ShipPanel';
import InitBoardPlayersStatus from './InitBoardPlayersStatus';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';

function InitBoardPanel() {
    return (
        <Row className='justify-content-center'>
            <Col md={7}>
                <Row as='main' className='justify-content-center'>
                    <Col xs={1} sm='auto'>
                        <Board />
                    </Col>
                    
                    <div className='my-5'></div>
                    <Col xs={1} sm='auto'>
                        <ShipPanel />
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