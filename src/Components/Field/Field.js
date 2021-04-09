import React, { useEffect, useState } from 'react';
import {StyledTableCell, StyledTableRow} from '../../TableStyle';
import '../../App.css';
import fieldViewerFactory from '../TypeViewers/FieldViewerFactory';

const boolToStr = (flag) => {
    return flag ? "כן" : "לא";
};

export default function Field(props) {
    const field = props.field;
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
    const id = props.id;
    const enums = props.enums;
    const structs = props.structs;
    const onFieldValueUpdated = props.onFieldValueUpdated;

    return (
        <StyledTableRow key={id}>
            <StyledTableCell align="center">{id}</StyledTableCell>
            <StyledTableCell align="center">{name}</StyledTableCell>
            <StyledTableCell align="center">{type}</StyledTableCell>
            <StyledTableCell align="center">{boolToStr(isArray)}</StyledTableCell>
            <StyledTableCell align="center">{units}</StyledTableCell>
            <StyledTableCell align="center">{range}</StyledTableCell>
            <StyledTableCell align="center">{scale}</StyledTableCell>
            <StyledTableCell align="center">{description}</StyledTableCell>
            <StyledTableCell align="center">
                {fieldViewerFactory({
                    field: field, 
                    enums: enums, 
                    structs: structs, 
                    onFieldValueUpdated: onFieldValueUpdated
                })}
            </StyledTableCell>
        </StyledTableRow>
    )
}

//id={index} name={name} type={type} isArray={isArray} units={units} range={range} scale={scale} description={description} value={value} enums={enums} structs={structs} onFieldValueUpdated={onFieldValueUpdated}