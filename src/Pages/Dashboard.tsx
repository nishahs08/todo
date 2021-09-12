import { AppBar, Toolbar, Typography, IconButton, Drawer, Grid, Box, PaperProps, Theme, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import AddIcon from '@material-ui/icons/Add';
import { Navbar } from '../Components/Navbar';
import { Categories } from '../Components/Categories';
import { CustomCheckbox } from '../Components/CustomCheckbox';
import { Todo } from '../Components/Todo';
const drawerWidth = 350;
const useStyles = makeStyles((theme: Theme) => ({
    root: {

    },
    addButton: {

    },
    toolbar: {
        justifyContent: 'space-between'
    },
    title: {

    },
    appbar: {
        backgroundColor: '#fff'
    },
    logo: {
        color: 'rgba(0,0,0,.54)',
        fontSize: '35px'
    },
    content: {
        marginLeft: `${drawerWidth}px`,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginLeft: '0px'
        }
    },
    sidebarContent: {

    },
    paperAnchorDockedLeft: {
        borderRight: 0,
        padding: theme.spacing(2),
        width: `${drawerWidth}px`,
    },
    sidebar: {


    }
}));
interface DashboardProps {
    categories: { type: string, color: string }[]
}
export const Dashboard: React.FC<DashboardProps> = ({ categories }) => {
    const classes = useStyles();
    return (
        <>
            <Navbar />
            <Hidden smDown>
                <Box className={classes.sidebar}>
                    <Drawer open={true} anchor='left' variant='permanent' elevation={0} classes={{ paperAnchorDockedLeft: classes.paperAnchorDockedLeft }} >
                        <Toolbar />
                        <Toolbar />

                        <Grid container direction='column' spacing={2} justifyContent='center' className={classes.sidebar}>

                            {categories.map(({ color, type }, i) => (

                                <Grid item key={i}>
                                    <Categories color={color} type={type} />
                                </Grid>

                            ))
                            }
                       <Grid item><CustomCheckbox /></Grid>
                        </Grid>


                    </Drawer>
                </Box>
            </Hidden>
            <Hidden mdUp>
                <Toolbar />
                <Grid container direction='row' style={{margin:'20px'}}>
                    {categories.map(({ color, type }, i) => (

                        <Grid item key={i} >
                            <Categories color={color} type={type} />
                        </Grid>

                    ))
                    }
                </Grid>

            </Hidden>
            <Hidden smDown>
            <Toolbar />
            </Hidden>
            <Box className={classes.content}>
                <Todo />
            </Box>

        </>

    )
}