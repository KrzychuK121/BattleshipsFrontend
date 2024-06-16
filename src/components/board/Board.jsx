import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import PlainBoard from './PlainBoard';
import { FieldType } from './Field';

function Board({ shipLength }) {
    const boardSize = 10;
    const [orientation, setOrientation] = useState('horizontal');
    const [highlightedCells, setHighlightedCells] = useState([]);

    const onCellHoverHandler = (row, col) => {
        const cellsToHighlight = [];

        if (orientation === 'horizontal') {
            const startCol = Math.min(col, boardSize - shipLength);
            for (let i = 0; i < shipLength; i++) {
                cellsToHighlight.push(`${row}${startCol + i}`);
            }
        } else if (orientation === 'vertical') {
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

    return (
        <PlainBoard
            rowsCount={boardSize}
            colsCount={boardSize}
            fieldType={FieldType.NOT_HITTED}
            onCellHoverHandler={onCellHoverHandler}
            onCellOutHandler={onCellOutHandler}
            highlightedCells={highlightedCells}
        />
    );
}

export default Board;