import { getDataPokemon } from "../network";
import store from "../index";
import moment from "moment";

export const getPokemonData = () => {
	const all: IParams = { limit: 10000, offset: 0 };
	return async (dispatch: DispatcType) => {
		dispatch({ type: "LOADING_POKEMONS" });
		getDataPokemon(all)
			.then(({ data }) => {
				dispatch({ type: "POKEMON_LIST", payload: data });
			})
			.catch((err: any) => {});
	};
};

export const updateStock = () => {
	const form = store.getState().store.form;
	return async (dispatch: DispatcType) => {
		dispatch({
			type: "UPDATE_STOCK",
			payload: { ...form, date: moment().format("DD MMM YYYY, HH:mm") },
		});
	};
};

export const updateForm = (data: TypeHistory) => {
	return async (dispatch: DispatcType) => {
		dispatch({ type: "UPDATE_FORM", payload: data });
	};
};
