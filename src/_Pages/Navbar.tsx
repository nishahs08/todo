import { AppBar, Toolbar, Typography, IconButton, Theme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';





const useStyles = makeStyles((theme: Theme) => ({
	toolbar: {
		justifyContent: 'space-between',
	},

	appbar: {
		backgroundColor: '#fff',
		zIndex: theme.zIndex.drawer + 1,
	},
	logo: {
		color: 'rgba(0,0,0,.54)',
		fontSize: '35px',
	},
}));

interface NavbarProps {
	openAddTodo: () => void;
}
export const Navbar: React.FC<NavbarProps> = ({ openAddTodo }) => {
	const classes = useStyles();
	return (
		<AppBar position='fixed' elevation={0} className={classes.appbar}>
			<Toolbar className={classes.toolbar}>
				<Typography className={classes.logo}>todo</Typography>
				<IconButton onClick={openAddTodo}>
					<AddIcon color='inherit' fontSize='large' />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};