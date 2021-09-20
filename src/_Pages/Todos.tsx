import { Dialog, DialogContent, useMediaQuery, useTheme } from '@material-ui/core';
import { ICategory, ITodo } from '../types';
//@ts-ignore
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Todo } from './Todo';
import { useState } from 'react';
import { EditForm } from './EditForm';

interface TodosProps {
	allTodos: ITodo[];
	todos: ITodo[];
	categories: ICategory[];
	setTodos: (value: ITodo[]) => void;
	handleEditTodo: (id: string) => void;
}
export const Todos: React.FC<TodosProps> = ({ allTodos, todos, categories, setTodos, handleEditTodo }) => {
	const [todo, setTodo] = useState<ITodo | null>(null);
	const [openEdit, setOpenEdit] = useState<boolean>(true);

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const changeTodoDoneStatus = (value: boolean, id: string) => {
		const updatedTodos = allTodos.map((todo) => {
			if (todo.id === id) {
				todo.done = value;
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	// const editTodo = (id: string) => {
	//     const filteredTodo = todos.find(todo => todo.id === id);
	//     console.log("open", filteredTodo)
	//     if (filteredTodo) {
	//         setTodo(filteredTodo);
	//     }

	//     // setTodoIdToUpdate(id);
	//     setOpenEdit(true);
	// }

	const setUpdateTodo = (value: ITodo) => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === value.id) {
				return value;
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	return (
		<>
			<ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 900: 3 }}>
				<Masonry>
					{todos.map((todoItem, index) => (
						<Todo
							todo={todoItem}
							key={index}
							categories={categories}
							changeTodoDoneStatus={(value, id) => changeTodoDoneStatus(value, id)}
							editTodo={handleEditTodo}
							setOpenEdit={setOpenEdit}
						/>
					))}
				</Masonry>
			</ResponsiveMasonry>

			{todo && (
				<Dialog open={openEdit} fullScreen={fullScreen}>
					<DialogContent>
						<EditForm
							todo={todo}
							setTodo={(value: ITodo) => setUpdateTodo(value)}
							categories={categories}
							setOpenEdit={setOpenEdit}
						/>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
};
