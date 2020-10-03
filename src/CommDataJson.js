import React, { useEffect, useState } from 'react';
import {StyledTableCell, StyledTableRow} from './TableStyle';
import FieldCollection from './FieldCollection';
import './App.css';

export default function CommDataJson(props) {
    const id = props.id;
    const name = props.name;
    const source = props.source;
    const destination = props.destination;
    const length = props.length;
    const enums = props.enums;
    const structs = props.structs;
    const fields = props.fields;

    const [commDataFields, setCommDataFields] = useState([]);

    useEffect(() => {
        if (fields) {
            setCommDataFields(fields);
        }
    }, [fields]);

    const onFieldUpdated = (fieldName) => {
        const field = fields.find(element => element.name === fieldName);
        console.log(field);
        //Adjust to length
    };
    
    return (
        <StyledTableRow key={id}>
            <StyledTableCell align="center">{id}</StyledTableCell>
            <StyledTableCell align="center">{name}</StyledTableCell>
            <StyledTableCell align="center">{source}</StyledTableCell>
            <StyledTableCell align="center">{destination}</StyledTableCell>
            <StyledTableCell align="center">{length}</StyledTableCell>
            <StyledTableCell align="center">
                <FieldCollection enums={enums} structs={structs} fields={commDataFields} setFields={setCommDataFields} onFieldUpdated={onFieldUpdated}/>
            </StyledTableCell>
        </StyledTableRow>
    )
}