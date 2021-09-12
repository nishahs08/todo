import { makeStyles, Grid, Card, CardHeader, CardActions, CardContent, IconButton, Menu, MenuItem } from '@material-ui/core';
import { CustomCheckbox } from './CustomCheckbox';
import { Tag } from './Tag';
import EditBtn from '@material-ui/icons/MoreHoriz';
import { useState } from 'react';
//@ts-ignore
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
const useStyles = makeStyles({
    root: {

    }
})
export const Todo = () => {
    const classes = useStyles();
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 900: 3}}>
            <Masonry>
                <Card style={{ backgroundColor: "#fff9de" ,margin:'20px'}}>
                    <CardHeader action={<IconButton onClick={handleClick}><EditBtn /></IconButton>} title="The first task title" />
                    <Menu id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        <MenuItem onClick={handleClose}>EDIT</MenuItem>
                        <MenuItem onClick={handleClose}>DELETE</MenuItem>
                    </Menu>
                    <CardContent>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</CardContent>
                    <CardActions>
                        <Grid container justifyContent='space-between'>
                            <Grid item>
                                <Grid container spacing={1}>
                                    <Grid item> <Tag color="#daf2d6"></Tag></Grid>
                                    <Grid item><Tag color="#d1e5f7"></Tag></Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <CustomCheckbox />
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
                <Card style={{ backgroundColor: "#fff9de" ,margin:'20px'}}>
                    <CardHeader action={<IconButton onClick={handleClick}><EditBtn /></IconButton>} title="The first task title" />
                    <Menu id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        <MenuItem onClick={handleClose}>EDIT</MenuItem>
                        <MenuItem onClick={handleClose}>DELETE</MenuItem>
                    </Menu>
                    <CardContent>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</CardContent>
                    <CardActions>
                        <Grid container justifyContent='space-between'>
                            <Grid item>
                                <Grid container spacing={1}>
                                    <Grid item> <Tag color="#daf2d6"></Tag></Grid>
                                    <Grid item><Tag color="#d1e5f7"></Tag></Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <CustomCheckbox />
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
                <Card style={{ backgroundColor: "#fff9de" ,margin:'20px'}}>
                    <CardHeader action={<IconButton onClick={handleClick}><EditBtn /></IconButton>} title="The first task title" />
                    <Menu id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        <MenuItem onClick={handleClose}>EDIT</MenuItem>
                        <MenuItem onClick={handleClose}>DELETE</MenuItem>
                    </Menu>
                    <CardContent>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur,Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur,Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur,Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</CardContent>
                    <CardActions>
                        <Grid container justifyContent='space-between'>
                            <Grid item>
                                <Grid container spacing={1}>
                                    <Grid item> <Tag color="#daf2d6"></Tag></Grid>
                                    <Grid item><Tag color="#d1e5f7"></Tag></Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <CustomCheckbox />
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
           </Masonry>
         
            
        </ResponsiveMasonry>
    )
}