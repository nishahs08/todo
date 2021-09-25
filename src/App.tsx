import {
	CssBaseline,
	Box,
	DialogContent,
	Dialog,
	useMediaQuery,
	useTheme,
	Toolbar,
} from '@material-ui/core';
import { ThemeProvider, createTheme, styled } from '@material-ui/core/styles';
import { useLocalStorage } from '@rehooks/local-storage';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { AddForm } from './Pages/AddForm';
import { Navbar } from './Pages/Navbar';
import { Sidebar } from './Pages/Sidebar';
import { Todos } from './Pages/Todos';
//@ts-ignore
import AdobeClean from './fonts/AdobeClean/AdobeClean-Regular.woff';
import { ICategory, ICategoryType, ITagForTodo, ITodo } from './types';

const theme = createTheme({
	typography: {
		fontFamily: 'AdobeClean, Arial',
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'@font-face': [AdobeClean],
			},
		},
	},
});

const categories: ICategory[] = [
	{ id: 1, type: 'work', color: '#d2ceff' },
	{ id: 2, type: 'study', color: '#d1e5f7' },
	{ id: 3, type: 'entertainment', color: '#ffcece' },
	{ id: 4, type: 'family', color: '#daf2d6' },
];

const drawerWidth = 250;
const Wrapper = styled(Box)({
	marginLeft: `${drawerWidth}px`,
	width: `calc(100% - ${drawerWidth}px)`,
	[theme.breakpoints.down('sm')]: {
		width: '100%',
		marginLeft: '0px',
	},
});
function App() {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const [todos, setTodos] = useLocalStorage<ITodo[]>('todos', []);
	const [editableTodo, setEditableTodo] = useState<ITodo | undefined>(undefined);
	const [categoryFilter, setCategoryFilter] = useState<ICategoryType>('all');
	const [statusFilter, setStatusFilter] = useState<boolean>(false);

	const category = categories.find((category) => categoryFilter === category.type);

	const todoForDisplay = todos.map((todo) => {
		const todoTags = todo.tags.reduce<ITagForTodo[]>((tagWithColors, tagId) => {
			const category = categories.find((category) => category.id === tagId);
			if (!category) {
				return tagWithColors;
			} else {
				return [...tagWithColors, { tagId: tagId, color: category.color }];
			}
		}, []);

		return {
			...todo,
			tags: todoTags,
		};
	});

	const todosFilteredByCategory =
		categoryFilter !== 'all' && category
			? todoForDisplay.filter((todo) => todo.tags.find(({ tagId }) => tagId === category?.id))
			: todoForDisplay;

	const todosFilteredByStatusAndCategory = statusFilter
		? todosFilteredByCategory.filter((todo) => todo.done !== statusFilter)
		: todosFilteredByCategory;

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Navbar
				openAddTodo={() =>
					setEditableTodo({
						title: '',
						description: '',
						tags: [],
						done: false,
						id: uuidv4(),
					})
				}
			/>

			<Sidebar
				categories={categories}
				activeCategory={categoryFilter}
				setActiveCategory={(value) => setCategoryFilter(value)}
				hideDone={statusFilter}
				setHideDone={setStatusFilter}
			/>

			{editableTodo && (
				<Dialog open={!!editableTodo} fullScreen={fullScreen}>
					<DialogContent>
						<AddForm
							todo={editableTodo}
							setTodo={(todo: ITodo) => setEditableTodo(todo)}
							onAddClicked={() => {
								const isEditMode = todos.find(
									(todo) => todo.id === editableTodo.id
								);
								if (isEditMode) {
									const newTodos = todos.map((todo) => {
										if (todo.id === editableTodo.id) {
											return editableTodo;
										} else {
											return todo;
										}
									});
									setTodos(newTodos);
								} else {
									setTodos([...todos, editableTodo]);
								}
								setEditableTodo(undefined);
							}}
							categories={categories}
							dismissPopup={() => setEditableTodo(undefined)}
							addTodo={(todo: ITodo) => setTodos([...todos, todo])}
						/>
					</DialogContent>
				</Dialog>
			)}

			<Wrapper>
				<Toolbar />
				<Todos
					todos={todosFilteredByStatusAndCategory}
					onDeleteTodoClicked={(todoId) => {
						setTodos(todos.filter((todo) => todo.id !== todoId));
					}}
					onEditTodoClicked={(todoId) => {
						const todoToBeEdited = todos.find((todo) => todo.id === todoId);
						setEditableTodo(todoToBeEdited ? { ...todoToBeEdited } : undefined);
					}}
					onTodoStatusChanged={(todoId, status) => {
						const updatedTodos = todos.map((todo) => {
							if (todo.id === todoId) {
								todo.done = status;
							}
							return todo;
						});
						setTodos(updatedTodos);
					}}
				/>
			</Wrapper>
		</ThemeProvider>
	);
}

export default App;
