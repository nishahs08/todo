import { Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { ICategory, ICategoryType, ITodo } from '../types';
import { CategoriesChips } from './CategoriesChips';
import { CustomButton } from './CustomButton';
import { TextBox } from './TextBox';

interface EditFormProps {
	setOpenEdit: (value: boolean) => void;
	categories: ICategory[];
	todo: ITodo;
	setTodo: (value: ITodo) => void;
}
export const EditForm: React.FC<EditFormProps> = ({ categories, setOpenEdit, todo, setTodo }) => {
	const [selected, setSelected] = useState<ICategoryType[]>([]);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const edit = () => {
		const tagIds = categories.filter((c) => selected.includes(c.type)).map((item) => item.id);
		if (todo) {
			setTodo({
				title: title,
				description: description,
				tags: selected ? tagIds : todo.tags,
				id: todo.id,
				done: todo.done,
			});
			setOpenEdit(false);
		}
	};

	useEffect(() => {
		if (todo) {
			setTitle(todo.title);
			const tagIds = categories
				.filter((c) => todo.tags.includes(c.id))
				.map((tag) => tag.type);
			setSelected(tagIds);
			setDescription(todo.description);
		}
	}, [todo]);

	return (
		<Grid container direction='column' spacing={2}>
			<Grid item>
				<Grid container justifyContent='space-between'>
					<Grid item>
						<CustomButton label='Cancel' onClick={() => setOpenEdit(false)} />
					</Grid>
					<Grid item>
						<CustomButton label='Edit' onClick={edit} />
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<TextBox label='Title' value={title} setValue={setTitle} />
			</Grid>
			<Grid item>
				<TextBox label='Description' value={description} setValue={setDescription} />
			</Grid>
			<Grid item>
				<Grid container direction='column'>
					<Grid item>
						<Typography>Tags</Typography>
					</Grid>
					<Grid item>
						<CategoriesChips
							selectedCategories={selected}
							setSelectedCategories={setSelected}
							categories={categories}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};
