import { Hidden } from '@material-ui/core';
interface TagProps {
	color: string;
}
export const Tag: React.FC<TagProps> = ({ color }) => {
	return (
		<>
			<Hidden smDown>
				<div
					style={{
						width: '30px',
						height: '30px',
						backgroundColor: `${color}`,
						borderRadius: '50%',
					}}
				></div>
			</Hidden>
			<Hidden mdUp>
				<div
					style={{
						width: '20px',
						height: '20px',
						backgroundColor: `${color}`,
						borderRadius: '50%',
					}}
				></div>
			</Hidden>
		</>
	);
};
