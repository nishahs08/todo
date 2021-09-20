import { Typography, useTheme } from '@material-ui/core';
import { CustomButton } from './CustomButton';

const Header = () => (
	<Typography variant='h1'>
		<span style={{ color: '#daf2d6' }}>t</span>
		<span style={{ color: '#d2afd6' }}>o</span>
		<span style={{ color: '#d1e5f7' }}>d</span>
		<span style={{ color: '#ffcece' }}>o</span>
	</Typography>
);

export const LandingPage = () => {
	return (
		<>
			<Header />
			<Typography style={{ color: '#b2afa1' }}>
				Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..
			</Typography>
			<Typography style={{ color: '#b2afa1' }}>
				There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is
				pain
			</Typography>
			<br />
			<CustomButton label='Get Started' onClick={() => {}}></CustomButton>
		</>
	);
};
