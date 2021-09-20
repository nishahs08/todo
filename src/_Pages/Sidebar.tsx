import { Toolbar, Typography, useTheme, Drawer, Grid, Box, Theme, Hidden } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/styles';

import { ICategory, ITodo, ICategoryType } from '../types';
import { Categories } from './Categories';
import { CustomCheckbox } from './CustomCheckbox';

const drawerWidth = 250;
const useStyles = makeStyles((theme: Theme) => ({
	toolbar: {
		justifyContent: 'space-between',
	},

	appbar: {
		backgroundColor: '#fff',
	},
	logo: {
		color: 'rgba(0,0,0,.54)',
		fontSize: '35px',
	},
	content: {
		marginLeft: `${drawerWidth}px`,
		width: `calc(100% - ${drawerWidth}px)`,
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			marginLeft: '0px',
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
	notSelected: {},
}));
interface SidebarProps {
	categories: ICategory[];
	activeCategory: ICategoryType;
	setActiveCategory: (value: ICategoryType) => void;
	hideDone: boolean;
	setHideDone: (value: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
	categories,
	activeCategory,
	setActiveCategory,
	hideDone,
	setHideDone,
}) => {
	const classes = useStyles();

	const theme = useTheme();
	const media = useMediaQuery(theme.breakpoints.up('md'));

	// const filterTodosByCategory = () => {
	// 	const category = categories.find(
	// 		(category) => category.type === activeCategory
	// 	);
	// 	if (activeCategory === 'all' ) {
	// 		if(hideDone){
	// 			const unDone = todos.filter((todo) => todo.done === false);
	// 			console.log(unDone.length)
	// 			setFilteredTodos(unDone);
	// 		}
	// 		else{
	// 			setFilteredTodos(todos)
	// 		}

	// 	} else if (activeCategory !== 'all') {
	// 		console.log("12")
	// 		const filteredTodosList = todos.filter((todo) => {
	// 			return todo.tags.find((tagId) => category && category.id === tagId);
	// 		});

	// 		if (hideDone) {
	// 			console.log("13")
	// 			const unDone = filteredTodosList.filter((todo) => todo.done === false);
	// 			setFilteredTodos(unDone);
	// 		} else {
	// 			console.log("14")
	// 			setFilteredTodos(filteredTodosList);
	// 		}
	// 	}
	// };

	// useEffect(() => {
	// 	filterTodosByCategory();
	// 	console.log("ActiveCategory", activeCategory, hideDone);
	// }, [activeCategory, hideDone, todos]);

	return (
		<>
			<Hidden smDown>
				<Box className={classes.sidebar}>
					<Drawer
						open={true}
						anchor='left'
						variant='permanent'
						elevation={0}
						classes={{
							paperAnchorDockedLeft: classes.paperAnchorDockedLeft,
						}}
					>
						<Toolbar />

						<Grid
							container
							direction='column'
							spacing={2}
							justifyContent='center'
							className={classes.sidebar}
						>
							<Grid item>
								<Typography onClick={() => setActiveCategory('all')}>
									List All
								</Typography>
							</Grid>
							{categories.map(({ color, type }, i) => (
								<Grid
									item
									key={i}
									className={
										activeCategory === type
											? classes.selected
											: classes.notSelected
									}
								>
									<Categories
										color={color}
										type={type}
										//@ts-ignore
										setActiveState={() => setActiveCategory(type)}
									/>
								</Grid>
							))}
							<Grid item>
								<CustomCheckbox
									label='Hide done tasks'
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
				<Grid
					container
					alignItems='center'
					direction={media ? 'column' : 'row'}
					style={{ margin: '20px' }}
				>
					<Grid item>
						<Typography style={{ color: 'red' }}>List All</Typography>
					</Grid>

					{categories.map(({ color, type }, i) => (
						<Grid
							item
							key={i}
							className={
								activeCategory === type ? classes.selected : classes.notSelected
							}
						>
							<Categories
								color={color}
								type={type}
								//@ts-ignore
								setActiveState={() => setActiveCategory(type)}
							/>
						</Grid>
					))}
					<Grid item>
						<CustomCheckbox
							label='Hide done tasks'
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
