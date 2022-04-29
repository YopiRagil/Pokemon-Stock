import React from "react";
import "./App.css";
import AppsRoutes from "./route";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store, { persistor } from "./store";

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AppsRoutes />
			</PersistGate>
		</Provider>
	);
}

export default App;
