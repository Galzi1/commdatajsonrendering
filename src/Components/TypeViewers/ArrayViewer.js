import React, {Fragment, useState, useEffect} from 'react';
import NullViewer from './NullViewer';
import FieldViewerWrapper from './FieldViewerWrapper';
import {convertString} from '../../Utils/GeneralUtils';
import {TextField} from '@material-ui/core';

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
    const values = field.value;
    const arrayIndex = props.arrayIndex;
    
    const [innerFields, setInnerFields] = useState([]);
    const [arrayLength, setArrayLength] = useState(0);

    useEffect(() => {
        if (!(Object.is(values, undefined) || Object.is(values, null)) && Array.isArray(values)) {
            setArrayLength(values.length)
        };
        setInnerFields(buildInnerFields(field, values));
    }, [field, values]);

    const buildInnerFields = (field, values) => {
        const { 
            name, 
            type,
            isArray, 
            units, 
            range, 
            scale, 
            description, 
            p_value
        } = field //destructuring
        const ret = values.map(v => ({ name: name, type: type, 
            isArray: false, units: units, range: range, scale: scale, 
            description: description + " item", value: v}));
        return ret;
    };

    const onArrayValueUpdated = (fieldName, newValue, params = undefined) => {
        let index = -1;
        if (!(Object.is(params, undefined) || Object.is(params, null))) {
            index = params['index'];
        };

        if (!(Object.is(index, undefined) || Object.is(index, null)) 
        && index >= 0 && index < values.length) {
            // values[index] = convertString(newValue, field.type);
            values[index] = newValue;
            //TODO: Adjust to length

            if (!(Object.is(onFieldValueUpdated, undefined) || Object.is(onFieldValueUpdated, null))) {
                onFieldValueUpdated(field.name, values, {"index": arrayIndex})
            }
        };
    };

    const renderValues = (_innerFields) => {
        if (!(Object.is(_innerFields, undefined) || Object.is(_innerFields, null)) && Array.isArray(values)) {
            const innerFieldsComponents = _innerFields.map((innerField, index) => {
                const wrapper = (<FieldViewerWrapper field={innerField} enums={enums} structs={structs} onFieldValueUpdated={onArrayValueUpdated} arrayIndex={index}/>);
                return wrapper;
            });
            
            return (
                <Fragment>
                    <TextField
                        label="גודל המערך"
                        defaultValue={arrayLength}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                        margin="dense"
                    />
                    <br/>
                    {innerFieldsComponents}
                </Fragment>
            );
        }

        return <NullViewer/>;
    };

    return (
        <div id="array-viewer-div">
            {renderValues(innerFields)}
        </div>
    )
}
