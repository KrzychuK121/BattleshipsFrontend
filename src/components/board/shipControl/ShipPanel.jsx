import ShipCard from './ShipCard';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'react-bootstrap';

function ShipPanel({ lastSelected, onSelectedShipHandler }) {
    return (
        <Row>
            <ShipCard
                lastSelected={lastSelected}
                onSelectedShipHandler={onSelectedShipHandler}
                shipLength={2}
            />
            <ShipCard
                lastSelected={lastSelected}
                onSelectedShipHandler={onSelectedShipHandler}
                shipLength={3}
            />
            <ShipCard
                lastSelected={lastSelected}
                onSelectedShipHandler={onSelectedShipHandler}
                shipLength={4}
            />
            <ShipCard
                lastSelected={lastSelected}
                onSelectedShipHandler={onSelectedShipHandler}
                shipLength={5}
            />
        </Row>
    );
}

export default ShipPanel;