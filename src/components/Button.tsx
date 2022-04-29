export const Button = (props: ButtonType) => {
	const { onClick, label, type = "outline", className, disabled } = props;
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`${className} bg-gray-200 p-2 rounded shadow font-semibold border ${
				type === "outline"
					? "border-gray-300 text-primary"
					: "text-white border-primary bg-primary"
			}`}
		>
			{label}
		</button>
	);
};
