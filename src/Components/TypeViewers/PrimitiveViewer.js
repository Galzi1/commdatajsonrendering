import React, {useState, useEffect} from 'react';
import {isNumber, isFloat, convertString} from '../../Utils/TypesUtils';
import {isStringNumeric} from '../../Utils/GeneralUtils';

export default function PrimitiveViewer(props) {
    const field = props.field;
    // "name": "Prim1", 
    // "type": "Int32", 
    // "isArray": false, 
    // "units": "", 
    // "range": "0-1000", 
    // "scale": "1", 
    // "description": "A Primitive Example", 
    // "value": 123
    const onFieldValueUpdated = props.onFieldValueUpdated;
    const arrayIndex = props.arrayIndex;
    const valueState = props.valueState;

    const [value, setValue] = (Object.is(valueState, undefined) || Object.is(valueState, null)) 
        ? useState(field.value) 
        : valueState;

    const [inputType, setInputType] = useState("text");
    const [inputStep, setInputStep] = useState("");

    useEffect(() => {
        if (!(Object.is(field, undefined) || Object.is(field, null))) {
            selectInputType(field);
        }
    }, [field]);

    const selectInputType = (_field) => {
        if (isNumber(_field.type)) {
            setInputType("number");
            if (isFloat(_field.type) && isStringNumeric(_field.scale)) {
                setInputStep(_field.scale);
            }
        }
        else {
            setInputType("text");
        }
    };

    const onValueChanged = (e) => {
        const newValue = e.target.value;
        const convertedValue = convertString(newValue, field.type);
        console.log(convertedValue);
        setValue(convertedValue);
        onFieldValueUpdated(field.name, convertedValue, {"index": arrayIndex});
    };

    return (
        <input id="primitive-viewer-input" value={value} 
            onChange={onValueChanged} type={inputType} step={inputStep} 
            className="form-control form-control-sm" placeholder=""/>
    );
}
