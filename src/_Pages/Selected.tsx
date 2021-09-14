import { Grid, Typography, Hidden, makeStyles } from "@material-ui/core";
import { CustomButton } from "./CustomButton";
import { TextBox } from "./TextBox";
import { Tag } from "./Tag";
import { Categories } from "./Categories";
import { category, categoryType, todo } from "../types";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
    selected: {
      backgroundColor: '#b2afa1',
      margin: '5px',
      borderRadius: '5px'
    },
    notSelected: {
      margin: '5px'
    }
  })
interface SelectedTagsProps{
    selected : categoryType[],
    categories : category[],
    setSelected:(value:categoryType[])=>void
}
export const SelectedTags:React.FC<SelectedTagsProps> =({selected,categories,setSelected})=>{
    const classes = useStyles();
    const handleSelected = (value: categoryType) => {
        const activeState = selected.find(s => s === value);
        if (activeState) {
          const filtered = selected.filter((s) => s !== activeState);
          console.log("filter", filtered)
          setSelected(filtered)
        } else {
          console.log("add", selected)
          setSelected([...selected, value])
        }
      }
    return <>
        <Hidden smDown>
              <Grid container >
                {categories.map(({ color, type }, i) => (
                  <Grid item key={i} className={selected.includes(type) ? classes.selected : classes.notSelected}>
                    <Categories color={color} type={type} setActiveState={(type) => handleSelected(type)} />
                  </Grid>
                ))
                }

              </Grid>
            </Hidden>

            <Hidden mdUp >
              <Grid container direction="column" >
                {categories.map(({ color, type }, i) => (
                  <Grid item key={i} className={selected.includes(type) ? classes.selected : classes.notSelected}>
                    <Categories color={color} type={type} setActiveState={(type) => handleSelected(type)} />
                  </Grid>
                ))
                }

              </Grid>
            </Hidden>
    </>
}