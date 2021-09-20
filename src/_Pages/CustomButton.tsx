import { Button } from '@material-ui/core';

interface CustomButtomProps {
	label: string;
	onClick: () => void;
}

export const CustomButton: React.FC<CustomButtomProps> = ({
	label,
	onClick,
}) => {
	return (
		<Button
			style={{
				backgroundColor: '#69665c',
				color: '#fff',
				borderRadius: '10px',
				textTransform: 'none',
			}}
			onClick={() => onClick()}
		>
			{label}
		</Button>
	);
};
