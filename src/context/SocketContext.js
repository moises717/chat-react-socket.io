import { createContext, useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext";
import { scrollToBottomAnimated } from "../helpers/scrollToBottom";
import { useSocket } from "../hooks/useSocket";
import { types } from "../types/types";
import { ChatContext } from "./chat/chatContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const { socket, online, conectarSocket, desconectarSocket } = useSocket(
		"http://localhost:3002"
	);

	const { auth } = useContext(AuthContext);

	const { dispatch } = useContext(ChatContext);

	useEffect(() => {
		if (auth.logged) {
			conectarSocket();
		}
	}, [auth, conectarSocket]);
	useEffect(() => {
		if (!auth.logged) {
			desconectarSocket();
		}
	}, [auth, desconectarSocket]);

	useEffect(() => {
		socket?.on("lista-usuarios", (usuarios) => {
			dispatch({
				type: types.usuariosCargados,
				payload: usuarios,
			});
		});
	}, [socket, dispatch]);

	useEffect(() => {
		socket?.on("mensaje-personal", (mensaje) => {
			dispatch({
				type: types.nuevoMensaje,
				payload: mensaje,
			});

			scrollToBottomAnimated("mensajes");
		});
	}, [socket, dispatch]);

	return (
		<SocketContext.Provider value={{ socket, online }}>
			{children}
		</SocketContext.Provider>
	);
};
