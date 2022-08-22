import Layout from "./layouts/Layout";
import Spotify from "./components/Spotify";

export default function App() {
	return (
		<Layout>
			<div className="App">
				<Spotify />
			</div>
		</Layout>
	);
}
