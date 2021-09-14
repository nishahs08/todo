import { Grid, Typography, Hidden, makeStyles } from "@material-ui/core";
import { CustomButton } from "../Components/CustomButton";
import { TextBox } from  "./TextBox";
import { SelectedTags } from './Selected';

import { Tag } from "./Tag";
import { Categories } from "./Categories";
import { category, categoryType, todo } from "../types";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
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


interface AddFormProps {
  categories: category[],
  setTodo: (value: todo) => void;
  setOpen: (value: boolean) => void;

}
export const AddForm: React.FC<AddFormProps> = ({ categories, setTodo, setOpen }) => {
  const [selected, setSelected] = useState<categoryType[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const add = () => {
    const tagIds = categories.filter((c) => {
      return selected.includes(c.type)
    }
    ).map(item => item.id)

    const todo: todo = {
      title: title,
      description: description,
      tags: tagIds,
      id: uuidv4(),
      done: false

    }

    setTodo(todo)
    setOpen(false)
  }

  useEffect(() => { console.log("selected", selected) }, [selected])
  return (
    <Grid container direction="column" spacing={2} >
      <Grid item >
        <Grid container justifyContent='space-between'>
          <Grid item>
            <CustomButton label="Cancel" onClick={() => setOpen(false)} />
          </Grid>

          <Grid item>
            <CustomButton label="Add" onClick={() => add()} />
          </Grid> </Grid>
      </Grid>
      <Grid item>
        <TextBox label="Title" value={title} setValue={setTitle} />
      </Grid>
      <Grid item>
        <TextBox label="Description" value={description} setValue={setDescription} />
      </Grid>
      <Grid item>
        <Grid container direction='column'>
          <Grid item>
            <Typography>Tags</Typography>
          </Grid>
          <Grid item >
            <SelectedTags selected={selected} setSelected={setSelected} categories={categories} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
