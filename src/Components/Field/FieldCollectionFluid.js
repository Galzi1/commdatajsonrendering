import React, {Fragment} from 'react';
import FieldFluid from './FieldFluid';
import {Grid, Paper} from '@material-ui/core';
import '../../App.css';
import shortid from 'shortid';
import LabelledOutline from '../General/LabelledOutline';
import fieldViewerFactory from '../TypeViewers/FieldViewerFactory';
import FieldDetails from './FieldDetails';

export default function FieldCollectionFluid(props) {
    const enums = props.enums;
    const structs = props.structs;
    const fields = props.fields;
    const onFieldValueUpdated = props.onFieldValueUpdated;

    const fieldsCompsDict = {};
    const lengthComponents = [];
    
    const renderFields = () => {
        if (!(Object.is(fields, undefined) || Object.is(fields, null)) && Array.isArray(fields)) {
            updateFieldsCompDict(fields);
        };

        // Filter out length components
        const compsToRender = []
        Object.keys(fieldsCompsDict).forEach(key => {
            const fieldOfKey = fields.find( ({ name }) => name === key );
            if (!lengthComponents.includes(key) && !(Object.is(fieldOfKey, undefined) || Object.is(fieldOfKey, null))) {
                compsToRender.push(
                    createValueComponent(fieldOfKey)
                );
            };
        }); 
        
        return (
            <Grid id="FieldCollectionFluid" container item spacing={3}>
                {compsToRender}
            </Grid>
        );
    };

    const updateFieldsCompDict = (_fields) => {
        _fields.forEach((field) => {
            let lengthComponent = undefined;
            if (field.isArray && !(Object.is(field.lengthField, undefined) || Object.is(field.lengthField, null) 
            || field.lengthField === "") && fieldsCompsDict.hasOwnProperty(field.lengthField)){
                lengthComponent = fieldsCompsDict[field.lengthField];
                lengthComponents.push(field.lengthField);
            };

            const initialLength = (field.isArray && !(Object.is(field.value, undefined) || Object.is(field.value, null))
             && Array.isArray(field.value))
                ? field.value.length
                : undefined;
            const comp = (
                <div>
                    {fieldViewerFactory({
                        field: field, 
                        enums: enums, 
                        structs: structs, 
                        onFieldValueUpdated: onFieldValueUpdated, 
                        lengthComponent: lengthComponent, 
                        initialLength: initialLength
                    })}
                </div>
            );

            fieldsCompsDict[field.name] = comp;
        });
    };

    const createValueComponent = (field) => {
        return (
            <Grid item key={shortid.generate()}>
                <Paper id="FieldFluid">
                    <LabelledOutline label={field.name} button={<FieldDetails field={field}/>}>
                        {fieldsCompsDict[field.name]}
                    </LabelledOutline>
                </Paper>
            </Grid>
        );
    };

    return (
        <Grid id="FieldCollectionFluid" container item spacing={3}>
            {renderFields()}
        </Grid>
    );
}