interface IPokemon {
	pokemons: IPokeList;
	initiateHistory: TypeHistory;
	form: TypeHistory;
}

interface IPokeList {
	data: TDataPokemon;
	loading: boolean;
	reload: boolean;
}

type TDataPokemon = {
	count: number;
	next: string;
	previous: string;
	results: PokeDataType[];
};

type PokeDataType = {
	name: string;
	url: string;
	stock: number;
	history: TypeHistory[];
};

type TypeHistory = {
	date: string;
	activity: "Update Stok" | "Stok Awal";
	note: string;
	quantity: number;
	total: number;
	name?: string;
};

type TAction = {
	type: string;
	payload?: any;
};

type DispatcType = (args: TAction | Function) => TAction;

interface IState {
	store: IPokemon;
}

type TParamsPokeList = {
	limit: number;
	offset: number;
};
