import {Button} from '@material-ui/core';

interface CustomButtomProps{
 label:string
}

export const CustomButton:React.FC<CustomButtomProps> = ({label})=>{
    return(
        <Button style={{backgroundColor:'#69665c',color:'#fff',borderRadius:'10px',textTransform:'none'}} >{label}</Button>
    )
}