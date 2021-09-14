import {
    makeStyles,
    Grid,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogContent,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import { CustomCheckbox } from "./CustomCheckbox";
import { Tag } from "./Tag";
import EditBtn from "@material-ui/icons/MoreHoriz";
import { useState } from "react";
//@ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { ICategory, ITodo, ICategoryType } from "../types";
import { EditForm } from "../Components/EditForm";
const useStyles = makeStyles({
    root: {},
});

interface TodosProps {
    categories: ICategory[];
    todos: ITodo[];
    setTodos: (value: ITodo[]) => void;
}
export const Todos: React.FC<TodosProps> = ({
    todos,
    categories,
    setTodos,
}) => {
    const classes = useStyles();
    const [anchorEls, setAnchorEls] = useState<(null | HTMLElement)[]>([]);
    const [openForm, setopenForm] = useState<boolean>(false);
    const [todoId, setTodoId] = useState<string>("");
    const [todoToEdit, setTodoToEdit] = useState<ITodo | null>(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const handleClick = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
        const newAnchorEls = [...anchorEls];
        newAnchorEls[index] = event.currentTarget;
        setAnchorEls(newAnchorEls);
    };

    const handleClose = (index: number) => {
        const newAnchorEls = [...anchorEls];
        newAnchorEls[index] = null;
        setAnchorEls(newAnchorEls);
    };

    const handleChange = (value: boolean, id: string) => {
        const temTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.done = !todo.done;
            }
            return todo;
        });

        setTodos(temTodos);
        console.log(value, id, temTodos);
    };

    const edit = (id: string, index: number) => {
        console.log("ooooo", id);
        setTodoId(id);
        handleClose(index);
        setopenForm(true);
    };

    const deleteTodo = (id: any, index: number) => {
        setTodoId(id);
        handleClose(index);
        const newTodos = todos.filter((todo) => {
            if (todo.id !== id) {
                return todo;
            }
        });
        setTodos(newTodos);
        alert("Are you Sure you wanna delete? ");
    };
    return (
        <>
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 900: 3 }}>
                <Masonry>
                    {todos.map(({ title, description, done, tags, id }, index) => (
                        <Card
                            style={{ backgroundColor: "#fff9de", margin: "20px" }}
                            key={id}
                        >
                            <CardHeader
                                onClick={(e: any) => console.log('eeeee', id)}
                                action={
                                    <IconButton onClick={(e) => handleClick(index, e)}>
                                        <EditBtn />
                                    </IconButton>
                                }
                                title={title}
                                style={{ textDecorationLine: done ? "line-through" : "none" }}
                            />
                            <Menu
                                onClick={(e: any) => console.log('eeeee', id)}
                                id="simple-menu"
                                anchorEl={anchorEls[index]}
                                keepMounted
                                open={Boolean(anchorEls[index])}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={(e) => edit(id, index)}>EDIT</MenuItem>
                                <MenuItem onClick={() => deleteTodo(id, index)}>DELETE</MenuItem>
                            </Menu>

                            <CardContent
                                onClick={(e: any) => console.log('eeeee', id)}
                                style={{ textDecorationLine: done ? "line-through" : "none" }}
                            >
                                {description}
                            </CardContent>
                            <CardActions>
                                <Grid
                                    container
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Grid container spacing={1}>
                                            {tags
                                                .map((id) => {
                                                    const category = categories.find(
                                                        (category) => category.id === id
                                                    );
                                                    if (category)
                                                        return (
                                                            <>
                                                                <Grid item>
                                                                    {" "}
                                                                    <Tag color={category.color}></Tag>
                                                                </Grid>
                                                            </>
                                                        );
                                                })
                                                .filter((element) => element)}
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <CustomCheckbox
                                            label="Done"
                                            checked={done}
                                            setChecked={(value) => handleChange(value, id)}
                                        />
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
            {openForm && (
                <Dialog open={openForm} fullScreen={fullScreen}>
                    <DialogContent>
                        <EditForm
                            cancel={() => setopenForm(false)}
                            categories={categories}
                            setTodos={setTodos}
                            todos={todos}
                            setopenForm={setopenForm}
                            id={todoId}
                        ></EditForm>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};