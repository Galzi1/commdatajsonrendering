import React, { useEffect, useState } from 'react';
import {StyledTableCell, StyledTableRow} from '../../TableStyle';
import FieldCollection from '../Field/FieldCollection';
import '../../App.css';
import shortid from 'shortid';

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

    const onFieldValueUpdated = (fieldName, newValue, params = undefined) => {
        const fieldIndex = fields.findIndex(element => element.name === fieldName);
        if (fieldIndex >= 0) {
            const field = fields[fieldIndex];
            field['value'] = newValue;
            //TODO: Adjust to length
        }
        
    };

    const getCommDataObject = () => {
        const ret = {};
        ret['id'] = id;
        ret['name'] = name;
        ret['source'] = source;
        ret['destination'] = destination;
        ret['length'] = length;
        ret['enums'] = enums;
        ret['structs'] = structs;
        ret['fields'] = commDataFields;

        return ret;
    };

    const sendButtonClick = (e) => {
        e.preventDefault();
        const commDataObj = getCommDataObject();
        console.log(JSON.stringify(commDataObj));
    };
    
    return (
        <StyledTableRow key={shortid.generate()}>
            <StyledTableCell className="btn btn-default">
                <button onClick={sendButtonClick}>
                    שלח
                </button>
            </StyledTableCell>
            <StyledTableCell align="center">{id}</StyledTableCell>
            <StyledTableCell align="center">{name}</StyledTableCell>
            <StyledTableCell align="center">{source}</StyledTableCell>
            <StyledTableCell align="center">{destination}</StyledTableCell>
            <StyledTableCell align="center">{length}</StyledTableCell>
            <StyledTableCell align="center">
                <FieldCollection enums={enums} structs={structs} fields={commDataFields} setFields={setCommDataFields} onFieldValueUpdated={onFieldValueUpdated}/>
            </StyledTableCell>
        </StyledTableRow>
    )
}