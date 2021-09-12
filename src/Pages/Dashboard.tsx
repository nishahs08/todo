import { AppBar, Toolbar, Typography, IconButton, Drawer, Grid, Box ,PaperProps} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import AddIcon from '@material-ui/icons/Add';
import { Navbar } from '../Components/Navbar';
import { Categories } from '../Components/Categories';
import { CustomCheckbox } from '../Components/CustomCheckbox';
const drawerWidth = 350;
const useStyles = makeStyles((theme) => ({
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
        backgroundColor: 'red'
    },
    sidebarContent: {
       
    },
    paperAnchorDockedRight:{
        borderRight:0
    },
    sidebar:{
        width:  `${drawerWidth}px`,
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
            <Box className={classes.sidebar}>
            <Drawer open={true} anchor='left' variant='permanent' elevation={0} classes={{paperAnchorDockedRight:classes.paperAnchorDockedRight}} >
                <Toolbar />
                <Toolbar />
              
                <Grid container direction='column' spacing={2} justifyContent='center' className={classes.sidebar}>
                    <Grid item><Categories categories={categories} /></Grid>
                    <Grid item><CustomCheckbox /></Grid>
                </Grid>
                

            </Drawer>
            </Box>
            <Box className={classes.content}>
                <Toolbar />
                <div>akgbdskagljgbnbmbkhkhik</div>
            </Box>
           
        </>

    )
}