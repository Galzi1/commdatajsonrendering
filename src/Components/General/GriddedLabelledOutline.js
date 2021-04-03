import React from 'react';
import {Grid} from '@material-ui/core';
import '../../App.css';
import LabelledOutline from './LabelledOutline';

export default function GriddedLabelledOutline(props) {

    return (
        <Grid item>
            <LabelledOutline {...props}/>
        </Grid>
    )
}
