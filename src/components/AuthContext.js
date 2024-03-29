import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const url = "https://laravel-api-02-07.herokuapp.com/api/logout";
	const hs = { headers: { Accept: "application/json", Authorization: `Bearer ${token}` } };
	const req = { method: "POST", headers: hs };

	useEffect(() => {
		const user = localStorage.getItem("user");
		const token = localStorage.getItem("token");
		setUser(JSON.parse(user));
		setToken(JSON.parse(token));
	}, []);

	const login = (user, token) => {
		localStorage.setItem("token", JSON.stringify(token));
		localStorage.setItem("user", JSON.stringify(user));
		setUser(user);
		setToken(token);
	};

	const logout = () => {
		fetch(url, req).then(
			(res) => {
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				setUser(null);
				setToken(null);
				Navigate("/login");
			},
			(err) => {}
		);
	};

	const getUser = () => user;
    const getToken = () => token;
    const getRole = () => user.role;
    const getUserId = () => user.id;
    const isLoggedin = () => (user ? true : false);

	return (
		<AuthContext.Provider value={{ login, isLoggedin, logout, getUser, getToken, getRole, getUserId }}>
            {children}</AuthContext.Provider>
	);
};
