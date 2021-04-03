import React from 'react';
import {TableRow, TableCell} from '@material-ui/core';
import '../../App.css';
import shortid from 'shortid';

export default function KeyValueTableRow(props) {
    const title = props.title;
    const value = props.value;
    
    return (
        <TableRow key={shortid.generate()}>
            <TableCell component="th" scope="row">
                <b>{title}</b>
            </TableCell>
            <TableCell>
                {value}
            </TableCell>
        </TableRow>
    );
}