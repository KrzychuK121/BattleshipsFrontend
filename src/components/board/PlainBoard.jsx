import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

import classes from './PlainBoard.module.css';
import Field, { FieldType } from './Field';

function getField(
    id,
    type,
    onCellHoverHandler = null,
    onCellOutHandler = null,
    onCellClickHandler = null
) {
    return (
        <Field
            key={id}
            type={type}
            onCellHoverHandler={onCellHoverHandler}
            onCellOutHandler={onCellOutHandler}
            onCellClickHandler={onCellClickHandler}
        />
    );
}

function getRows(
    rowsCount,
    colsCount,
    fieldType,
    onCellHoverHandler,
    onCellOutHandler,
    highlightedCells,
    onCellClickHandler,
    isCellOccupied,
    customFields
) {
    const rows = [];

    for (let i = 0; i < rowsCount; i++) {
        const cols = [];
        for (let j = 0; j < colsCount; j++) {
            let id = `${i}:${j}`;
            let isHighlighted =
                highlightedCells != null &&
                highlightedCells.includes(id);

            let type = fieldType;

            if (isHighlighted)
                type = FieldType.HOVERED;
            else if (
                customFields != null &&
                customFields.has(id)
            )
                type = customFields.get(id);
            else if (
                isCellOccupied != null &&
                isCellOccupied(id)
            )
                type = FieldType.SHIP;
            
                

            const onCellHoverHandlerSafe = onCellHoverHandler != null
                ? () => onCellHoverHandler(i, j)
                : null;

            const onCellClickHandlerSafe = onCellClickHandler != null
                ? () => onCellClickHandler(id)
                : null;

            cols.push(
                getField(
                    id,
                    type,
                    onCellHoverHandlerSafe,
                    onCellOutHandler,
                    onCellClickHandlerSafe
                )

            );

        }
        rows.push(<tr key={i}>{cols}</tr>);
    }

    return rows;
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
        isCellOccupied,
        customFields
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
                            isCellOccupied,
                            customFields
                        )
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default PlainBoard;