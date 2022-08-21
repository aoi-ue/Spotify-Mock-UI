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

// const removeToken = () => {
// 	setToken("");
// 	window.localStorage.removeItem("token");
// };

const ACCESS_TOKEN_KEY = "access_token";
const EXPIRES_AT_KEY = "expires_at";

function useAuth() {
	const [token, setToken] = useState(null);

	useEffect(() => {
		let currentAccessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY); 
		let currentExpiresAt = window.localStorage.getItem(EXPIRES_AT_KEY);

		let currentTime = Date.now() / 1000;
		if (currentExpiresAt <= currentTime) {
			currentAccessToken = null;

			window.localStorage.removeItem(ACCESS_TOKEN_KEY, null);
			window.localStorage.removeItem(EXPIRES_AT_KEY, null);
		}

		const hash = window.location.hash;

		if (!currentAccessToken && hash) {
			const authResponse = new URLSearchParams(hash.substring(1));

			const accessToken = authResponse.get("access_token");
			const expiresIn = authResponse.get("expires_in");

			if (accessToken && expiresIn) {
				window.location.hash = "";
				window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

				// Expires at contains actual expiration time.
				const expiresAt = expiresIn + (Date.now() / 1000);
				window.localStorage.setItem(EXPIRES_AT_KEY, expiresAt)
			}
		}
		setToken(currentAccessToken);
	}, []);

	return {
		token
	}
}

export default function Spotify() {
	const { token } = useAuth();
	const [data, setData] = useState({ users: [], isFetching: false });

	useEffect(() => {
		const fetchAlbum = async () => {
			try {
				setData({ users: data.users, isFetching: true });
				const response = await axios.get(USER_SERVICE_URL, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				setData({ users: response.data, isFetching: false });
			} catch (e) {
				console.log(e);
				setData({ users: data.users, isFetching: false });
			}
		};

		if (token) {
			fetchAlbum();
		}
	}, [token]);

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
				// console.log("check data:", data)
				data.users.albums.items.map((artist) => (
					<div key={artist.id}>
						{artist.images.length ? (
							<img width={"100%"} src={artist.images[0].url} alt="" />
						) : (
							<div>No Image</div>
						)}
						{artist.name}
					</div>
				))
			)}
		</div>
	);
}
