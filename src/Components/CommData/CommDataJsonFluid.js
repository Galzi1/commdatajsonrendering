import React, { useEffect, useState } from 'react';
import FieldCollectionFluid from '../Field/FieldCollectionFluid';
import {Button, Grid} from '@material-ui/core';
import '../../App.css';
import shortid from 'shortid';
import {CommDataLengthProvider, useCommDataLength} from '../../Utils/CommDataLengthContext';
import CommDataJsonHeader from './CommDataJsonHeader';

export default function CommDataJsonFluid(props) {
    const id = props.id;
    const name = props.name;
    const source = props.source;
    const destination = props.destination;
    const initialLength = props.length;
    const enums = props.enums;
    const structs = props.structs;
    const fields = props.fields;

    const [commDataFields, setCommDataFields] = useState([]);
    const commDataLength = useCommDataLength();

    useEffect(() => {
        if (!(Object.is(fields, undefined) || Object.is(fields, null))) {
            setCommDataFields(fields);
        };
    }, [fields]);

    const onFieldValueUpdated = (fieldName, newValue, params = undefined) => {
        const fieldIndex = fields.findIndex(element => element.name === fieldName);
        if (fieldIndex >= 0) {
            const field = fields[fieldIndex];
            field['value'] = newValue;
        };
    };

    const getCommDataObject = () => {
        const ret = {};
        ret['id'] = id;
        ret['name'] = name;
        ret['source'] = source;
        ret['destination'] = destination;
        ret['length'] = commDataLength;
        ret['enums'] = enums;
        ret['structs'] = structs;
        // ret['fields'] = commDataFields;
        ret['fields'] = fields;

        return ret;
    };

    const sendButtonClick = (e) => {
        e.preventDefault();
        const commDataObj = getCommDataObject();
        console.log(JSON.stringify(commDataObj));
    };
    
    return (
        <Grid id="CommDataJsonFluid" container item spacing={3} style={{borderStyle: "solid", margin: 5}}>
            <Grid item>
                <Button variant="contained" color="primary" onClick={sendButtonClick}>
                    שלח
                </Button>
            </Grid>
            
            {/* <Grid item>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableBody>
                            <KeyValueTableRow title={"מזהה"} value={id}/>
                            <KeyValueTableRow title={"שם"} value={name}/>
                            <KeyValueTableRow title={"מקור"} value={source}/>
                            <KeyValueTableRow title={"יעד"} value={destination}/>
                            <KeyValueTableRow title={"אורך"} value={length}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid> */}
            {React.createElement(CommDataLengthProvider, {initialLength: initialLength, children:
                [<CommDataJsonHeader key={shortid.generate()} id={id} name={name} source={source} destination={destination}/>, 
                <FieldCollectionFluid key={shortid.generate()} enums={enums} structs={structs} fields={commDataFields} setFields={setCommDataFields} onFieldValueUpdated={onFieldValueUpdated}/>]
            })}
            
        </Grid>
    );
}