import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

import classes from './PlainBoard.module.css';
import Field, { FieldType } from './Field';

function getRows(
    rowsCount,
    colsCount,
    fieldType,
    onCellHoverHandler,
    onCellOutHandler,
    highlightedCells,
    onCellClickHandler,
    isCellOccupied
) {
    const rows = [];

    for (let i = 0; i < rowsCount; i++) {
        const cols = [];
        for (let j = 0; j < colsCount; j++) {
            let id = `${i}${j}`;
            let isHighlighted =
                highlightedCells != null &&
                highlightedCells.includes(id);

            let type = fieldType;

            if (isHighlighted)
                type = FieldType.HOVERED;

            if (
                isCellOccupied != null &&
                isCellOccupied(id)
            )
                type = FieldType.SHIP;

            cols.push(
                highlightedCells != null
                ? getFieldWithHover(
                    id, i, j,
                    type,
                    onCellHoverHandler,
                    onCellOutHandler,
                    onCellClickHandler
                )
                : getField(id, fieldType)
                
            );

        }
        rows.push(<tr key={i}>{cols}</tr>);
    }

    return rows;
}

function getFieldWithHover(
    id,
    row,
    col,
    type,
    onCellHoverHandler,
    onCellOutHandler,
    onCellClickHandler
) {
    return (
        <Field
            key={id}
            type={type}
            onCellHoverHandler={() => onCellHoverHandler(row, col)}
            onCellOutHandler={onCellOutHandler}
            onCellClickHandler={onCellClickHandler}
        />
    );
}

function getField(
    id,
    type
) {
    return <Field key={id} type={type} />;
}

function PlainBoard(
    {   
        selected,
        rowsCount,
        colsCount,
        fieldType,
        onCellHoverHandler,
        onCellOutHandler,
        highlightedCells,
        onWheelHandler,
        onCellClickHandler,
        isCellOccupied
    }
) {

    return (
        <div
            id={selected ? classes.selectedFrame : ''}
            className={classes.fieldFrame}
            onWheel={onWheelHandler}
        >
            <Table className={classes.boardTable} bordered>
                <tbody>
                    {
                        getRows(
                            rowsCount,
                            colsCount,
                            fieldType,
                            onCellHoverHandler,
                            onCellOutHandler,
                            highlightedCells,
                            onCellClickHandler,
                            isCellOccupied
                        )
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default PlainBoard;