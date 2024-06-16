import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import PlainBoard from './PlainBoard';
import { FieldType } from './Field';

const ShipOrientation = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
}

function Board({ shipLength }) {
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

    const onScrollHandler = (event) => {
        setOrientation(
            event.deltaY < 0
            ? ShipOrientation.VERTICAL
            : ShipOrientation.HORIZONTAL
        );
    }

    return (
        <PlainBoard
            rowsCount={boardSize}
            colsCount={boardSize}
            fieldType={FieldType.NOT_HITTED}
            onCellHoverHandler={onCellHoverHandler}
            onCellOutHandler={onCellOutHandler}
            highlightedCells={highlightedCells}
            onScrollHandler={onScrollHandler}
        />
    );
}

export default Board;