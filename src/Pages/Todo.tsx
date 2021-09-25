import { Grid, Card, CardHeader, CardActions, CardContent, IconButton, Menu, MenuItem, createStyles } from '@material-ui/core';
import EditBtn from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';



import { ITodoWithColors } from '../types';
import { CustomCheckbox } from './CustomCheckbox';
import { Tag } from './Tag';


const useTodoStyles = makeStyles(() =>
	createStyles({
		card: {
			backgroundColor: '#fff9de',
			margin: '20px',
		},
		cardHeader: {
			textDecoration: 'none',
		},
		cardContent: {
			textDecoration: 'none',
		},
		todoDone: {
			textDecoration: 'line-through',
		},
	})
);

interface TodoProps {
	todo: ITodoWithColors;
	onDeleteTodoClicked: (todoId: string) => void;
	onEditTodoClicked: (todoId: string) => void;
	onTodoStatusChanged: (todoId: string, status: boolean) => void;
}

export const Todo: React.FC<TodoProps> = ({
	todo,
	onDeleteTodoClicked,
	onTodoStatusChanged,
	onEditTodoClicked,
}) => {
	const classes = useTodoStyles();
	const [menuRef, setMenuRef] = useState<null | HTMLElement>(null);
	const openTodoMenu = (target: HTMLElement) => setMenuRef(target);
	const closeTodoMenu = () => setMenuRef(null);

	const editTodo = () => {
		closeTodoMenu();
		onEditTodoClicked(todo.id);
	};
	const deleteTodo = () => {
		closeTodoMenu();
		onDeleteTodoClicked(todo.id);
	};

	const CardHeaderOptions = (
		<IconButton onClick={(e) => openTodoMenu(e.currentTarget)}>
			<EditBtn />
		</IconButton>
	);

	const TagColors = todo.tags.map((tag) => (
		<Grid item key={tag.tagId}>
			{' '}
			<Tag color={tag.color}></Tag>
		</Grid>
	));

	return (
		<Card className={classes.card} key={todo.id}>
			<CardHeader
				title={todo.title}
				action={CardHeaderOptions}
				className={`${classes.cardHeader} ${todo.done ? classes.todoDone : ''}`}
			/>
			<Menu
				keepMounted
				id={todo.id}
				open={!!menuRef}
				anchorEl={menuRef}
				onClose={closeTodoMenu}
			>
				<MenuItem onClick={editTodo}>EDIT</MenuItem>
				<MenuItem onClick={deleteTodo}>DELETE</MenuItem>
			</Menu>

			<CardContent className={`${classes.cardContent} ${todo.done ? classes.todoDone : ''}`}>
				{todo.description}
			</CardContent>

			<CardActions>
				<Grid container justifyContent='space-between' alignItems='center'>
					<Grid item>
						<Grid container spacing={1}>
							{TagColors}
						</Grid>
					</Grid>
					<Grid item>
						<CustomCheckbox
							label='Done'
							checked={todo.done}
							setChecked={(value) => onTodoStatusChanged(todo.id, value)}
						/>
					</Grid>
				</Grid>
			</CardActions>
		</Card>
	);
};