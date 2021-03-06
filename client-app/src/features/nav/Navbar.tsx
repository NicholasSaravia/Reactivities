import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface IProps {
	openCreateForm: () => void;
}

export const Navbar: React.FC<IProps>  = ({openCreateForm}) => {
	return (
		<Menu fixed="top" inverted>
			<Container>
				<Menu.Item>
					<img src="assets/logo.png" alt="logo" style={{marginRight: '10px'}}></img>
					Reactivities
				</Menu.Item>
				<Menu.Item name="Activities" />
				<Menu.Item>
					<Button
						positive
						content="Create Activity"
						onClick={openCreateForm}
					></Button>
				</Menu.Item>
			</Container>
		</Menu>
	);
};
