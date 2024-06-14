import ShipCard from './ShipCard';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';

function ShipPanel({ onPickHandler }) {
    return (
        <Row>
            <ShipCard shipLength={2} />
            <ShipCard shipLength={3} />
            <ShipCard shipLength={4} />
            <ShipCard shipLength={5} />
        </Row>
    );
}

export default ShipPanel;