import React, {useState} from 'react';
import KeyValueTableRow from '../General/KeyValueTableRow';
import { Grid, Popper, Paper, TableContainer, Table, TableBody, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

const boolToStr = (flag) => {
    return flag ? "כן" : "לא";
};

export default function DynamicArrayControls(props) {
    const plusHandler = props.plusHandler;
    const minusHandler = props.minusHandler;

    return (
        <Grid container spacing={1}>
            <Grid item>
                <IconButton onClick={plusHandler} style={{maxHeight: 20, maxWidth: 20}}>
                    <FontAwesomeIcon icon={faPlusCircle}/>
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton onClick={minusHandler} style={{maxHeight: 20, maxWidth: 20}}>
                    <FontAwesomeIcon icon={faMinusCircle}/>
                </IconButton>
            </Grid>
            
        </Grid>
    );
}