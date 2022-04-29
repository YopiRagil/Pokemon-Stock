type TableHistoryType = {
	combineHistory: TypeHistory[];
};

type ButtonType = {
	onClick: () => void;
	label: string;
	type?: "outline" | "solid";
	className?: string;
	disabled?: boolean;
};
