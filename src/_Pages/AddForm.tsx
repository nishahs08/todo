import { Grid, Typography, Hidden, makeStyles } from "@material-ui/core";
import { CustomButton } from "../Components/CustomButton";
import { TextBox } from "./TextBox";
import { CategoriesChips } from "./CategoriesChips";

import { category, categoryType, todo } from "../types";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const useStyles = makeStyles({
  selected: {
    backgroundColor: "#b2afa1",
    margin: "5px",
    borderRadius: "5px",
  },
  notSelected: {
    margin: "5px",
  },
});

interface AddFormProps {
  categories: category[];
  addTodo: (value: todo) => void;
  dismissPopup: () => void;
}
export const AddForm: React.FC<AddFormProps> = ({
  categories,
  addTodo,
  dismissPopup,
}) => {
  const [selected, setSelected] = useState<categoryType[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const add = () => {
    const tagIds = categories
      .filter((c) => {
        return selected.includes(c.type);
      })
      .map((item) => item.id);

    const todo: todo = {
      title: title,
      description: description,
      tags: tagIds,
      id: uuidv4(),
      done: false,
    };

    addTodo(todo);
    dismissPopup();
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid container justifyContent="space-between">
          <Grid item>
            <CustomButton label="Cancel" onClick={dismissPopup} />
          </Grid>

          <Grid item>
            <CustomButton label="Add" onClick={add} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <TextBox label="Title" value={title} setValue={setTitle} />
      </Grid>
      <Grid item>
        <TextBox
          label="Description"
          value={description}
          setValue={setDescription}
        />
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Typography>Tags</Typography>
          </Grid>
          <Grid item>
            <CategoriesChips
              selectedCategories={selected}
              setSelectedCategories={setSelected}
              categories={categories}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
