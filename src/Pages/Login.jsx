import { React, useEffect, useState } from "react";
import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import firebase from "../Config/firebase";
import { AuthContext } from "../Context/AuthContext";
import { Boton, Div, Formulario, H2, Input, P, Titulo } from "../styles/login";

const Login = () => {
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("");
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const onSubmit = async (data) => {
        try {
            const responseUser = await firebase.auth.signInWithEmailAndPassword(data.email, data.password);
            if (responseUser.user.uid) {
                const userDocument = await firebase.firestore().collection("usuarios").where("userId", "==", responseUser.user.uid).get();
                const user = userDocument.docs[0].data();
                context.handlerLogin(user, user.name);
                navigate("/Home");
                console.log(userDocument);
            }
        } catch (error) {
            if (error.code == "auth/wrong-password") setPassError("Contraseña incorrecta");
            if (error.code !== "auth/wrong-password") setPassError("");
            if (error.code == "auth/user-not-found") setEmailError("Email incorrecto");
            if (error.code !== "auth/user-not-found") setEmailError("");
            if (error.code == "auth/too-many-requests")
                setPassError("Su cuenta ha sido temporalmente suspendida debido al ingreso erroneo de sus datos de inicio de sisión de forma repetida, intente nuevamente en 30 minutos");
        }
    };

    const redireccionar = () => {
        navigate("/registro");
    };
    return (
        <Div>
            <Titulo>
                <H2>BIENVENIDO</H2>
            </Titulo>
            <Formulario onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Input type="email" placeholder="Ingrese su email" {...register("email")} />
                    <p>{emailError}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Input type="password" placeholder="Ingrese su contraseña" {...register("password")} />
                    <p>{passError}</p>
                </Form.Group>
                <Boton variant="primary" type="submit">
                    Ingresar
                </Boton>
            </Formulario>
            <P onClick={redireccionar}>¿No tienes cuenta? Registrate</P>
        </Div>
    );
};

export default Login;
