import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

const Navigation = (props) => {
	return (
		<main className={"main"}>
			<header className={"header"}></header>

			<aside className={"sidebar"}>
				<nav className="nav">
					<div>
						<Link to="/" className="nav-logo">
							<i className={`fas fa-home-alt nav-logo-icon`}></i>
							<br />
							<span className="nav-logo-name">Bob Smith</span>
						</Link>

						<div className="nav-list">
							<Link to="/dashboard" className="nav-link">
								<i className="fas fa-tachometer-alt nav-link-icon"></i>
								<span className="nav-link-name">Discover</span>
							</Link>
							<Link to="/Search" className="nav-link">
								<i className="fas fa-hotel nav-link-icon"></i>
								<span className="nav-link-name">Search</span>
							</Link>
							<Link to="/Favourites" className="nav-link">
								<i className="fas fa-image nav-link-icon"></i>
								<span className="nav-link-name">Favourites</span>
							</Link>
							<Link to="/Playlist" className="nav-link">
								<i className="fas fa-dollar-sign nav-link-icon"></i>
								<span className="nav-link-name">Playlist</span>
							</Link>
							<Link to="/Charts" className="nav-link">
								<i className="fas fa-dollar-sign nav-link-icon"></i>
								<span className="nav-link-name">Charts</span>
							</Link>
						</div>
					</div>
				</nav>
			</aside>
		</main>
	);
};

export default Navigation;
