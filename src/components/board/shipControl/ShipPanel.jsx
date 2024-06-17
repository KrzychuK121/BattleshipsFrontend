import ShipCard from './ShipCard';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Row } from 'react-bootstrap';

function getCards(shipCards, lastSelected, onSelectedShipHandler) {
    const cards = [];

    shipCards.forEach(
        (isPresent, shipLength) => {
            if (isPresent)
                cards.push(
                    <ShipCard
                        key={shipLength}
                        lastSelected={lastSelected}
                        onSelectedShipHandler={onSelectedShipHandler}
                        shipLength={shipLength}
                    />
                );
        }
    );

    return cards;
}

function ShipPanel({
    shipCards,
    lastSelected,
    onSelectedShipHandler
}) {
    return (
        <Row>
            {
                getCards(
                    shipCards,
                    lastSelected,
                    onSelectedShipHandler
                )
            }
        </Row>
    );
}

export default ShipPanel;