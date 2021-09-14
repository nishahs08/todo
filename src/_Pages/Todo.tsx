
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
import { useState } from "react";
import { ICategory, ITodo } from "../types";
import { CustomCheckbox } from "./CustomCheckbox";
import { Tag } from "./Tag";
import EditBtn from "@material-ui/icons/MoreHoriz";

interface TodoProps {
    todo: ITodo,
    key: any,
    categories: ICategory[];
    changeTodoDoneStatus: (value: boolean, id: string) => void;
    setOpenEdit: (value: boolean) => void;
    editTodo: (value: string) => void
}
export const Todo: React.FC<TodoProps> = ({ todo, key, categories, changeTodoDoneStatus, editTodo, setOpenEdit }) => {
    const [anchorEls, setAnchorEls] = useState<(null | HTMLElement)[]>([]);

    const handleClick = (key: number, event: React.MouseEvent<HTMLButtonElement>) => {
        const newAnchorEls = [...anchorEls];
        newAnchorEls[key] = event.currentTarget;
        setAnchorEls(newAnchorEls);
    };

    const handleClose = (key: number) => {
        const newAnchorEls = [...anchorEls];
        newAnchorEls[key] = null;
        setAnchorEls(newAnchorEls);
    };


    return <Card
        style={{ backgroundColor: "#fff9de", margin: "20px" }}
        key={todo.id}
    >
        <CardHeader
            action={
                <IconButton onClick={(e) => {
                    handleClick(key, e)

                }}>
                    <EditBtn />
                </IconButton>
            }
            title={todo.title}
            style={{ textDecorationLine: todo.done ? "line-through" : "none" }}
        />
        <Menu
            id="simple-menu"
            anchorEl={anchorEls[key]}
            keepMounted
            open={Boolean(anchorEls[key])}
            onClose={handleClose}
        >
            <MenuItem onClick={(e) => {
                handleClose(key);
                editTodo(todo.id);
            }}>EDIT</MenuItem>
            <MenuItem onClick={(e) => handleClose(key)}>DELETE</MenuItem>
        </Menu>

        <CardContent
            style={{ textDecorationLine: todo.done ? "line-through" : "none" }}
        >
            {todo.description}
        </CardContent>
        <CardActions>
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item>
                    <Grid container spacing={1}>
                        {todo.tags
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
                        checked={todo.done}
                        setChecked={(value) => changeTodoDoneStatus(value, todo.id)}
                    />
                </Grid>
            </Grid>
        </CardActions>
    </Card>
}