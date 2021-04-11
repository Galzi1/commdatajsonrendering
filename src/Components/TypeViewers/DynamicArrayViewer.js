import React, {useState, useEffect} from 'react';
import ArrayViewer from './ArrayViewer';
import {Box} from '@material-ui/core';
import LabelledOutline from '../General/LabelledOutline';
import DynamicArrayControls from './DynamicArrayControls';
import {buildFieldValues, createEmptyField, defaultValues} from '../../Utils/TypesUtils';

export default function DynamicArrayViewer(props) {
    const field = props.field;
    
    const lengthComponent = props.lengthComponent;
    const initialLength = props.initialLength;
    
    const [values, setValues] = useState(field.value);
    const [arrayLength, setArrayLength] = useState(0);
    const [innerFields, setInnerFields] = useState([]);

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
    };

    const removeItemFromArray = (event) => {
        setArrayLength(arrayLength - 1);
        if (!(Object.is(innerFields, undefined) || Object.is(innerFields, null)) && Array.isArray(innerFields) && innerFields.length > 0) {
            setInnerFields(innerFields.splice(0,innerFields.length-1));
        };
        if (!(Object.is(values, undefined) || Object.is(values, null)) && Array.isArray(values) && values.length > 0) {
            values.pop();
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
