import { Route, Routes } from 'react-router';
import { useState, useEffect } from 'react';
import Category from './pages/Category';
import Profile from './pages/Profile';
import About from './pages/About';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import Activity from './pages/Activity';
import AddActivity from './pages/AddActivity';
import UpdateActivity from './pages/UpdateActivity';
import Home from './pages/Home';
import Nav from './components/Nav';
import SearchResults from './pages/SearchResults';
import './App.css';
import { CheckSession } from './services/Auth';

const App = () => {
	const [authenticated, toggleAuthenticated] = useState(false);
	const [user, setUser] = useState(null);

	const handleLogOut = () => {
		setUser(null);
		toggleAuthenticated(false);
		localStorage.clear();
	};

	const checkToken = async () => {
		const user = await CheckSession();
		setUser(user);
		toggleAuthenticated(true);
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			checkToken();
		}
	}, []);

	return (
		<div className="App">
			<header>
				<Nav
					authenticated={authenticated}
					user={user}
					handleLogOut={handleLogOut}
				/>
			</header>
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/sign-in"
						element={
							<SignIn
								setUser={setUser}
								toggleAuthenticated={toggleAuthenticated}
							/>
						}
					/>
					<Route
						path="/register"
						element={
							<Register
								setUser={setUser}
								toggleAuthenticated={toggleAuthenticated}
							/>
						}
					/>
					<Route
						path="/activity/:activity_id"
						element={
							<Activity
								user={user}
								authenticated={authenticated}
							/>
						}
					/>
					<Route
						path="/category/:category_id"
						element={<Category />}
					/>
					<Route path="/about" element={<About />} />
					<Route path="/profile" element={<Profile />} />
					<Route
						path="/search-results/:activity"
						element={<SearchResults />}
					/>
					<Route
						path="/add-activity"
						element={
							<AddActivity
								user={user}
							/>
						}
					/>
					<Route
						path="/update-activity/:activity_id"
						element={
							<UpdateActivity
								user={user}
							/>
						}
					/>
					
				</Routes>
				
			</main>
		</div>
	);
};

export default App;
