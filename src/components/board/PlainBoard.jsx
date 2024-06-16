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
    highlightedCells
) {
    const rows = [];

    for (let i = 0; i < rowsCount; i++) {
        const cols = [];
        for (let j = 0; j < colsCount; j++) {
            let id = `${i}${j}`
            let isHighlighted =
                highlightedCells != null &&
                highlightedCells.includes(id);

            cols.push(
                highlightedCells != null
                ? getFieldWithHover(
                    id, i, j,
                    isHighlighted
                    ? FieldType.HOVERED
                    : fieldType,
                    onCellHoverHandler,
                    onCellOutHandler
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
    onCellOutHandler
) {
    return <Field
        key={id}
        type={type}
        onCellHoverHandler={() => onCellHoverHandler(row, col)}
        onCellOutHandler={onCellOutHandler}
    />;
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
        onScrollHandler
    }
) {

    return (
        <div
            id={selected ? classes.selectedFrame : ''}
            className={classes.fieldFrame}
            onWheel={onScrollHandler}
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
                            highlightedCells
                        )
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default PlainBoard;