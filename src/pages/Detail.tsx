/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "../assets/icon";
import { Button } from "../components/Button";
import { updateForm } from "../store/storeAction/pokemon";

const Detail = () => {
	const [show, setShow] = useState(false);
	const navigate = useNavigate();
	const param = useParams();

	const initialHistory = useSelector(
		(state: IState) => state.store.initiateHistory,
	);
	const detail = useSelector(
		(state: IState) => state.store.pokemons.data.results,
	);
	const thisPokemon = detail?.filter(
		(pokemon) => pokemon.name === param.pokemon,
	)?.[0];

	const historys = thisPokemon?.history ? thisPokemon?.history : [];
	const combineHistory = [...historys, initialHistory];

	useEffect(() => {
		if (!thisPokemon) {
			navigate("/");
		}
	}, []);

	return (
		<div className="relative">
			<UpdateDataPopUp data={thisPokemon} show={show} setShow={setShow} />
			<div className="flex sticky top-0 justify-between items-center border-b lg:border-b-0 lg:pb-0 pb-4">
				<div
					onClick={() => navigate(-1)}
					className="flex gap-x-2 items-center text-primary"
				>
					<Icon name="left-arrow" />
					<p className="font-semibold">Stok Pokémon</p>
				</div>
				<div className="hidden lg:block">
					<Button onClick={() => setShow(true)} label={"Update Stock"} />
				</div>
			</div>
			<p className="text-2xl lg:text-4xl font-bold capitalize py-3">
				{thisPokemon.name}
			</p>
			<div className=" lg:hidden">
				<Button onClick={() => setShow(true)} label={"Update Stock"} />
			</div>
			<div className="py-3">
				<p>Sisa Stock</p>
				<p className="text-3xl">
					{thisPokemon?.stock ? thisPokemon.stock : 0} pcs
				</p>
			</div>
			<div className="py-3">
				<p className="text-lg font-bold">Riwayat Stock</p>
				<p>Satuan Stok dalam pcs</p>
			</div>
			<TableHistoryDesktop combineHistory={combineHistory} />
			<TableHistoryMobile combineHistory={combineHistory} />
		</div>
	);
};

export default Detail;

const TableHistoryDesktop = (props: TableHistoryType) => {
	const { combineHistory } = props;
	return (
		<div className="hidden lg:block py-3">
			<div className="grid grid-cols-12 border-b-2 border-black pb-2">
				<p className="col-span-2 font-bold">Waktu</p>
				<p className="col-span-2 font-bold">Kegiatan</p>
				<p className="col-span-6">Catatan</p>
				<p className="text-right">Jumlah</p>
				<p className="text-right">Stok</p>
			</div>
			{combineHistory?.map((history, index) => (
				<div key={index} className="grid grid-cols-12 border-b-2 py-2">
					<p className="col-span-2">{history?.date}</p>
					<p className=" col-span-2 font-bold text-primary">
						{history?.activity}
					</p>
					<p className="col-span-6">{history?.note}</p>
					<p
						className={`text-right ${
							history?.quantity > 0
								? "text-green-500"
								: history?.quantity < 0
								? "text-red-500"
								: ""
						}`}
					>
						{history?.quantity > 0 ? "+" : ""}
						{history?.quantity}
					</p>
					<p className="text-right">{history?.total}</p>
				</div>
			))}
		</div>
	);
};

const TableHistoryMobile = (props: TableHistoryType) => {
	const { combineHistory } = props;
	return (
		<div className="py-3 lg:hidden">
			{combineHistory?.map((history, index) => (
				<div key={index} className="mb-6">
					<div className="grid grid-cols-4 border-b-2 border-black pb-2">
						<p className="col-span-2 font-bold">
							{moment(history?.date).format("DD MMM YYYY")}
						</p>
						<p className="text-right">Jumlah</p>
						<p className="text-right">Stok</p>
					</div>
					<div className="grid grid-cols-4 border-b-2 py-2 items-center">
						<div className="col-span-2 ">
							<p className="font-semibold">
								{moment(history?.date).format("HH:mm")}
							</p>
							<p className=" font-bold text-primary">{history?.activity}</p>
							<p className="col-span-6">{history?.note}</p>
						</div>
						<p
							className={`text-right ${
								history?.quantity > 0
									? "text-green-500"
									: history?.quantity < 0
									? "text-red-500"
									: ""
							}`}
						>
							{history?.quantity > 0 ? "+" : ""}
							{history?.quantity}
						</p>
						<p className="text-right">{history?.total}</p>
					</div>
				</div>
			))}
		</div>
	);
};

const UpdateDataPopUp = (props: any) => {
	const { show, setShow, data } = props;
	const dispatch: any = useDispatch();
	const navigate = useNavigate();

	const [qty, setQty] = useState({ pcs: 0, lusin: 0 });

	const handleSetForm = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value: number = parseInt(e.target.value?.replace(/[-+][^0-9]/g, ""));
		const isValNaN = isNaN(value);
		setQty({
			...qty,
			[e.target.name]: isValNaN ? 0 : value,
		});
	};

	const lastStock = data?.stock ? data?.stock : 0;
	const newProd = qty.lusin * 12 + qty.pcs;
	const total: number = lastStock + newProd;

	const form = {
		note: "",
		total: total,
		quantity: newProd,
		date: "",
		name: data?.name,
	};

	const handleSubmit = () => {
		dispatch(updateForm({ ...form, activity: "Update Stok" }));
		setShow(false);
		navigate("review");
	};

	if (show) {
		return (
			<div
				onClick={() => setShow(false)}
				className="fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-30 flex justify-center items-center"
			>
				<div
					onClick={(e) => e.stopPropagation()}
					className="flex flex-col bg-white p-5 rounded-lg shadow gap-y-3 w-96"
				>
					<p className="text-xl font-bold text-center">Update Stok</p>
					<p className="text-center">
						Masukkan jumlah stok yang tersedia di rak saat ini.
					</p>
					<div className="grid grid-cols-5 border-b-2 border-black">
						<p className="font-bold py-2 col-span-2">Kemasan</p>
						<p className="font-bold py-2 col-span-2 text-right">Jumlah</p>
						<p className="font-bold py-2 col-span-1  text-right">Stock</p>
					</div>
					<div className="grid grid-cols-5 border-b-2 items-center">
						<p className="font-bold py-2 col-span-2">PCS</p>
						<div className="col-span-2 flex py-2 justify-end items-center">
							<p className="font-bold   text-right">1 x</p>
							<input
								name="pcs"
								value={qty.pcs}
								onChange={handleSetForm}
								className="border-2 ml-2 w-16 px-1 py-2 rounded border-gray-400 shadow-inner"
							/>
						</div>
						<p className="font-bold py-2 col-span-1  text-right">{qty.pcs}</p>
					</div>
					<div className="grid grid-cols-5 border-b-2 items-center">
						<p className="font-bold py-2 col-span-2">Lusin</p>
						<div className="col-span-2 flex py-2 justify-end items-center">
							<p className="font-bold   text-right">12 x</p>
							<input
								name="lusin"
								value={qty.lusin}
								onChange={handleSetForm}
								pattern="[0-9]"
								className="border-2 ml-2 w-16 px-1 py-2 rounded border-gray-400 shadow-inner"
							/>
						</div>
						<p className="font-bold py-2 col-span-1 text-right">
							{qty.lusin * 12}
						</p>
					</div>
					<div className="flex justify-between items-center">
						<p>
							<b>Total stok</b> (dalam pcs)
						</p>
						<p className="font-bold">{total}</p>
					</div>
					<div className="flex justify-end gap-x-4 py-4">
						<Button
							label="Simpan"
							type="solid"
							disabled={newProd === 0}
							className="w-20"
							onClick={handleSubmit}
						/>
						<Button
							label="Batal"
							onClick={() => setShow(false)}
							className="w-20"
						/>
					</div>
				</div>
			</div>
		);
	} else {
		return null;
	}
};
