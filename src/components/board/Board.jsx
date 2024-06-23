import 'bootstrap/dist/css/bootstrap.min.css';

import PlainBoard from './PlainBoard';
import { FieldType } from './Field';

function Board({
    boardSize,
    onCellHoverHandler,
    onCellOutHandler,
    highlightedCells,
    onWheelHandler,
    onCellClickHandler,
    isCellOccupied,
    customFields
}) {

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
            customFields={customFields}
        />
    );
}

export default Board;