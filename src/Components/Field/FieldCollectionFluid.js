import React, {Fragment} from 'react';
import FieldFluid from './FieldFluid';
import {Grid} from '@material-ui/core';
import '../../App.css';
import shortid from 'shortid';

export default function FieldCollectionFluid(props) {
    const enums = props.enums;
    const structs = props.structs;
    const fields = props.fields;
    const onFieldValueUpdated = props.onFieldValueUpdated;
    
    const renderFields = () => {
        return fields.map((field, index) => {
            // const { 
            //     name, 
            //     type,
            //     isArray, 
            //     units, 
            //     range, 
            //     scale, 
            //     description, 
            //     value
            // } = field //destructuring
            return (
                <FieldFluid key={shortid.generate()} id={index} field={field} enums={enums} structs={structs} onFieldValueUpdated={onFieldValueUpdated}/>
            )
        })
    };

    return (
        <Fragment>
            <Grid id="FieldCollectionFluid" container item spacing={3}>
                {renderFields()}
            </Grid>
            {/* <TableContainer style={TableWrapperStyle}>
                <Table>
                    <TableHead className="bg-primary">
                        <TableRow>
                            <StyledTableCell align="center" scope="col">#</StyledTableCell>
                            <StyledTableCell align="center" scope="col">שם</StyledTableCell>
                            <StyledTableCell align="center" scope="col">סוג</StyledTableCell>
                            <StyledTableCell align="center" scope="col">האם מערך?</StyledTableCell>
                            <StyledTableCell align="center" scope="col">יחידות</StyledTableCell>
                            <StyledTableCell align="center" scope="col">טווח</StyledTableCell>
                            <StyledTableCell align="center" scope="col">סקאלה</StyledTableCell>
                            <StyledTableCell align="center" scope="col">תיאור</StyledTableCell>
                            <StyledTableCell align="center" scope="col">ערך</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderFields()}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </Fragment>
    )
}