import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

import { ChatPage } from "../pages/ChatPage";
import { AuthRouter } from "./AuthRouter";

import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
	const { auth, verificaToken } = useContext(AuthContext);

	useEffect(() => {
		verificaToken();
	}, [verificaToken]);

	if (auth.checking) {
		return <h1>Espere porfavor..</h1>;
	}

	return (
		<Router>
			<div>
				<Switch>
					<PublicRoute
						isAuthenticated={auth.logged}
						path="/auth"
						component={AuthRouter}
					/>
					<PrivateRoute
						isAuthenticated={auth.logged}
						path="/"
						component={ChatPage}
					/>

					<Redirect to="/" />
				</Switch>
			</div>
		</Router>
	);
};
