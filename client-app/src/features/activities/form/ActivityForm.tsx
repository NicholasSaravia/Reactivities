import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import {v4 as uuid} from 'uuid';

interface IProps {
	setEditMode: (editMode: boolean) => void;
	activity: IActivity | null;
	createActivity: (activity: IActivity) => void;
	editActivity: (activity: IActivity) => void;
	submitting: boolean;
}

export const ActivityForm: React.FC<IProps> = ({
	setEditMode,
	activity: initialFormState,
	editActivity,
	createActivity,
	submitting,
}) => {
	const initializeForm = () => {
		if (initialFormState) {
			return initialFormState;
		} else {
			return {
				id: "",
				title: "",
				category: "",
				description: "",
				city: "",
				date: "",
				venue: "",
			};
		}
	};

	const [activity, setActivity] = useState<IActivity>(initializeForm);
	const handleSubmit = () => {
		if (activity.id.length === 0) {
			let newActivity = {
				...activity,
				id: uuid(),
			};
			createActivity(newActivity);
		} else {
			editActivity(activity);
		}
	};

	const handleInputChange = (event: any) => {
		setActivity({
			...activity,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit}>
				<Form.Input
					onChange={handleInputChange}
					name="title"
					placeholder="Title"
					value={activity.title}
				></Form.Input>
				<Form.TextArea
					onChange={handleInputChange}
					placeholder="Description"
					name="description"
					rows={2}
					value={activity.description}
				></Form.TextArea>
				<Form.Input
					onChange={handleInputChange}
					placeholder="Category"
					name="category"
					value={activity.category}
				></Form.Input>
				<Form.Input
					onChange={handleInputChange}
					type="datetime-local"
					placeholder="Date"
					name="date"
					value={activity.date}
				></Form.Input>
				<Form.Input
					onChange={handleInputChange}
					name="city"
					placeholder="City"
					value={activity.city}
				></Form.Input>
				<Form.Input
					onChange={handleInputChange}
					placeholder="Venue"
					name="venue"
					value={activity.venue}
				></Form.Input>
				<Button
					floated="right"
					positive
					type="sumbmit"
					content="submit"
				></Button>
				<Button
					loading={submitting}
					floated="right"
					type="button"
					content="cancel"
					onClick={() => setEditMode(false)}
				></Button>
			</Form>
		</Segment>
	);
};
