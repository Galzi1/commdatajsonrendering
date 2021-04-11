import React, { useEffect, useState } from 'react';
import {StyledTableCell, StyledTableRow} from '../../TableStyle';
import {Grid, Paper, TableContainer, Table, TableBody, TableRow, TableCell} from '@material-ui/core';
import '../../App.css';
import FieldDetails from './FieldDetails';
import fieldViewerFactory from '../TypeViewers/FieldViewerFactory';
import shortid from 'shortid';
import KeyValueTableRow from '../General/KeyValueTableRow';
import LabelledOutline from '../General/LabelledOutline';

export default function Field(props) {
    const field = props.field;
    const enums = props.enums;
    const structs = props.structs;
    const onFieldValueUpdated = props.onFieldValueUpdated;

    return (
        <Grid item>
            <Paper id="FieldFluid">
                <LabelledOutline label={field.name} button={<FieldDetails field={field}/>}>
                    {fieldViewerFactory({
                        field: field, 
                        enums: enums, 
                        structs: structs, 
                        onFieldValueUpdated: onFieldValueUpdated
                    })}
                </LabelledOutline>
            </Paper>
        </Grid>
    )
}
