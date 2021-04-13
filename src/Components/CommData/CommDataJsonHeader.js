import React, { useEffect, useState } from 'react';
import {Button, Grid, Paper, TableContainer, Table, TableBody, TableRow, TableCell, TextField, TableHead} from '@material-ui/core';
import '../../App.css';
import KeyValueTableRow from '../General/KeyValueTableRow';
import {useCommDataLength} from '../../Utils/CommDataLengthContext';

export default function CommDataJsonHeader(props) {
    const id = props.id;
    const name = props.name;
    const source = props.source;
    const destination = props.destination;

    const commDataLength = useCommDataLength();
    
    return ( 
        <Grid item>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>מזהה</TableCell>
                            <TableCell>שם</TableCell>
                            <TableCell>מקור</TableCell>
                            <TableCell>יעד</TableCell>
                            <TableCell>אורך</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow>
                            <TableCell>{id}</TableCell>
                            <TableCell>{name}</TableCell>
                            <TableCell>{source}</TableCell>
                            <TableCell>{destination}</TableCell>
                            <TableCell>{commDataLength}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}