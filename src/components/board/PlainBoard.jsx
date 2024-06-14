import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

import classes from './PlainBoard.module.css';
import Field from './Field';

function getRows(rowsCount, colsCount, fieldType) {
    const rows = [];

    for (let i = 0; i < rowsCount; i++) {
        const cols = [];
        for (let j = 0; j < colsCount; j++) {
            cols.push(<Field key={'' + i + + j} type={fieldType} />);
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
        fieldType
    }
) {

    return (
        <div
            id={selected ? classes.selectedFrame : ''}
            className={classes.fieldFrame}
        >
            <Table className={classes.boardTable} bordered>
                <tbody>
                    {getRows(rowsCount, colsCount, fieldType)}
                </tbody>
            </Table>
        </div>
    );
}

export default PlainBoard;