import PlainBoard from '../PlainBoard';
import { FieldType } from '../Field';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';

import classes from './ShipCard.module.css';

function ShipCard({ lastSelected, shipLength, onSelectedShipHandler }) {
    const buttonValue = 'cardNumber' + shipLength;
    return (
        <Col
            xs={1}
            sm='auto'
        >
            <button
                className={classes.selectButton}
                onClick={onSelectedShipHandler}
                id={buttonValue}
                value={shipLength}
            >
                <PlainBoard
                    selected={buttonValue === lastSelected}
                    rowsCount={1}
                    colsCount={shipLength}
                    fieldType={FieldType.SHIP}
                />
            </button>
        </Col>
    );
}

export default ShipCard;