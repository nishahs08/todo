import React, { useState } from 'react';
import { ThemeProvider, createTheme, styled } from '@material-ui/core/styles';
import {
	CssBaseline,
	Box,
	DialogContent,
	Dialog,
	useMediaQuery,
	useTheme,
	Toolbar,
} from '@material-ui/core';
//@ts-ignore
import AdobeClean from './fonts/AdobeClean/AdobeClean-Regular.woff';
import { v4 as uuidv4 } from 'uuid';
import { ICategory, ICategoryType, ITodo } from './types';
import { Todos } from './_Pages/Todos';
import { Navbar } from './_Pages/Navbar';
import { AddForm } from './_Pages/AddForm';
import { Sidebar } from './_Pages/Sidebar';

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

const todoList = [
	{
		id: uuidv4(),
		title: '11 to do bla bla bla',
		description:
			'skjdhfkj sdkhgkhg dhgdhgl dghdhg dhghsdkhg kjdhgsoiug sdfpsoudtg sl;edfpouspd;ajufrp',
		done: false,
		tags: [1, 2, 3, 4],
	},
	{
		id: uuidv4(),
		title: ' 22 to do bla bla bla',
		description:
			'skjdhfkj sdkhgkhg dhgdhgl dghdhg dhghsdkhg kjdhgsoiug sdfpsoudtg sl;edfpouspd;ajufrp',
		done: false,
		tags: [1, 2, 3],
	},
	{
		id: uuidv4(),
		title: 'to do bla bla bla',
		description:
			'skjdhfkj sdkhgkhg dhgdhgl dghdhg dhghsdkhg kjdhgsoiug sdfpsoudtg sl;edfpouspd;ajufrp',
		done: false,
		tags: [1, 2],
	},
	{
		id: uuidv4(),
		title: 'to do bla bla bla',
		description:
			'skjdhfkj sdkhgkhg dhgdhgl dghdhg dhghsdkhg kjdhgsoiug sdfpsoudtg sl;edfpouspd;ajufrp',
		done: true,
		tags: [1, 2, 3],
	},
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
	const [todos, setTodos] = useState<ITodo[]>([...todoList]);
	const [editableTodo, setEditableTodo] = useState<ITodo | undefined>(undefined);
	const [categoryFilter, setCategoryFilter] = useState<ICategoryType>('all');
	const [statusFilter, setStatusFilter] = useState<boolean>(false);
	const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const category = categories.find((category) => categoryFilter === category.type);
	console.log(todos);
	const todosFilteredByCategory =
		categoryFilter !== 'all' && category
			? todos.filter((todo) => todo.tags.includes(category?.id))
			: todos;

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
					allTodos={todos}
					todos={todosFilteredByStatusAndCategory}
					categories={categories}
					setTodos={(todos) => setTodos(todos)}
					handleEditTodo={(id) => {
						const todoToBeEdited = todos.find((todo) => todo.id === id);
						console.log(id, todoToBeEdited);
						setEditableTodo(todoToBeEdited ? { ...todoToBeEdited } : undefined);
					}}
				/>
			</Wrapper>
		</ThemeProvider>
	);
}

export default App;
