import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
	activity: IActivity;
	setEditMode: (editMode: boolean) => void;
	setSelectedActivity: (activity: IActivity | null) => void;
}

export const ActivityDetails: React.FC<IProps> = ({
	activity,
	setEditMode,
	setSelectedActivity
}) => {
	return (
		<Card fluid>
			<Image
				src={`/assets/categoryImages/${activity.category}.jpg`}
				wrapped
				ui={false}
			/>
			<Card.Content>
				<Card.Header>{activity.title}</Card.Header>
				<Card.Meta>
					<span className="date">{activity.date}</span>
				</Card.Meta>
				<Card.Description>
					{activity.description}
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group widths={2}>
					<Button
						onClick={() => setEditMode(true)}
						basic
						color="blue"
						content="edit"
					></Button>
					<Button
						onClick={() => setSelectedActivity(null)}
						basic
						color="grey"
						content="cancel"
					></Button>
				</Button.Group>
			</Card.Content>
		</Card>
	);
};
