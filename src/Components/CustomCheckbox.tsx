import { Checkbox } from '@material-ui/core';
import React, { useState } from 'react';
import { FormGroup, FormControlLabel } from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBoxOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        color: '#b2afa1',
        '&:checked': {
            color:'#69665C',
        }
    },
    checked: {
    },
    label:{
        color: '#b2afa1',
    },
    checkedLabel:{
        color:'#69665C',
    }
})
export const CustomCheckbox = () => {
    const [value, setValue] = useState<boolean>(false);
    const classes = useStyles();
    return (
        <FormControlLabel
            className={value ? classes.checkedLabel : classes.label}
            control={<Checkbox
                classes={{
                    root: classes.root,
                    checked: classes.checked
                }}
                disableFocusRipple
                disableRipple
                checked={value}
                onChange={() => setValue(!value)}
                name="Something"
                color='default'
                checkedIcon={<CheckBoxIcon />}
            />}
            label="Secondary"
        />
    )
}