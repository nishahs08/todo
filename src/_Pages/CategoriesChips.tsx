import {
	Grid,
	Typography,
	Hidden,
	makeStyles,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
import { CustomButton } from './CustomButton';
import { TextBox } from './TextBox';
import { Tag } from './Tag';
import { CategoryChip } from './CategoryChip';
import { ICategory, ICategoryType, ITodo } from '../types';
import { useEffect, useState } from 'react';

const useStyles = makeStyles({
	selected: {
		backgroundColor: '#b2afa1',
		margin: '5px',
		borderRadius: '5px',
	},
	notSelected: {
		margin: '5px',
	},
});
interface CategoriesChipsProps {
	selectedCategories: ICategoryType[];
	categories: ICategory[];
	setSelectedCategories: (value: ICategoryType[]) => void;
}
export const CategoriesChips: React.FC<CategoriesChipsProps> = ({
	selectedCategories,
	categories,
	setSelectedCategories,
}) => {
	const classes = useStyles();
	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));

	const handleCategoryClick = (value: ICategoryType) => {
		const isAlreadySelected = selectedCategories.find((s) => s === value);
		if (isAlreadySelected) {
			const filtered = selectedCategories.filter((s) => s !== value);
			setSelectedCategories(filtered);
		} else {
			setSelectedCategories([...selectedCategories, value]);
		}
	};
	return (
		<Grid container direction={smDown ? 'column' : 'row'}>
			{categories.map(({ color, type }, i) => (
				<Grid
					item
					key={i}
					className={
						selectedCategories.includes(type)
							? classes.selected
							: classes.notSelected
					}
				>
					<CategoryChip
						color={color}
						type={type}
						onClick={(type) => handleCategoryClick(type)}
					/>
				</Grid>
			))}
		</Grid>
	);
};
