import axios from "axios";
import { bodyJson, uri } from "./setting";

export const getDataPokemon = async (params?: IParams) => {
	return axios.get(uri + "pokemon", {
		params: params,
		headers: {
			...bodyJson(),
		},
	});
};
