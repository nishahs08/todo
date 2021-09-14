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
const drawerWidth = 250;
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
		padding: theme.spacing(4),
		width: `${drawerWidth}px`,
	},
	sidebar: {},
    selected: {
        backgroundColor: '#b2afa1',
      },
      notSelected: {
      }
}));
interface SidebarProps {
	categories: category[];
	todos: todo[];
	setTodos: (value: todo[]) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
	categories,
	todos,
	setTodos,
}) => {
	const classes = useStyles();
	const [activeCategory, setActiveCategory] = useState<categoryType>("all");
	const [filteredTodos, setFilteredTodos] = useState<todo[]>([]);
	const [hideDone, setHideDone] = useState<boolean>(false);
	const [undoneTasks, setunDoneTasks] = useState<todo[]>([]);
	const [openForm, setopenForm] = useState<boolean>(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const media=useMediaQuery(theme.breakpoints.up('md'))
	useEffect(() => setFilteredTodos(todos), []);

	const filterTodosByCategory = () => {
		const category = categories.find(
			(category) => category.type === activeCategory
		);
		if (activeCategory === 'all' ) {
			if(hideDone){
				const unDone = todos.filter((todo) => todo.done === false);
				console.log(unDone.length)
				setFilteredTodos(unDone);
			}
			else{
				setFilteredTodos(todos)
			}
		
		} else if (activeCategory !== 'all') {
			console.log("12")
			const filteredTodosList = todos.filter((todo) => {
				return todo.tags.find((tagId) => category && category.id === tagId);
			});
		
			if (hideDone) {
				console.log("13")
				const unDone = filteredTodosList.filter((todo) => todo.done === false);
				setFilteredTodos(unDone);
			} else {
				console.log("14")
				setFilteredTodos(filteredTodosList);
			}
		}
	};

	useEffect(() => {
		filterTodosByCategory();
		console.log("ActiveCategory", activeCategory, hideDone);
	}, [activeCategory, hideDone, todos]);

	return (
		<>
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

						<Grid
							container
							direction="column"
							spacing={2}
							justifyContent="center"
							className={classes.sidebar}
						>
							<Grid item onClick={() => setActiveCategory('all')}>
								<Typography style={{ color: 'red' }}>List All</Typography>
							</Grid>
							{categories.map(({ color, type }, i) => (
								<Grid item key={i} className={activeCategory === type ? classes.selected : classes.notSelected}>
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
				<Grid container alignItems="center" direction={media ? 'column' :'row'} style={{ margin: "20px" }}>
					<Grid item onClick={() => setActiveCategory('all')}>
						<Typography style={{ color: 'red' }}>List All</Typography>
					</Grid>

					{categories.map(({ color, type }, i) => (
						<Grid item key={i} className={activeCategory === type ? classes.selected : classes.notSelected}>
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
			</Hidden>
			<Hidden smDown>
				<Toolbar />
			</Hidden>


		</>
	);
};
