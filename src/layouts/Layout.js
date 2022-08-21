import Navigation from "./Nagivation/Navigation";

const Layout = ({ children }) => {
	return (
		<>
			<Navigation />
			<main>{children}</main>
		</>
	);
};

export default Layout;
