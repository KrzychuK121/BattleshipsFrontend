import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import PlainBoard from './PlainBoard';
import { FieldType } from './Field';

const ShipOrientation = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
}

function Board({ shipLength, onPlaceShipHandler, placedShips }) {
    const boardSize = 10;
    const [orientation, setOrientation] = useState(ShipOrientation.HORIZONTAL);
    const [highlightedCells, setHighlightedCells] = useState([]);

    const onCellHoverHandler = (row, col) => {
        const cellsToHighlight = [];

        if (orientation === ShipOrientation.HORIZONTAL) {
            const startCol = Math.min(col, boardSize - shipLength);
            for (let i = 0; i < shipLength; i++) {
                cellsToHighlight.push(`${row}${startCol + i}`);
            }
        } else if (orientation === ShipOrientation.VERTICAL) {
            const startRow = Math.min(row, boardSize - shipLength);
            for (let i = 0; i < shipLength; i++) {
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
        return placedShips.flat().includes(cellId);
    };

    const onCellClickHandler = () => {
        if (
            highlightedCells.length === shipLength &&
            !highlightedCells.some(isCellOccupied)
        )
            onPlaceShipHandler(highlightedCells);
    };


    return (
        <PlainBoard
            rowsCount={boardSize}
            colsCount={boardSize}
            fieldType={FieldType.NOT_HITTED}
            onCellHoverHandler={onCellHoverHandler}
            onCellOutHandler={onCellOutHandler}
            highlightedCells={highlightedCells}
            onWheelHandler={onWheelHandler}
            onCellClickHandler={onCellClickHandler}
            isCellOccupied={isCellOccupied}
        />
    );
}

export default Board;