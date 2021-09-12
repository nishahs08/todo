import { Grid, Typography } from "@material-ui/core";
import { CustomButton } from "./CustomButton";
import { TextBox } from "./TextBox";
import { Tag } from "./Tag";

const categories = [
  { type: "work", color: "#d2ceff" },
  { type: "study", color: "#d1e5f7" },
  { type: "entertainment", color: "#ffcece" },
  { type: "family", color: "#daf2d6" },
];

const TagsWithLabel=()=>{
    return(
        <Grid container direction='row' alignItems='center' style={{ background:'#eeeeee',padding:'2px',borderRadius:'10px'}}>
        <Grid item  style={{padding:'5px'}}> <Tag color="#d2ceff"/></Grid>
        <Grid item style={{padding:'5px'}}><Typography>work</Typography></Grid>
        </Grid>
    )
}
export const Form = () => {
  return (
    <Grid container direction="column">
      <Grid item>
          <Grid container justifyContent='space-between'>
              <Grid item>
              <CustomButton label="Cancel"/>
              </Grid>
              <Grid item>
              <CustomButton label="Add"/>
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
         
        <Grid container direction='row'>
            <Grid item style={{marginRight:'10px'}}><TagsWithLabel/></Grid>
              <Grid item style={{marginRight:'10px'}}><TagsWithLabel/></Grid>
              <Grid item style={{marginRight:'10px'}}><TagsWithLabel/></Grid>
              <Grid item style={{marginRight:'10px'}}><TagsWithLabel/></Grid>
        </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
