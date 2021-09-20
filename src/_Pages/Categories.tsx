import { useState } from 'react';
import { Tag } from './Tag';
import { Typography, Grid } from '@material-ui/core';
import { ICategoryType } from '../types';
interface CategoriesProps {
	type: ICategoryType;
	color: string;
	setActiveState: (value: string) => void;
}
export const Categories: React.FC<CategoriesProps> = ({ type, color, setActiveState }) => {
	return (
		<>
			<Grid
				container
				spacing={1}
				alignItems='center'
				style={{ padding: '10px' }}
				onClick={() => setActiveState(type)}
			>
				<Grid item>
					{' '}
					<Tag color={color} />{' '}
				</Grid>
				<Grid item>
					<Typography>{type}</Typography>
				</Grid>
			</Grid>
		</>
	);
};
