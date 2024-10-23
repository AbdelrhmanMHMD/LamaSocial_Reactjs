import axios from "axios";
export const loginCall = async (userCredentials, dispatch) => {
	dispatch({ type: "LOGIN_START" });
	try {
		const { data } = await axios.get(
			"http://localhost:8000/users",
		);
		const user = data.find(
			(user) => user.email === userCredentials.email && user.password === userCredentials.password
		);
		if (!user) {
			throw new Error("Invalid credentials");
		}
		axios.put("http://localhost:8000/loggedUser", user)
		dispatch({ type: "LOGIN_SUCCESS", payload: user });
	} catch (err) {
        dispatch({type:"LOGIN_FAILURE",payload:err})
    }
};
