/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "../assets/icon";
import { Button } from "../components/Button";
import { updateForm, updateStock } from "../store/storeAction/pokemon";

const Review = () => {
	const navigate = useNavigate();
	const param = useParams();
	const dispatch: any = useDispatch();
	const formSaved = useSelector((state: IState) => state.store.form);

	const detail = useSelector(
		(state: IState) => state.store.pokemons.data.results,
	);
	const thisPokemon = detail?.filter(
		(pokemon) => pokemon.name === param.pokemon,
	)?.[0];

	useEffect(() => {
		if (!thisPokemon && formSaved?.quantity === 0) {
			navigate("/");
		}
	}, []);

	const submitStok = () => {
		dispatch(updateStock());
		navigate(-1);
	};
	return (
		<div className="lg:grid grid-cols-7">
			<div />
			<div className="col-span-5 relative">
				<p className="text-2xl lg:text-4xl font-bold capitalize py-3">
					Konfirmasi update stok
				</p>
				<div className="py-3">
					<p>Selisih</p>
					<p className="text-3xl">
						{formSaved?.quantity > 0 ? "+" : ""}
						{formSaved?.quantity} pcs
					</p>
				</div>
				<div className="py-3 flex items-center justify-between lg:justify-start">
					<div className="w-1/3">
						<p>Di Sistem</p>
						<p className="text-2xl">
							{thisPokemon?.stock ? thisPokemon.stock : 0} pcs
						</p>
					</div>
					<Icon name="right-arrow" />
					<div className="w-1/3 ml-4">
						<p>Hasil update stok</p>
						<p className="text-2xl">{formSaved?.total} pcs</p>
					</div>
				</div>
				<p className="font-bold">Detail Stok Opname</p>

				<div className="grid grid-cols-6 border-b-2 border-black pb-2 py-3">
					<p className="col-span-3 lg:col-span-1 font-bold">Keterangan</p>
					<p className="hidden lg:block col-span-3  font-bold">Detail</p>
					<p className="col-span-3 lg:col-span-2 text-right font-bold pr-8">
						Jumlah
					</p>
				</div>
				<div className="grid grid-cols-6 border-b-2 border-black pb-2 py-3">
					<div className="col-span-3 lg:col-span-4">
						<div className="grid grid-cols-3 lg:grid-cols-4">
							<p className="col-span-3 lg:col-span-1 font-bold text-primary">
								Hasil update stok
							</p>
							<p className="col-span-3">
								{formSaved?.quantity % 12} pcs,{" "}
								{(formSaved?.quantity - (formSaved?.quantity % 12)) / 12} lusin
								(12s)
							</p>
						</div>
					</div>
					<div className="flex justify-end items-center col-span-3 lg:col-span-2">
						<p className="text-right font-bold mr-2">{formSaved?.total} pcs</p>
						<Icon name="edit" />
					</div>
				</div>
				<div className="grid grid-cols-6  border-black pb-2 py-3">
					<p className="col-span-3 font-bold text-primary">
						Total hasil stok opname
					</p>
					<p className="col-span-3 text-right font-bold pr-8">
						{formSaved?.total} pcs
					</p>
				</div>
				<div>
					<p className="font-bold text-lg mt-6 py-3">Catatan</p>
					<textarea
						name="Text1"
						cols={4}
						value={formSaved?.note}
						onChange={(e) =>
							dispatch(updateForm({ ...formSaved, note: e.target.value }))
						}
						rows={3}
						placeholder="Contoh: stok awal"
						className="border-2  w-full resize-none  appearance-none  px-2 py-2 rounded border-gray-400 shadow-inner"
					></textarea>
					<div className="flex justify-end gap-x-4 py-4">
						<Button
							label="Simpan"
							type="solid"
							className="w-20"
							onClick={submitStok}
						/>
						<Button
							label="Batal"
							onClick={() => navigate(-1)}
							className="w-20"
						/>
					</div>
				</div>
			</div>
			<div />
		</div>
	);
};

export default Review;
