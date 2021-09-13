import { Grid, Typography, Hidden, makeStyles } from "@material-ui/core";
import { CustomButton } from "./CustomButton";
import { TextBox } from "./TextBox";
import { Tag } from "./Tag";
import { Categories } from "./Categories";
import { category, categoryType, todo } from "../types";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
const useStyles = makeStyles({
  selected: {
    backgroundColor: 'red',
    margin: '5px'
  },
  notSelected: {
    backgroundColor: 'blue'
  }
})

const TagsWithLabel = () => {
  return (
    <Grid container direction='row' alignItems='center' style={{ background: '#eeeeee', padding: '2px', borderRadius: '10px' }}>
      <Grid item style={{ padding: '5px' }}> <Tag color="#d2ceff" /></Grid>
      <Grid item style={{ padding: '5px' }}><Typography>work</Typography></Grid>
    </Grid>
  )
}

interface EditFormProps {
  cancel: () => void,
  categories: category[],
	todos: todo[];
	setTodos: (value: todo[]) => void;
  setopenForm:(value:boolean)=>void;
  id:string
}
export const EditForm: React.FC<EditFormProps> = ({ cancel, categories ,todos,setTodos,setopenForm,id}) => {
  const [selected, setSelected] = useState<categoryType[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const classes = useStyles();
  const handleSelected = (value: categoryType) => {
   
    const activeState = selected.find(s => s === value);
    if (activeState) {
      const filtered = selected.filter((s) => s !== activeState);
      console.log("filter",filtered)
      setSelected(filtered)
    } else {
      console.log("add",selected)
      setSelected([...selected,value])
    }
  }

  const edit = () =>{
     const updatedTodo = todos.map(todo=>{
         if(todo.id === id){
             return {
                title: title,
                description: description,
                tags:[2,3,1],
                id:uuidv4(),done:false
              }
         }else{
             return todo
         }
     })
     setTodos(updatedTodo);
     setopenForm(false)
  }
 
  useEffect(() => {console.log("selected", selected)},[selected])
  return (
    <Grid container direction="column" spacing={2} >
      <Grid item >
        <Grid container justifyContent='space-between'>
          <Grid item>
            <CustomButton label="Cancel" onClick={() => setopenForm(false)} />
          </Grid>
      
          <Grid item>
            <CustomButton label="Edit" onClick={edit} />
          </Grid>

        </Grid>
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
                  <Grid item key={i}>
                    <Categories color={color} type={type} setActiveState={(type) => handleSelected(type)} />
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
