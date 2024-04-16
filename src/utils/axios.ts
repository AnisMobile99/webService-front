import axios from "axios";
import { useAuth } from "../../firebase";

axios.defaults.headers.common["Content-Type"] = "application/json";

const serveurUrl = import.meta.env.VITE_API_URL;

const setHeaders = (accessToken: string) => {
	return {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};
};

export const getSportifs = (accessToken: string) => {
	return axios.get(serveurUrl + "/admin/sportifs", setHeaders(accessToken));
};

export const getCoachs = (accessToken: string) => {
	return axios.get(serveurUrl + "/admin/coachs", setHeaders(accessToken));
};

export const getUser = (accessToken: string, uid: string) => {
	return axios.get(serveurUrl + "/admin/user/" + uid, setHeaders(accessToken));
};

export const updateStatusCoachDegree = (
	accessToken: string,
	uid: string,
	degreeId: string,
	status: "verified" | "refused"
) => {
	return axios.patch(
		serveurUrl + "/admin/coach/updateStatusDegree/" + uid,
		{ degreeId, status },
		setHeaders(accessToken)
	);
};

export const updateStatusCoachDocument = (
	accessToken: string,
	uid: string,
	documentId: string,
	status: "verified" | "refused"
) => {
	return axios.patch(
		serveurUrl + "/admin/coach/updateStatusDocument/" + uid,
		{ documentId, status },
		setHeaders(accessToken)
	);
};

export const deleteUser = (accessToken: string, uid: string) => {
	return axios.delete(
		serveurUrl + "/admin/user/" + uid,
		setHeaders(accessToken)
	);
};
