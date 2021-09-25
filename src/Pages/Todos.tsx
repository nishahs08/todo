//@ts-ignore
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';



import { ITodoWithColors } from '../types';
import { Todo } from './Todo';


interface TodosProps {
	todos: ITodoWithColors[];
	onDeleteTodoClicked: (todoId: string) => void;
	onEditTodoClicked: (todoId: string) => void;
	onTodoStatusChanged: (todoId: string, status: boolean) => void;
}

export const Todos: React.FC<TodosProps> = ({
	todos,
	onDeleteTodoClicked,
	onEditTodoClicked,
	onTodoStatusChanged,
}) => {
	return (
		<>
			<ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 900: 3 }}>
				<Masonry>
					{todos.map((todoItem) => (
						<Todo
							todo={todoItem}
							key={todoItem.id}
							onDeleteTodoClicked={onDeleteTodoClicked}
							onEditTodoClicked={onEditTodoClicked}
							onTodoStatusChanged={onTodoStatusChanged}
						/>
					))}
				</Masonry>
			</ResponsiveMasonry>
		</>
	);
};