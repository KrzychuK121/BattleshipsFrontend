import PlainBoard from '../PlainBoard';
import { FieldType } from '../Field';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';

function ShipCard({ shipLength }) {
    return (
        <Col xs={1} sm='auto'>
            <PlainBoard rowsCount={1} colsCount={shipLength} fieldType={FieldType.SHIP} />
        </Col>
    );
}

export default ShipCard;