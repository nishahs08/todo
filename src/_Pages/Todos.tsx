import { Dialog, DialogContent, useMediaQuery, useTheme } from '@material-ui/core';
import { useState } from 'react';
//@ts-ignore
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { ICategory, ITodo } from '../types';
import { EditForm } from './EditForm';
import { Todo } from './Todo';

interface TodosProps {
	allTodos: ITodo[];
	todos: ITodo[];
	categories: ICategory[];
	setTodos: (value: ITodo[]) => void;
	handleEditTodo: (id: string) => void;
}

export const Todos: React.FC<TodosProps> = ({
	allTodos,
	todos,
	categories,
	setTodos,
	handleEditTodo,
}) => {
	const changeTodoDoneStatus = (value: boolean, id: string) => {
		const updatedTodos = allTodos.map((todo) => {
			if (todo.id === id) {
				todo.done = value;
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	const Todos = todos.map((todoItem) => (
		<Todo
			todo={todoItem}
			key={todoItem.id}
			categories={categories}
			onEditTodoClick={handleEditTodo}
			changeTodoDoneStatus={(value, id) => changeTodoDoneStatus(value, id)}
		/>
	));

	return (
		<>
			<ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 900: 3 }}>
				<Masonry>{Todos}</Masonry>
			</ResponsiveMasonry>
		</>
	);
};
