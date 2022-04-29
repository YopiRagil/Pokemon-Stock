import moment from "moment";

const intialState: IPokemon = {
	pokemons: {
		data: { count: 0, next: "", previous: "", results: [] },
		loading: false,
		reload: false,
	},
	initiateHistory: {
		date: moment().format("DD MMM YYYY, HH:mm"),
		activity: "Stok Awal",
		note: "",
		quantity: 0,
		total: 0,
	},
	form: {
		date: "",
		activity: "Update Stok",
		note: "",
		quantity: 0,
		total: 0,
		name: "",
	},
};

const PokemonStoreReducer = (
	state: IPokemon = intialState,
	action: TAction,
): IPokemon => {
	switch (action.type) {
		case "LOADING_POKEMONS":
			return {
				...state,
				pokemons: { ...state.pokemons, loading: true, reload: false },
			};

		case "POKEMON_LIST":
			return {
				...state,
				pokemons: {
					data:
						state.pokemons.data.count > 1000
							? state?.pokemons?.data
							: action.payload,
					loading: false,
					reload: false,
				},
			};

		case "UPDATE_STOCK":
			const index = state.pokemons.data.results?.findIndex((pokemon) => {
				return pokemon.name === action?.payload?.name;
			});
			let newData = state.pokemons.data.results;
			newData[index] = {
				...newData[index],
				stock: action.payload?.total,
				history: newData[index]?.history
					? [action.payload, ...newData[index]?.history]
					: [action.payload],
			};
			return {
				...state,
				pokemons: {
					...state.pokemons,
					data: { ...state.pokemons.data, results: [...newData] },
				},
				form: intialState.form,
			};

		case "UPDATE_FORM":
			return {
				...state,
				form: action.payload,
			};

		case "RESET_FORM":
			return {
				...state,
				form: intialState.form,
			};

		default:
			return state;
	}
};

export default PokemonStoreReducer;
