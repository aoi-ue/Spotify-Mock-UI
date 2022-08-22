import React, { useEffect, useState } from "react";
import axios from "axios";
const USER_SERVICE_URL = "https://jsonplaceholder.typicode.com/users";

export default function SelectedSlider(props) {

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setData({ users: data.users, isFetching: true });
				const response = await axios.get(USER_SERVICE_URL);
				setData({ users: response.data, isFetching: false });
			} catch (e) {
				console.log(e);
				setData({ users: data.users, isFetching: false });
			}
		};
		fetchUsers();
	}, []);

	return (
		<ul>
			{console.log(data)}
			{data.users.map((el) => (
				<li key={el.id}> {el.name} </li>
			))}
		</ul>
	);
}
