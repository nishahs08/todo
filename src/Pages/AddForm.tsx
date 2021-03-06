import { Grid, Typography } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';



import { ICategory, ICategoryType, ITodo } from '../types';
import { CategoriesChips } from './CategoriesChips';
import { CustomButton } from './CustomButton';
import { TextBox } from './TextBox';


interface AddFormProps {
	categories: ICategory[];
	addTodo: (value: ITodo) => void;
	onAddClicked: () => void;
	dismissPopup: () => void;
	todo: ITodo;
	setTodo: (_todo: ITodo) => void;
}
export const AddForm: React.FC<AddFormProps> = ({
	categories,
	addTodo,
	dismissPopup,
	todo,
	setTodo,
	onAddClicked,
}) => {
	const selectedCategories = todo.tags.reduce((types: ICategoryType[], tagId) => {
		const matchedCategory = categories.find((category) => category.id === tagId);
		if (matchedCategory) {
			types.push(matchedCategory.type);
		}
		return types;
	}, []);

	return (
		<Grid container direction='column' spacing={2}>
			<Grid item>
				<Grid container justifyContent='space-between'>
					<Grid item>
						<CustomButton label='Cancel' onClick={dismissPopup} />
					</Grid>

					<Grid item>
						<CustomButton label='Add' onClick={onAddClicked} />
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<TextBox
					label='Title'
					value={todo.title}
					setValue={(title) => setTodo({ ...todo, title })}
				/>
			</Grid>
			<Grid item>
				<TextBox
					label='Description'
					value={todo.description}
					setValue={(description) => setTodo({ ...todo, description })}
				/>
			</Grid>
			<Grid item>
				<Grid container direction='column'>
					<Grid item>
						<Typography>Tags</Typography>
					</Grid>
					<Grid item>
						<CategoriesChips
							selectedCategories={selectedCategories}
							setSelectedCategories={(_selectedCategories) => {
								const tagIds = _selectedCategories.reduce(
									(selectedTags: number[], _selectedCategory) => {
										const matchedCategory = categories.find(
											(category) => category.type === _selectedCategory
										);
										if (matchedCategory) {
											selectedTags.push(matchedCategory.id);
										}
										return selectedTags;
									},
									[]
								);

								setTodo({
									...todo,
									tags: tagIds,
								});
							}}
							categories={categories}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};