import { makeStyles, Grid, Card, CardHeader, CardActions, CardContent, IconButton, Menu, MenuItem } from '@material-ui/core';
import { CustomCheckbox } from './CustomCheckbox';
import { Tag } from './Tag';
import EditBtn from '@material-ui/icons/MoreHoriz';
import { useState } from 'react';
//@ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { Categories } from './Categories';
import { Category } from '@material-ui/icons';
import { category, todo, categoryType } from '../types'
const useStyles = makeStyles({
    root: {

    }
})

interface TodosProps {
    categories: category[],
    todos: todo[],
    setTodos: (value: todo[]) => void;
}
export const Todos: React.FC<TodosProps> = ({ todos, categories,setTodos }) => {
    const classes = useStyles();
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (value: boolean, id: string) => {
        const temTodos = todos.map(todo =>{
            if(todo.id === id){
                todo.done=!todo.done
            }
            return todo
         } );

setTodos(temTodos)
        console.log(value, id,temTodos)
    }
    return (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 900: 3 }}>
            <Masonry>
                {
                    todos.map(({ title, description, done, tags, id }) => (
                        <Card style={{ backgroundColor: "#fff9de", margin: '20px' }} key={id}>
                            <CardHeader action={<IconButton onClick={handleClick}><EditBtn /></IconButton>} title={title} style={{textDecorationLine: done ? 'line-through' : 'none'}}/>
                            <Menu id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}>
                                <MenuItem onClick={handleClose}>EDIT</MenuItem>
                                <MenuItem onClick={handleClose}>DELETE</MenuItem>
                            </Menu>
                            <CardContent  style={{textDecorationLine: done ? 'line-through' : 'none'}}>{description}</CardContent>
                            <CardActions>
                                <Grid container justifyContent='space-between' alignItems="center">
                                    <Grid item>
                                        <Grid container spacing={1}>
                                            {
                                                tags.map(id => {
                                                    const category = categories.find(category => (category.id === id));
                                                    if (category)
                                                        return <>
                                                            <Grid item> <Tag color={category.color}></Tag></Grid>
                                                        </>

                                                }).filter(element => element)
                                            }
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <CustomCheckbox label="Done" checked={done} setChecked={(value) => handleChange(value, id)} />
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    ))
                }


            </Masonry>


        </ResponsiveMasonry>
    )
}