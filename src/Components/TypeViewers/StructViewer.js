import React, {useState, useEffect} from 'react';
import NullViewer from './NullViewer';
import FieldViewerWrapper from './FieldViewerWrapper';
import {getIndexInCollection} from '../../Utils/GeneralUtils';
import {Grid, Box} from '@material-ui/core';

export default function StructViewer(props) {
    const field = props.field;
    // "name": "Struct1", 
    // "type": "S_StructExample", 
    // "isArray": false, 
    // "units": "", 
    // "range": "", 
    // "scale": "", 
    // "description": "A Struct Example", 
    // "value": {
    //     "PrimInStruct": 77, 
    //     "EnumInStruct": 2, 
    //     "ArrayInStruct": [1, 2]
    // }
    const structType = props.structType;
    // "name": "S_StructExample", 
    // "length": 5, 
    // "fields": [
    //     {
    //         "name": "PrimInStruct", 
    //         "type": "Int32", 
    //         "isArray": false, 
    //         "units": "", 
    //         "range": "0-1000", 
    //         "scale": "1", 
    //         "description": "A Primitive In Struct Example"
    //     }, 
    //     {
    //         "name": "EnumInStruct", 
    //         "type": "E_Mode", 
    //         "isArray": false, 
    //         "units": "", 
    //         "range": "", 
    //         "scale": "", 
    //         "description": "An Enum In Struct Example"
    //     }, 
    //     {
    //         "name": "ArrayInStruct", 
    //         "type": "Int32", 
    //         "isArray": true, 
    //         "units": "", 
    //         "range": "", 
    //         "scale": "", 
    //         "description": "An Array In Struct Example"
    //     }
    // ]
    const structFields = structType.fields;
    const onFieldValueUpdated = props.onFieldValueUpdated;
    const enums = props.enums;
    const structs = props.structs;
    const arrayIndex = props.arrayIndex;
    const values = field.value;

    const [innerValues, setInnerValues] = useState([]);

    useEffect(() => {
        setInnerValues(buildInnerValues(structFields, values));
    }, [structFields, values]);

    const buildInnerValues = (fields, values) => {
        if (Array.isArray(fields) && fields.length === Object.keys(values).length) {
            const ret = [];
            for (let i = 0; i < fields.length; i++) {
                const f = fields[i];
                const { 
                    name, 
                    type,
                    isArray, 
                    units, 
                    range, 
                    scale, 
                    description
                } = f //destructuring

                const v = values[name];
                if (Object.is(v, undefined) || Object.is(v, null)) {
                    break;
                }

                const newFieldValue = { name: name, type: type, 
                    isArray: isArray, units: units, range: range, scale: scale, 
                    description: description, value: v 
                }
                
                ret.push(newFieldValue);
            }
            
            return ret;
        }

        return (<NullViewer/>);
    };

    const onStructValueUpdated = (fieldName, newValue, param = undefined) => {
        // if (Array.isArray(innerValues)) {
        //     const valueIndex = getIndexInCollection(innerValues, 'name', fieldName);
        //     if (valueIndex >= 0) {
                
        //     }
        // }
        if (!(Object.is(values, undefined) || Object.is(values, null)) 
        && values.hasOwnProperty(fieldName)) {
            values[fieldName] = newValue;
        };

        if (!(Object.is(onFieldValueUpdated, undefined) || Object.is(onFieldValueUpdated, null))) {
            onFieldValueUpdated(field.name, values, {"index": arrayIndex})
        }
    };

    const renderValues = (_innerValues) => {
        if (!(Object.is(_innerValues, undefined) || Object.is(_innerValues, null)) && Array.isArray(_innerValues)) {
            const ret = _innerValues.map((innerValue) => {
                return (
                    <Grid item>
                        <FieldViewerWrapper field={innerValue} enums={enums} structs={structs} onFieldValueUpdated={onStructValueUpdated}/>
                    </Grid>
                );
            });

            return (
                <Box p={1} border={1} borderColor="blue">
                    <Grid container spacing={1} direction="column">
                        {ret}
                    </Grid>
                </Box>
            );
        }

        return <NullViewer/>;
    };

    return (
        <div id="struct-viewer-div">
            {renderValues(innerValues)}
        </div>
    )
}
