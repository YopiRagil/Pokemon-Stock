export const bodyJson = () => {
	return { "Content-Type": "application/json" };
};

export const uri = process.env.REACT_APP_API ? process.env.REACT_APP_API : "";
