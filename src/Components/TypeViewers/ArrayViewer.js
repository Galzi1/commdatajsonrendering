import React, {Fragment, useState, useEffect} from 'react';
import NullViewer from './NullViewer';
import fieldViewerFactory from './FieldViewerFactory';
import {buildFieldValues} from '../../Utils/TypesUtils';
import {Box, Grid} from '@material-ui/core';
import shortid from 'shortid';

export default function ArrayViewer(props) {
    const field = props.field;
    // "name": "EnumArray1", 
    // "type": "E_Mode", 
    // "isArray": true, 
    // "units": "", 
    // "range": "", 
    // "scale": "", 
    // "description": "An Enum Array Example", 
    // "value": [
    //     0, 2, 1
    // ]
    const onFieldValueUpdated = props.onFieldValueUpdated;
    const enums = props.enums;
    const structs = props.structs;
    const values = (Object.is(props.values, undefined) || Object.is(props.values, null)) 
        ? field.value
        : props.values;
    const arrayIndex = props.arrayIndex;
    const valueState = props.valueState;
    const lengthState = props.lengthState;
    const drawBorder = props.drawBorder;
    
    const [innerFields, setInnerFields] = (Object.is(valueState, undefined) || Object.is(valueState, null)) 
        ? useState([]) 
        : valueState;
    const [arrayLength, setArrayLength] = (Object.is(lengthState, undefined) || Object.is(lengthState, null)) 
        ? useState(0) 
        : lengthState;
    const [borderWidth, setBorderWidth] = useState(0);
    const [innerComponents, setInnerComponents] = useState([]);

    useEffect(() => {
        if (!(Object.is(values, undefined) || Object.is(values, null)) && Array.isArray(values)) {
            setArrayLength(values.length)
        };
        setInnerFields(buildFieldValues(field, values));
    }, [field, values]);

    useEffect(() => {
        console.log(innerFields);
        setInnerComponents(renderValues(innerFields));
    }, [innerFields])

    useEffect(() => {
        let newBorderWidth = 0;
        if (Object.is(drawBorder, undefined) || Object.is(drawBorder, null) || drawBorder) {
            newBorderWidth = 1;
        }
        setBorderWidth(newBorderWidth);
    }, [drawBorder])

    const onArrayValueUpdated = (fieldName, newValue, params = undefined) => {
        let index = -1;
        if (!(Object.is(params, undefined) || Object.is(params, null))) {
            index = params['index'];
        };

        if (!(Object.is(index, undefined) || Object.is(index, null)) 
        && index >= 0 && index < arrayLength) {
            // values[index] = convertString(newValue, field.type);
            values[index] = newValue;
            //TODO: Adjust to length

            if (!(Object.is(onFieldValueUpdated, undefined) || Object.is(onFieldValueUpdated, null))) {
                onFieldValueUpdated(field.name, values, {"index": arrayIndex})
            }
        };
    };

    const renderValues = (_innerFields) => {
        if (!(Object.is(_innerFields, undefined) || Object.is(_innerFields, null)) && Array.isArray(_innerFields)) {
            const innerFieldsComponents = _innerFields.map((innerField, index) => {
                const wrapper = (
                    <Grid item key={shortid.generate()}>
                        {fieldViewerFactory({
                            field: innerField, 
                            enums: enums, 
                            structs: structs, 
                            onFieldValueUpdated: onArrayValueUpdated, 
                            arrayIndex: index
                        })}
                    </Grid>
                );
                return wrapper;
            });
            
            return innerFieldsComponents;
        }

        return <NullViewer/>;
    };

    return (
        <Box id="array-viewer-div" p={1} border={borderWidth} borderColor="red">
            <Grid container spacing={1} direction="column">
                {innerComponents}
            </Grid>
        </Box>
    )
}
