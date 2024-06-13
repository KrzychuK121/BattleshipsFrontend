import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

import classes from './Board.module.css';
import Field, { FieldType } from './Field';

function getRows(count){
    const rows = [];

    for (let i = 0; i < count; i++) {
        const cols = [];
        for (let j = 0; j < count; j++) {
            cols.push(<Field key={'' + i + + j} type={FieldType.NOT_HITTED} />);
        }
        rows.push(<tr key={i}>{cols}</tr>);
    }

    return rows;
}

function Board() {
    
    return (
        <div className={classes.FieldFrame}>
            <Table className={classes.BoardTable} bordered>
                <tbody>
                    {getRows(10)}
                </tbody>                
            </Table>
        </div>
    );
}

export default Board;