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
import { category, todo } from "../types"
//@ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Todo } from "./Todo";
import { useState } from "react";
import { EditForm } from './EditForm'

interface TodosProps {
    todos: todo[];
    categories: category[];
    setTodos: (value: todo[]) => void
}
export const Todos: React.FC<TodosProps> = ({ todos, categories, setTodos }) => {
    const [todo, setTodo] = useState<todo | null>(null);
    const [openEdit, setOpenEdit] = useState<boolean>(true);
    const [todoIdToUpdate, setTodoIdToUpdate] = useState<string>('')
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const changeTodoDoneStatus = (value: boolean, id: string) => {
        const updatedTodo = todos.map(todo => {
            if (todo.id === id) {
                todo.done = value
            }
            return todo
        })
        setTodos(updatedTodo)
    }

    const editTodo = (id: string) => {
        const filteredTodo = todos.find(todo => todo.id === id);
        console.log("open", filteredTodo)
        if (filteredTodo) {
            setTodo(filteredTodo);
        }

        setTodoIdToUpdate(id);
        setOpenEdit(true);
    }

    const setUpdateTodo = (value: todo) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === value.id) {
                return value
            }
            return todo
        });
        setTodos(updatedTodos)
    }

    return <>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 900: 3 }}>
            <Masonry>
                {todos.map((todoItem, index) =>
                    <Todo todo={todoItem}
                        key={index}
                        categories={categories}
                        changeTodoDoneStatus={(value, id) => changeTodoDoneStatus(value, id)}
                        editTodo={(id) =>editTodo(id)}
                        setOpenEdit={setOpenEdit} />)
                      
                }
            </Masonry>
        </ResponsiveMasonry>

        {todo &&
            <Dialog open={openEdit} fullScreen={fullScreen}>
                <DialogContent>
                    <EditForm todo={todo} setTodo={(value: todo) => setUpdateTodo(value)} categories={categories} setOpenEdit={setOpenEdit} />
                </DialogContent>
            </Dialog>
        }
    </>
}