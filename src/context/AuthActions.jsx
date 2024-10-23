export const loginStart = (userCredentials) => ({ action: "LOGIN_START" });
export const loginSuccess = (user) => ({
	action: "LOGIN_SUCCESS",
	payload: user,
});
export const loginFailure = (error) => ({
	action: "LOGIN_FAILURE",
	payload: error,
});
