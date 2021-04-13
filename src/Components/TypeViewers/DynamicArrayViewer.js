import React, {useState, useEffect} from 'react';
import ArrayViewer from './ArrayViewer';
import {Box} from '@material-ui/core';
import LabelledOutline from '../General/LabelledOutline';
import DynamicArrayControls from './DynamicArrayControls';
import {buildFieldValues, createEmptyField, defaultValues, typesSizes} from '../../Utils/TypesUtils';
import {useCommDataLength, useSetCommDataLength} from '../../Utils/CommDataLengthContext';

export default function DynamicArrayViewer(props) {
    const field = props.field;
    const onFieldValueUpdated = props.onFieldValueUpdated;
    
    const lengthComponent = props.lengthComponent;
    const initialLength = props.initialLength;
    
    const [values, setValues] = useState(field.value);
    const [arrayLength, setArrayLength] = useState(0);
    const [innerFields, setInnerFields] = useState([]);
    const commDataLength = useCommDataLength();
    const setCommDataLength = useSetCommDataLength();

    useEffect(() => {
        if (!(Object.is(initialLength, undefined) || Object.is(initialLength, null))) {
            setArrayLength(initialLength);
        }
        else if (!(Object.is(values, undefined) || Object.is(values, null)) && Array.isArray(values)) {
            setArrayLength(values.length);
        };
    }, [values, lengthComponent]);

    useEffect(() => {
        if (!(Object.is(values, undefined) || Object.is(values, null)) && Array.isArray(values)) {
            setArrayLength(values.length)
        };
        setInnerFields(buildFieldValues(field, values));
    }, [field, values]);

    const renderLengthComponent = () => {
        const childrenWithProps = React.Children.map(lengthComponent.props.children, child => {
            // checking isValidElement is the safe way and avoids a typescript error too
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {valueState: [arrayLength, setArrayLength]});
            };
            return child;
        });
    
        const comp = React.cloneElement(
            lengthComponent,
            {children: childrenWithProps}
        );
        return comp;
    };

    const addItemToArray = (event) => {
        setArrayLength(arrayLength + 1);
        setInnerFields(innerFields.concat(createEmptyField(field)));
        values.push(defaultValues.get(field.type.toLowerCase()));

        setCommDataLength(commDataLength + typesSizes.get(field.type.toLowerCase()));
    };

    const removeItemFromArray = (event) => {
        if (!(Object.is(arrayLength, undefined) || Object.is(arrayLength, null)) && arrayLength > 0) {
            setArrayLength(arrayLength - 1);
        }
        else {
            setArrayLength(0);
        };
        
        if (!(Object.is(innerFields, undefined) || Object.is(innerFields, null)) && Array.isArray(innerFields) && innerFields.length > 0) {
            setInnerFields(innerFields.splice(0,innerFields.length-1));
        };

        if (!(Object.is(values, undefined) || Object.is(values, null)) && Array.isArray(values) && values.length > 0) {
            values.pop();
        };

        if (!(Object.is(commDataLength, undefined) || Object.is(commDataLength, null)) && values.length > 0) {
            setCommDataLength(commDataLength - typesSizes.get(field.type.toLowerCase()));
        };
    };

    return (
        <Box id="array-viewer-div" p={1} border={1} borderColor="red">
            <LabelledOutline label="גודל המערך" button={<DynamicArrayControls plusHandler={addItemToArray} minusHandler={removeItemFromArray}/>}>
                {renderLengthComponent()}
            </LabelledOutline>
            <ArrayViewer {...props} values={values} lengthState={[arrayLength, setArrayLength]} 
                valueState={[innerFields, setInnerFields]} drawBorder={false}/>
        </Box>
            
    )
}
