import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../auth/AuthContext";

export const LoginPage = () => {
	const [form, setForm] = useState({
		email: "moises@gmail.com",
		password: "123456",
		remenberme: false,
	});

	const { login } = useContext(AuthContext);

	useEffect(() => {
		const remenberEmail = localStorage.getItem("email");
		if (remenberEmail) {
			setForm((d) => ({
				...d,
				remenberme: true,
				email: remenberEmail,
			}));
		}
	}, []);

	const onChange = ({ target }) => {
		const { name, value } = target;
		setForm({
			...form,
			[name]: value,
		});
	};
	const toggleCheck = () => {
		setForm({
			...form,
			remenberme: !form.remenberme,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		if (form.remenberme) {
			localStorage.setItem("email", form.email);
		} else {
			localStorage.removeItem("email");
		}

		// Peticion al backend
		const { email, password } = form;
		const ok = await login(email, password);

		if (!ok) {
			Swal.fire("Error", "Datos incorrectos 😫 ", "error");
		}
	};

	const todOk = () => {
		return form.email.length > 0 && form.password.length > 0 ? true : false;
	};
	return (
		<form
			className="login100-form validate-form flex-sb flex-w"
			onSubmit={onSubmit}>
			<span className="login100-form-title mb-3">Chat - Ingreso</span>

			<div className="wrap-input100 validate-input mb-3">
				<input
					className="input100"
					type="email"
					name="email"
					placeholder="Email"
					value={form.email}
					onChange={onChange}
				/>
				<span className="focus-input100"></span>
			</div>

			<div className="wrap-input100 validate-input mb-3">
				<input
					className="input100"
					type="password"
					name="password"
					placeholder="Password"
					value={form.password}
					onChange={onChange}
				/>
				<span className="focus-input100"></span>
			</div>

			<div className="row mb-3">
				<div className="col" onClick={() => toggleCheck()}>
					<input
						className="input-checkbox100"
						id="ckb1"
						type="checkbox"
						name="rememberme"
						checked={form.remenberme}
						readOnly
					/>
					<label className="label-checkbox100">Recordarme</label>
				</div>

				<div className="col text-right">
					<Link to="/auth/register" className="txt1">
						Nueva cuenta?
					</Link>
				</div>
			</div>

			<div className="container-login100-form-btn m-t-17">
				<button type="submit" className="login100-form-btn" disabled={!todOk()}>
					Ingresar
				</button>
			</div>
		</form>
	);
};
