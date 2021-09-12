import { Grid, Typography,Hidden } from "@material-ui/core";
import { CustomButton } from "./CustomButton";
import { TextBox } from "./TextBox";
import { Tag } from "./Tag";
import { Categories } from "./Categories";
import { category,categoryType } from "../types";
import { useState } from "react";

const TagsWithLabel=()=>{
    return(
        <Grid container direction='row' alignItems='center' style={{ background:'#eeeeee',padding:'2px',borderRadius:'10px'}}>
        <Grid item  style={{padding:'5px'}}> <Tag color="#d2ceff"/></Grid>
        <Grid item style={{padding:'5px'}}><Typography>work</Typography></Grid>
        </Grid>
    )
}
interface FormProps{
  cancel:()=>void,
  categories:category[]
}
export const Form :React.FC<FormProps>= ({cancel,categories}) => {
  const [activeCategory, setActiveCategory] = useState<categoryType>('all');
  return (
    <Grid container direction="column" spacing={2} >
      <Grid item >
          <Grid container justifyContent='space-between'>
              <Grid item>
              <CustomButton label="Cancel" onClick={()=>cancel()}/>
              </Grid>
              <Grid item>
              <CustomButton label="Add" onClick={()=>cancel()}/>
              </Grid>
          </Grid>
      </Grid>
      <Grid item>
        <TextBox label="Title" />
      </Grid>
      <Grid item>
        <TextBox label="Description" />
      </Grid>
      <Grid item>
        <Grid container direction='column'>
          <Grid item>
            <Typography>Tags</Typography>
          </Grid>
          <Grid item >
         
        {/* <Grid container direction='row'>
            <Grid item style={{marginRight:'10px'}}><TagsWithLabel/></Grid>
              <Grid item style={{marginRight:'10px'}}><TagsWithLabel/></Grid>
              <Grid item style={{marginRight:'10px'}}><TagsWithLabel/></Grid>
              <Grid item style={{marginRight:'10px'}}><TagsWithLabel/></Grid>
        </Grid> */}
            <Hidden smDown>
            <Grid container >
          {categories.map(({ color, type }, i) => (
								<Grid item key={i}>
									<Categories color={color} type={type} setActiveState={setActiveCategory} />
								</Grid>
							))
							}
       
        </Grid>
            </Hidden>
       
        <Hidden mdUp >
        <Grid container direction="column">
          {categories.map(({ color, type }, i) => (
								<Grid item key={i}>
									<Categories color={color} type={type} setActiveState={setActiveCategory} />
								</Grid>
							))
							}
       
        </Grid>
        </Hidden>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
