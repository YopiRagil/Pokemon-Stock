/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon } from "../assets/icon";
import { getPokemonData } from "../store/storeAction/pokemon";

const Home = () => {
	const navigate = useNavigate();
	const dispatch: any = useDispatch();

	const statePokemon = useSelector((state: IState) => state.store.pokemons);
	const [search, setSearch] = useState("");

	useEffect(() => {
		dispatch(getPokemonData());
	}, []);

	const pokemonList = statePokemon.data?.results?.filter((pokemon) =>
		pokemon.name?.includes(search.toLowerCase()),
	);

	const handleDetail = (name: string) => {
		navigate(name);
	};

	return (
		<div className="lg:grid grid-cols-7">
			<div />
			<div className="col-span-5 relative">
				<p className="font-bold text-4xl mb-6">Stok Pokémon</p>
				<div className="sticky top-0 py-2 bg-white flex flex-col gap-y-4 lg:gap-y-6">
					<div className="relative">
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="border-2 w-full lg:w-1/3 pl-8 pr-2 py-1 rounded border-gray-400 shadow-inner"
						/>
						<div className="absolute top-1.5 left-1.5">
							<Icon name="search" />
						</div>
					</div>
					<div className="grid grid-cols-4 border-b-2 border-black pb-2">
						<p className="col-span-3 font-bold">Nama</p>
						<p className="text-right font-bold">Stock</p>
					</div>
				</div>
				<div>
					<div>
						{pokemonList?.map((pokemon, index) => (
							<div key={index} className="grid grid-cols-4 border-b-2 py-2">
								<p
									onClick={() => handleDetail(pokemon?.name)}
									className="cursor-pointer col-span-3 text-primary font-bold capitalize"
								>
									{pokemon?.name}
								</p>
								<p className="text-right font-bold">
									{pokemon?.stock ? pokemon?.stock : 0} pcs
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
			<div />
		</div>
	);
};

export default Home;
