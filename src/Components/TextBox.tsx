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

interface TextBoxProps{
    label:string,


}
export const TextBox :React.FC<TextBoxProps>= ({label}) => {
   const classes=useStyles();
    return (
        <>
            <InputLabel className={classes.label}>{label}</InputLabel>
            <TextField className={classes.root} variant='outlined' fullWidth placeholder='placeholder' InputProps={{classes:{notchedOutline:classes.noBorder}}}></TextField>
        </>
    )
}