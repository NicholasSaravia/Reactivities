import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { Navbar } from "../../features/nav/Navbar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
	const [activities, setActivities] = useState<IActivity[]>([]);
	const [
		selectedActivity,
		setSelectedActivity,
	] = useState<IActivity | null>(null);
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		axios.get<IActivity[]>("http://localhost:5000/api/activities").then(
			(response) => {
				let activities: IActivity[] = [];
				response.data.forEach((a) => {
					a.date = a.date.split(".")[0];
					activities.push(a);
				});
				setActivities(activities);
			}
		);
	}, []);

	const handleSelectActivity = (id: string) => {
		setSelectedActivity(activities.filter((a) => a.id === id)[0]);
		setEditMode(false);
	};

	const handleOpenCreateForm = () => {
		setSelectedActivity(null);
		setEditMode(true);
	};

	const handleCreateActivity = (activity: IActivity) => {
		setActivities([...activities, activity]);
		setSelectedActivity(activity);
		setEditMode(false);
	};

	const handleEditActivity = (activity: IActivity) => {
		setActivities([
			...activities.filter((a) => a.id !== activity.id),
			activity,
		]);
		setSelectedActivity(activity);
		setEditMode(false);
	};

	const handleDeleteActivity = (id: string) =>{
		setActivities([...activities.filter(a => a.id !== id)]);
		setSelectedActivity(null);
		setEditMode(false);
	}

	return (
		<React.Fragment>
			<Navbar openCreateForm={handleOpenCreateForm} />
			<Container style={{ marginTop: "7em" }}>
				<ActivityDashboard
					activities={activities}
					createActivity={handleCreateActivity}
					editActivity={handleEditActivity}
					selectActivity={handleSelectActivity}
					selectedActivity={selectedActivity}
					editMode={editMode}
					setEditMode={setEditMode}
					setSelectedActivity={setSelectedActivity}
					deleteActivity={handleDeleteActivity}
				></ActivityDashboard>
			</Container>
		</React.Fragment>
	);
};

export default App;
