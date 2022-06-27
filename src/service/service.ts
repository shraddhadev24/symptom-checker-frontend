import axios from "axios";
import { url, endpoints } from "./config";

export const getSymptoms = async (search = "") => {
	try {
		const res = await axios.get(`${url}${endpoints.symptoms}?search=${search}`);
		return res.data;
	} catch (err) {
		return err;
	}
};

export const diagnos = async (symptoms: string[]) => {
	try {
		const res = await axios.post(`${url}${endpoints.diagnos}`, { symptoms });
		return res.data;
	} catch (err) {
		return err;
	}
};
