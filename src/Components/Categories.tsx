import { useState } from "react"
import { Tag } from "./Tag";
import {Typography,Grid} from '@material-ui/core'

interface CategoriesProps{
    categories:{type:string,color:string}[]
}
export const Categories:React.FC<CategoriesProps>=({categories})=>{
   
    return(
        <>
            {categories.map(({color,type})=>(
            <>
            <Grid container spacing={1} style={{padding:'10px'}}>
                <Grid item> <Tag color={color} /> </Grid>
                <Grid item><Typography>{type}</Typography></Grid>
            </Grid>
         </>
            ))}     
        </>
    )
}