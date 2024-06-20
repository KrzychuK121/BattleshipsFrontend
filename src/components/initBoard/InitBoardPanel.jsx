import { useState, useContext } from 'react';

import { HubContext } from '../../HubProvider/HubContext';

import Board from '../board/Board';
import ShipPanel from '../board/shipControl/ShipPanel';
import ReadyStatus from '../board/ReadyStatus';
import InitBoardPlayersStatus from './InitBoardPlayersStatus';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';

const ShipOrientation = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
}

function InitBoardPanel() {
    const boardSize = 10;
    const { conn } = useContext(HubContext);

    const [lastSelected, setLastSelected] = useState('');
    const [selectedShipLength, setSelectedShipLength] = useState(0);

    const [placedShips, setPlacedShips] = useState([]);
    const [isShipPanelEmpty, setIsShipPanelEmpty] = useState(false);

    const [orientation, setOrientation] = useState(ShipOrientation.HORIZONTAL);
    const [highlightedCells, setHighlightedCells] = useState([]);

    const [shipCards, setShipCards] = useState(
        new Map(
            [
                [2, true],
                [3, true],
                [4, true],
                [5, true]
            ]
        )
    );

    const onPlaceShipHandler = (fields) => {
        setPlacedShips(
            [
                ...placedShips,
                { name: 'shipNr' + fields.length, boardFields: fields }
            ]
        );
    };

    const onSelectedShipHandler = (event) => {
        const clicked = event.currentTarget.id;
        const shipLength = parseInt(event.currentTarget.value);

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
    };

    const onCellHoverHandler = (row, col) => {
        const cellsToHighlight = [];

        if (orientation === ShipOrientation.HORIZONTAL) {
            const startCol = Math.min(col, boardSize - selectedShipLength);
            for (let i = 0; i < selectedShipLength; i++) {
                cellsToHighlight.push(`${row}${startCol + i}`);
            }
        } else if (orientation === ShipOrientation.VERTICAL) {
            const startRow = Math.min(row, boardSize - selectedShipLength);
            for (let i = 0; i < selectedShipLength; i++) {
                cellsToHighlight.push(`${startRow + i}${col}`);
            }
        }

        setHighlightedCells(cellsToHighlight);
    };

    const onCellOutHandler = () => {
        setHighlightedCells([]);
    };

    const onWheelHandler = (event) => {
        setOrientation(
            event.deltaY < 0
                ? ShipOrientation.VERTICAL
                : ShipOrientation.HORIZONTAL
        );
    }

    const isCellOccupied = (cellId) => {
        return placedShips.some(
            ship => ship.boardFields.includes(cellId)
        );
    };

    const onCellClickHandler = () => {
        if (
            highlightedCells.length !== selectedShipLength ||
            highlightedCells.some(isCellOccupied)
        )
            return;

        onPlaceShipHandler(highlightedCells);

        // hiding placed ship from panel to select
        shipCards.set(selectedShipLength, false);
        setShipCards(shipCards);

        if (ifNoAvailableShips())
            setIsShipPanelEmpty(true);

        // clearing variables for highlighting ship shape on board
        setLastSelected('');
        setSelectedShipLength(0);
    };

    /**
     * Checks if <ShipPanel /> displays any ship to select, 
     * which could be placed on board.
     * 
     * @returns false if at least one ship can be selected from <ShipPanel />. Otherwise false
     */
    const ifNoAvailableShips = () => {
        for (let isPresent of shipCards.values())
            if (isPresent)
                return false;
        return true;
    }

    return (
        <Row className='justify-content-center'>
            <Col md={7}>
                <Row as='main' className='justify-content-center py-5'>
                    <Col xs={1} sm='auto'>
                        <Board
                            boardSize={boardSize}
                            onCellHoverHandler={onCellHoverHandler}
                            onCellOutHandler={onCellOutHandler}
                            highlightedCells={highlightedCells}
                            onWheelHandler={onWheelHandler}
                            onCellClickHandler={onCellClickHandler}
                            isCellOccupied={isCellOccupied}
                        />
                    </Col>
                    
                    <div className='my-5'></div>
                    <Col xs={1} sm='auto'>
                        {
                            isShipPanelEmpty
                            ? <ReadyStatus conn={conn} />
                            : <ShipPanel
                                  shipCards={shipCards}
                                  lastSelected={lastSelected}
                                  onSelectedShipHandler={onSelectedShipHandler}
                            />
                        }
                    </Col>
                </Row>
            </Col>
            <Col md={3}>
                <aside>
                    <InitBoardPlayersStatus conn={conn} />
                </aside>
            </Col>
        </Row>
    );
}

export default InitBoardPanel;