import { InputLabel, TextField,Input } from "@material-ui/core"

import {makeStyles} from '@material-ui/styles';
const useStyles=makeStyles({
     noBorder:{
         border:'none',
    
     },
     root:{      
            background:'#eeeeee'
     }  ,
     label:{
       color: '#69665c',
       fontSize:'20px',
       fontWeight:400
     } 
})
export const TextBox = () => {
   const classes=useStyles();
    return (
        <>
            <InputLabel className={classes.label}>Text Box</InputLabel>
            <TextField className={classes.root} variant='outlined' fullWidth placeholder='placeholder' InputProps={{classes:{notchedOutline:classes.noBorder}}}></TextField>
        </>
    )
}