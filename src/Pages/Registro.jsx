import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import firebase from "../Config/firebase";
import { Boton, Div, Formulario, H2, Input, P, Titulo } from "../styles/registro";

const Registro = () => {
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("");
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const responseUser = await firebase.auth.createUserWithEmailAndPassword(data.email, data.password);
            Swal.fire({
                title: "<strong>Sus datos de han registrado exitosamente</strong>",
                icon: "success",
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Cerrar',
            });
            navigate("/home");
            if (responseUser.user.uid) {
                await firebase.firestore().collection("usuarios").add({
                    name: data.name,
                    lastname: data.lastname,
                    email: data.email,
                    userId: responseUser.user.uid,
                });
            }
        } catch (error) {
            if (error.code == "auth/weak-password") setPassError("La contraseña debe contener al menos 6 caracteres");
            if (error.code !== "auth/weak-password") setPassError("");
            if (error.code == "auth/email-already-in-use") setEmailError("El email ingresado ya se encuentra en uso");
            if (error.code !== "auth/email-already-in-use") setEmailError("");
        }
    };

    const redireccionar = () => {
        navigate("/login");
    };
    return (
        <Div>
            <Titulo>
                <H2>Registrate</H2>
            </Titulo>
            <Formulario onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Input type="text" placeholder="Ingrese su nombre" {...register("name", { required: true })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Input type="text" placeholder="Ingrese su apellido" {...register("lastname")} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Input type="email" placeholder="Ingrese su Email" {...register("email", { required: true })} />
                    <p>{emailError}</p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Input type="password" placeholder="Ingrese su contraseña" {...register("password", { required: true })} />
                    <p>{passError}</p>
                </Form.Group>
                <Boton variant="primary" type="submit">
                    Registrarse
                </Boton>
            </Formulario>
            <P onClick={redireccionar}>¿Tienes una cuenta? Ingresar</P>
        </Div>
    );
};

export default Registro;
