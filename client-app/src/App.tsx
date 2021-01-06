import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";

const App = () => {
	const [values, setValues] = useState([{ name: String, id: Number }]);
	useEffect(() => {
		axios.get("http://localhost:5000/api/values").then((response) => {
			setValues(response.data);
		});
		return () => {};
	}, []);

	return (
		<div>
			<Header as="h2">
				<Icon name="users" />
				<Header.Content>Reactivities</Header.Content>
			</Header>
			<List>
				{values.map((value, i) => {
					return (
						<List.Item key={i}>
							{value.id} | {value.name}
						</List.Item>
					);
				})}
			</List>
		</div>
	);
};

export default App;
