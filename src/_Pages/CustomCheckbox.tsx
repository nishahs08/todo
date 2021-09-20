import { Checkbox } from '@material-ui/core';
import React from 'react';
import { FormControlLabel } from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBoxOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		color: '#b2afa1',
		'&:checked': {
			color: '#69665C',
		},
	},
	checked: {},
	label: {
		color: '#b2afa1',
	},
	checkedLabel: {
		color: '#69665C',
	},
});
interface CustomCheckbox {
	label: string;
	checked: boolean;
	setChecked: (value: boolean) => void;
}
export const CustomCheckbox: React.FC<CustomCheckbox> = ({
	label,
	checked,
	setChecked,
}) => {
	const classes = useStyles();
	return (
		<FormControlLabel
			className={checked ? classes.checkedLabel : classes.label}
			control={
				<Checkbox
					classes={{
						root: classes.root,
						checked: classes.checked,
					}}
					disableFocusRipple
					disableRipple
					checked={checked}
					onChange={() => setChecked(!checked)}
					name='Something'
					color='default'
					checkedIcon={<CheckBoxIcon />}
				/>
			}
			label={label}
		/>
	);
};
