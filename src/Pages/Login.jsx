import { React, useEffect, useState } from "react";
import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import firebase from "../Config/firebase";
import { AuthContext } from "../Context/AuthContext";

const estilos = {
    form: {
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
    },
};

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
    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)} style={estilos.form}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese su email" {...register("email")} />
                    <p>{emailError}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Ingrese su contraseña" {...register("password")} />
                    <p>{passError}</p>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Ingresar
                </Button>
            </Form>
        </div>
    );
};

export default Login;
