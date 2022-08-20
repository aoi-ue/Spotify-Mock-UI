import { useEffect, useState } from "react";
import axios from "axios";

const {
	REACT_APP_SPOTIFY_CLIENT_ID,
	REACT_APP_SPOTIFY_REDIRECT_URI
	// REACT_APP_SPOTIFY_SCOPES
} = process.env;
// const REDIRECT_URI = "https://hfxd8g.csb.app/callback"
const RESPONSE_TYPE = "token";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

const USER_SERVICE_URL = "https://api.spotify.com/v1/browse/new-releases";

export default function Spotify() {
	const [token, setToken] = useState("");

	const [data, setData] = useState({ users: [], isFetching: false });

	useEffect(() => {
		const hash = window.location.hash;
		let token = window.localStorage.getItem("token");

		if (!token && hash) {
			token = hash
				.substring(1)
				.split("&")
				.find((elem) => elem.startsWith("access_token"))
				.split("=")[1];

			window.location.hash = "";
			window.localStorage.setItem("token", token);
		}

		setToken(token);
	}, []);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setData({ users: data.users, isFetching: true });
				const response = await axios.get(USER_SERVICE_URL, {
					headers: {
						Authorization: `Bearer ${token}`
					}
					// 	,
					//   params: {
					// 		q: searchKey,
					// 		type: "artist"
					// }
				});
				setData({ users: response.data, isFetching: false });
			} catch (e) {
				console.log(e);
				setData({ users: data.users, isFetching: false });
			}
		};
		fetchUsers();
	}, []);

	const logout = () => {
		setToken("");
		window.localStorage.removeItem("token");
	};

	return (
		<div>
			<h1>Spotify React</h1>
			{console.log("checking of token:", token)}
			{!token ? (
				<a
					href={`${AUTH_ENDPOINT}?client_id=${REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${REACT_APP_SPOTIFY_REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
				>
					Login to Spotify
				</a>
			) : (
				// <button onClick={logout}>Logout</button>
				console.log(data)
				// data.users.albums.items.map((artist) => (
				// 	<div key={artist.id}>
				// 		{artist.images.length ? (
				// 			<img width={"100%"} src={artist.images[0].url} alt="" />
				// 		) : (
				// 			<div>No Image</div>
				// 		)}
				// 		{artist.name}
				// 	</div>
				// ))
			)}
		</div>
	);
}
