import React, { useEffect, useState } from 'react';
import FieldCollection from '../Field/FieldCollection';
import FieldCollectionFluid from '../Field/FieldCollectionFluid';
import {Grid, Paper, TableContainer, Table, TableBody, TableRow, TableCell} from '@material-ui/core';
import '../../App.css';
import shortid from 'shortid';
import KeyValueTableRow from '../General/KeyValueTableRow';
import GriddedLabelledOutline from '../General/GriddedLabelledOutline';

export default function CommDataJsonFluid(props) {
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
        console.log(props);
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

    const renderCommDataDetails = () => {
        return (
        <Grid container item spacing={3}>
            <GriddedLabelledOutline label="מזהה">
                {id}
            </GriddedLabelledOutline>
            <GriddedLabelledOutline label="שם">
                {name}
            </GriddedLabelledOutline>
            <GriddedLabelledOutline label="מקור">
                {source}
            </GriddedLabelledOutline>
            <GriddedLabelledOutline label="יעד">
                {destination}
            </GriddedLabelledOutline>
            <GriddedLabelledOutline label="אורך">
                {length}
            </GriddedLabelledOutline>
        </Grid>
        );
    };
    
    return (
        <Grid id="CommDataJsonFluid" container item spacing={3} style={{borderStyle: "solid", margin: 5}}>
            {renderCommDataDetails()}
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
            <FieldCollectionFluid enums={enums} structs={structs} fields={commDataFields} setFields={setCommDataFields} onFieldValueUpdated={onFieldValueUpdated}/>
        </Grid>
    );
}