import { useState } from "react"
import { Tag } from "./Tag";
import {Typography,Grid} from '@material-ui/core'

interface CategoriesProps{
  type:string,
  color:string
}
export const Categories:React.FC<CategoriesProps>=({type,color})=>{
   
    return(
        <>
        
            <Grid container spacing={1} style={{padding:'10px'}} >
                <Grid item> <Tag color={color} /> </Grid>
                <Grid item><Typography>{type}</Typography></Grid>
            </Grid>
       
        </>
    )
}