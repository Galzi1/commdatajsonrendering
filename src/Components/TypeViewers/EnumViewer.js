import React, {useState, useEffect} from 'react';
import {isNumber, isFloat, convertString} from '../../Utils/TypesUtils';
import {isStringNumeric} from '../../Utils/GeneralUtils';
import PrimitiveViewer from './PrimitiveViewer';
import shortid from 'shortid';

export default function EnumViewer(props) {
    const field = props.field;
    // "name": "Enum1", 
    // "type": "E_Mode", 
    // "isArray": false, 
    // "units": "", 
    // "range": "", 
    // "scale": "", 
    // "description": "An Enum Example", 
    // "value": 1
    const enumType = props.enumType;
    // "name": "E_Mode", 
    // "basetype": "Byte", 
    // "values": [
    //     {
    //         "name": "DISCONNECTED", 
    //         "value": 0
    //     }, 
    //     {
    //         "name": "CONNECTED", 
    //         "value": 1
    //     }, 
    //     {
    //         "name": "PENDING", 
    //         "value": 2
    //     }
    // ]
    const onFieldValueUpdated = props.onFieldValueUpdated;
    const arrayIndex = props.arrayIndex;

    const [currValue, setCurrValue] = useState(field.value);
    const [enumOptions, setEnumOptions] = useState([]);

    useEffect(() => {
        if (!(Object.is(enumType, undefined) || Object.is(enumType, null))) {
            getEnumOptions(enumType);
        }
    }, [enumType]);

    const getEnumOptions = (enumType) => {
        setEnumOptions(enumType.values);
    };

    const onEnumValueChanged = (enumValue) => {
        const convertedValue = convertString(enumValue, enumType.basetype);
        setCurrValue(convertedValue);
        onFieldValueUpdated(field.name, convertedValue, {"index": arrayIndex});
    };

    return (
        <div id="enum-viewer-div">
            <select value={currValue} 
            onChange={e => onEnumValueChanged(e.target.value)} 
            className="form-control form-control-sm text-align-left no-rtl">
            {
                enumOptions.map((enumOption, index) =>
                    <option key={shortid.generate()} value={enumOption.value}>{enumOption.name}</option>
                )
            }
            </select>
        </div>
    );
}
