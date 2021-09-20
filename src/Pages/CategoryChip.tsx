import { Typography, Grid } from '@material-ui/core';

import { ICategoryType } from '../types';
import { Tag } from './Tag';

interface CategoryChipProps {
	type: ICategoryType;
	color: string;
	onClick: (value: string) => void;
}
export const CategoryChip: React.FC<CategoryChipProps> = ({ type, color, onClick }) => {
	return (
		<>
			<Grid
				container
				spacing={1}
				alignItems='center'
				style={{ padding: '10px' }}
				onClick={() => onClick(type)}
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
