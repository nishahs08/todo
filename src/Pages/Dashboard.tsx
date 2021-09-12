import {
	AppBar,
	Toolbar,
	Typography,
	useTheme,
	IconButton,
	Drawer,
	Grid,
	Box,
	PaperProps,
	Theme,
	Hidden,
	Dialog,
	DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import { Navbar } from "../Components/Navbar";
import { Categories } from "../Components/Categories";
import { CustomCheckbox } from "../Components/CustomCheckbox";
import { Todos } from "../Components/Todos";
import { useEffect, useState } from "react";
import { category, todo, categoryType } from "../types";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Form } from "../Components/Form";
const drawerWidth = 350;
const useStyles = makeStyles((theme: Theme) => ({
	toolbar: {
		justifyContent: "space-between",
	},

	appbar: {
		backgroundColor: "#fff",
	},
	logo: {
		color: "rgba(0,0,0,.54)",
		fontSize: "35px",
	},
	content: {
		marginLeft: `${drawerWidth}px`,
		width: `calc(100% - ${drawerWidth}px)`,
		[theme.breakpoints.down("sm")]: {
			width: "100%",
			marginLeft: "0px",
		},
	},
	sidebarContent: {},
	paperAnchorDockedLeft: {
		borderRight: 0,
		padding: theme.spacing(2),
		width: `${drawerWidth}px`,
	},
	sidebar: {},
}));
interface DashboardProps {
	categories: category[];
	todos: todo[];
	setTodos: (value: todo[]) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
	categories,
	todos,
	setTodos,
}) => {
	const classes = useStyles();
	const [activeCategory, setActiveCategory] = useState<categoryType>("all");
	const [filteredTodos, setFilteredTodos] = useState<todo[]>([]);
	const [hideDone, setHideDone] = useState<boolean>(false);
	const [undoneTasks, setunDoneTasks] = useState<todo[]>([]);
	const [openAddTodo, setOpenAddTodo] = useState<boolean>(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
	useEffect(() => setFilteredTodos(todos), []);
	const filterTodosByCategory = () => {
		const category = categories.find(
			(category) => category.type === activeCategory
		);
		console.log("category", category);

		const filteredTodosList = todos.filter((todo) => {
			console.log("todos", todos);
			return todo.tags.find((tagId) => category && category.id === tagId);
		});
		setFilteredTodos(filteredTodosList);
		console.log("todo", filteredTodosList);
	};

	useEffect(() => {
		filterTodosByCategory();
		console.log("ActiveCategory", activeCategory);
	}, [activeCategory]);

	const filterUndoneTasks = () => {
		const undoneTasksList = todos.filter((todo) => {
			if (todo.done === false) return todo;
		});
		setunDoneTasks(undoneTasksList);
		console.log(undoneTasksList);
	};

	useEffect(() => {
		filterUndoneTasks();
	}, [hideDone]);

	return (
		<>
			<Navbar open={openAddTodo} setOpen={setOpenAddTodo} />
			<Hidden smDown>
				<Box className={classes.sidebar}>
					<Drawer
						open={true}
						anchor="left"
						variant="permanent"
						elevation={0}
						classes={{ paperAnchorDockedLeft: classes.paperAnchorDockedLeft }}
					>
						<Toolbar />
						<Toolbar />
						<Grid
							container
							direction="column"
							spacing={2}
							justifyContent="center"
							className={classes.sidebar}
						>
							{categories.map(({ color, type }, i) => (
								<Grid item key={i}>
									<Categories
										color={color}
										type={type}
										setActiveState={setActiveCategory}
									/>
								</Grid>
							))}
							<Grid item>
								<CustomCheckbox
									label="Hide done tasks"
									checked={hideDone}
									setChecked={setHideDone}
								/>
							</Grid>
						</Grid>
					</Drawer>
				</Box>
			</Hidden>
			<Hidden mdUp>
				<Toolbar />
				<Grid container direction="row" style={{ margin: "20px" }}>
					<Grid item onClick={() => setActiveCategory('all')}>
						<Typography style={{ color: 'red' }}>List All</Typography>
					</Grid>

					{categories.map(({ color, type }, i) => (
						<Grid item key={i}>
							<Categories
								color={color}
								type={type}
								setActiveState={setActiveCategory}
							/>
						</Grid>
					))}
				</Grid>
			</Hidden>
			<Hidden smDown>
				<Toolbar />
			</Hidden>

			<Box className={classes.content}>
				{activeCategory === "all" ? (
					<Todos todos={todos} categories={categories} />
				) : hideDone === false ? (
					<Todos todos={filteredTodos} categories={categories} />
				) : (
							<Todos todos={undoneTasks} categories={categories} />
						)}
			</Box>

			{openAddTodo && (
				<Dialog open={openAddTodo} fullScreen={fullScreen}>
					<DialogContent>
						<Form
							cancel={() => setOpenAddTodo(false)}
							categories={categories}
						></Form>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
};
